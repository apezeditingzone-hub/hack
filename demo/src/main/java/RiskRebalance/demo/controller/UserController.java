package RiskRebalance.demo.controller;

import RiskRebalance.demo.model.LoginHistory;
import RiskRebalance.demo.model.User;
import RiskRebalance.demo.repository.LoginHistoryRepository;
import RiskRebalance.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String name = request.get("name");
        String rawEmail = request.get("email");
        String password = request.get("password");
        String role = request.getOrDefault("role", "Chief Risk Officer");
        String organization = request.getOrDefault("organization", "Apex Institutional Capital (NSE Member)");
        String phoneNumber = request.getOrDefault("phoneNumber", "+91 98765 43210");

        if (rawEmail == null || password == null || name == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name, email, and password are required."));
        }

        String email = rawEmail.trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already registered."));
        }

        String clientIp = extractClientIp(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        User user = User.builder()
                .name(name.trim())
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .organization(organization)
                .phoneNumber(phoneNumber)
                .autoFlightToSafety(true)
                .telemetryAlerts(true)
                .lastLoginAt(LocalDateTime.now())
                .loginCount(1)
                .lastLoginIp(clientIp)
                .build();

        User saved = userRepository.save(user);

        // Record history in database
        LoginHistory history = LoginHistory.builder()
                .userId(saved.getId())
                .email(saved.getEmail())
                .status("REGISTERED")
                .ipAddress(clientIp)
                .userAgent(userAgent)
                .build();
        loginHistoryRepository.save(history);

        Map<String, Object> response = new HashMap<>();
        response.put("id", saved.getId());
        response.put("name", saved.getName());
        response.put("email", saved.getEmail());
        response.put("role", saved.getRole());
        response.put("organization", saved.getOrganization());
        response.put("phoneNumber", saved.getPhoneNumber());
        response.put("lastLoginAt", saved.getLastLoginAt());
        response.put("loginCount", saved.getLoginCount());
        response.put("message", "User created and stored in Supabase PostgreSQL successfully!");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String rawEmail = request.get("email");
        String password = request.get("password");
        String name = request.get("name");

        if (rawEmail == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required."));
        }

        String email = rawEmail.trim().toLowerCase();
        String clientIp = extractClientIp(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(email);

        // If user does not exist in DB yet, auto-register / store user to database seamlessly
        if (optionalUser.isEmpty()) {
            String displayName = (name != null && !name.isBlank()) ? name.trim() : email.split("@")[0].toUpperCase();
            User newUser = User.builder()
                    .name(displayName)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .role("Chief Risk Officer")
                    .organization("Apex Institutional Capital (NSE Member)")
                    .phoneNumber("+91 98765 43210")
                    .autoFlightToSafety(true)
                    .telemetryAlerts(true)
                    .lastLoginAt(LocalDateTime.now())
                    .loginCount(1)
                    .lastLoginIp(clientIp)
                    .build();

            User saved = userRepository.save(newUser);

            LoginHistory history = LoginHistory.builder()
                    .userId(saved.getId())
                    .email(saved.getEmail())
                    .status("AUTO_REGISTER_ON_LOGIN")
                    .ipAddress(clientIp)
                    .userAgent(userAgent)
                    .build();
            loginHistoryRepository.save(history);

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("name", saved.getName());
            response.put("email", saved.getEmail());
            response.put("role", saved.getRole());
            response.put("organization", saved.getOrganization());
            response.put("phoneNumber", saved.getPhoneNumber());
            response.put("autoFlightToSafety", saved.getAutoFlightToSafety());
            response.put("telemetryAlerts", saved.getTelemetryAlerts());
            response.put("lastLoginAt", saved.getLastLoginAt());
            response.put("loginCount", saved.getLoginCount());
            response.put("authenticated", true);
            response.put("message", "User automatically registered and login stored in database!");

            return ResponseEntity.ok(response);
        }

        User user = optionalUser.get();

        // Check password (allow match or development bypass)
        if (!passwordEncoder.matches(password, user.getPassword()) && !password.equals(user.getPassword())) {
            // Record failed attempt in database
            LoginHistory failedHistory = LoginHistory.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .status("FAILED_PASSWORD_MISMATCH")
                    .ipAddress(clientIp)
                    .userAgent(userAgent)
                    .build();
            loginHistoryRepository.save(failedHistory);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password."));
        }

        // On successful login: update user statistics and store in database
        user.setLastLoginAt(LocalDateTime.now());
        user.setLoginCount(user.getLoginCount() != null ? user.getLoginCount() + 1 : 1);
        user.setLastLoginIp(clientIp);
        userRepository.save(user);

        // Store login history record in database
        LoginHistory history = LoginHistory.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .status("SUCCESS")
                .ipAddress(clientIp)
                .userAgent(userAgent)
                .build();
        loginHistoryRepository.save(history);

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId()); // EXACT SAME DATABASE ID FOR SAME PERSON
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("organization", user.getOrganization());
        response.put("phoneNumber", user.getPhoneNumber());
        response.put("autoFlightToSafety", user.getAutoFlightToSafety());
        response.put("telemetryAlerts", user.getTelemetryAlerts());
        response.put("lastLoginAt", user.getLastLoginAt());
        response.put("loginCount", user.getLoginCount());
        response.put("authenticated", true);
        response.put("message", "Login successful and stored in database!");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        String cleanEmail = email.trim().toLowerCase();
        return userRepository.findByEmailIgnoreCase(cleanEmail)
                .map(user -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", user.getId());
                    map.put("name", user.getName());
                    map.put("email", user.getEmail());
                    map.put("role", user.getRole());
                    map.put("organization", user.getOrganization());
                    map.put("phoneNumber", user.getPhoneNumber());
                    map.put("autoFlightToSafety", user.getAutoFlightToSafety());
                    map.put("telemetryAlerts", user.getTelemetryAlerts());
                    map.put("lastLoginAt", user.getLastLoginAt());
                    map.put("loginCount", user.getLoginCount());
                    map.put("createdAt", user.getCreatedAt());
                    map.put("updatedAt", user.getUpdatedAt());
                    return ResponseEntity.ok((Object) map);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found.")));
    }

    @GetMapping("/login-history")
    public ResponseEntity<List<LoginHistory>> getLoginHistory(@RequestParam String email) {
        List<LoginHistory> history = loginHistoryRepository.findByEmailOrderByLoginTimeDesc(email.trim().toLowerCase());
        return ResponseEntity.ok(history);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        if (xf != null && !xf.isBlank()) {
            return xf.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}


