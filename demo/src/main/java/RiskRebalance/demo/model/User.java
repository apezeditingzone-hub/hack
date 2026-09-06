package RiskRebalance.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 100)
    private String role; // e.g. Chief Risk Officer, Portfolio Manager

    @Column(name = "organization", length = 255)
    private String organization; // Institutional Desk / Entity

    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Builder.Default
    @Column(name = "auto_flight_to_safety")
    private Boolean autoFlightToSafety = true;

    @Builder.Default
    @Column(name = "telemetry_alerts")
    private Boolean telemetryAlerts = true;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Builder.Default
    @Column(name = "login_count")
    private Integer loginCount = 0;

    @Column(name = "last_login_ip", length = 100)
    private String lastLoginIp;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
