package RiskRebalance.demo.config;

import RiskRebalance.demo.model.*;
import RiskRebalance.demo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final PortfolioRepository portfolioRepository;
    private final PortfolioAssetRepository portfolioAssetRepository;
    private final StockOrderRepository stockOrderRepository;
    private final RiskLimitRepository riskLimitRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("🔍 Checking and synchronizing Supabase PostgreSQL database tables & seed records...");

        String defaultEmail = "admin@apexcapital.in";
        User user = userRepository.findByEmailIgnoreCase(defaultEmail).orElseGet(() -> {
            log.info("👤 Creating default institutional user in Supabase PostgreSQL: {}", defaultEmail);
            User newUser = User.builder()
                    .name("Institutional Chief Risk Officer")
                    .email(defaultEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .role("Chief Risk Officer")
                    .organization("Apex Institutional Capital (NSE Member)")
                    .phoneNumber("+91 98765 43210")
                    .autoFlightToSafety(true)
                    .telemetryAlerts(true)
                    .lastLoginAt(LocalDateTime.now())
                    .loginCount(1)
                    .lastLoginIp("127.0.0.1")
                    .build();
            return userRepository.save(newUser);
        });

        // Ensure at least 1 portfolio exists
        List<Portfolio> portfolios = portfolioRepository.findByUserId(user.getId());
        Portfolio portfolio;
        if (portfolios.isEmpty()) {
            log.info("💼 Initializing default Treasury Portfolio in Supabase PostgreSQL for user ID: {}, email: {}", user.getId(), user.getEmail());
            portfolio = Portfolio.builder()
                    .userId(user.getId())
                    .userEmail(user.getEmail())
                    .name("AI Dynamic Balanced Treasury Portfolio")
                    .totalAum(new BigDecimal("500000000.0000")) // ₹50 Cr
                    .currency("INR")
                    .riskScore(18.0)
                    .liquidityPercent(30.0)
                    .status("ACTIVE")
                    .build();
            portfolio = portfolioRepository.save(portfolio);

            // Seed Assets
            PortfolioAsset a1 = PortfolioAsset.builder()
                    .portfolioId(portfolio.getId())
                    .symbol("IN91D")
                    .name("RBI 91-Day Sovereign T-Bills & SDF Repo")
                    .category("Sovereign Cash")
                    .amount(new BigDecimal("150000000.0000"))
                    .allocationPercent(30.0)
                    .riskWeight(0.05)
                    .isLiquid(true)
                    .build();

            PortfolioAsset a2 = PortfolioAsset.builder()
                    .portfolioId(portfolio.getId())
                    .symbol("MM_AAA")
                    .name("Indian Overnight & Liquid Funds (CRISIL AAA)")
                    .category("Money Market")
                    .amount(new BigDecimal("125000000.0000"))
                    .allocationPercent(25.0)
                    .riskWeight(0.10)
                    .isLiquid(true)
                    .build();

            PortfolioAsset a3 = PortfolioAsset.builder()
                    .portfolioId(portfolio.getId())
                    .symbol("IN10Y")
                    .name("AAA PSU & Sovereign 10-Yr G-Sec Bonds")
                    .category("Fixed Income")
                    .amount(new BigDecimal("125000000.0000"))
                    .allocationPercent(25.0)
                    .riskWeight(0.20)
                    .isLiquid(true)
                    .build();

            PortfolioAsset a4 = PortfolioAsset.builder()
                    .portfolioId(portfolio.getId())
                    .symbol("CORP_CREDIT")
                    .name("Senior Secured Indian Direct Corporate Credit")
                    .category("Alternative Yield")
                    .amount(new BigDecimal("50000000.0000"))
                    .allocationPercent(10.0)
                    .riskWeight(0.55)
                    .isLiquid(false)
                    .build();

            PortfolioAsset a5 = PortfolioAsset.builder()
                    .portfolioId(portfolio.getId())
                    .symbol("RELIANCE")
                    .name("NIFTY 50 Bluechip & High Beta Alpha Equities")
                    .category("High Beta Alpha")
                    .amount(new BigDecimal("50000000.0000"))
                    .allocationPercent(10.0)
                    .riskWeight(0.65)
                    .isLiquid(false)
                    .build();

            portfolioAssetRepository.saveAll(List.of(a1, a2, a3, a4, a5));

            // Seed Risk Limit
            RiskLimit limit = RiskLimit.builder()
                    .userId(user.getId())
                    .userEmail(user.getEmail())
                    .portfolioId(portfolio.getId())
                    .maxVaR99Percent(4.5)
                    .maxLossPercent(8.0)
                    .minLiquidityPercent(30.0)
                    .maxSingleAssetExposure(35.0)
                    .warningRiskScoreThreshold(50.0)
                    .criticalRiskScoreThreshold(75.0)
                    .build();
            riskLimitRepository.save(limit);
        } else {
            portfolio = portfolios.get(0);
        }

        // =========================================================================
        // AUTOMATIC BACKFILL: Fix any existing rows in DB where user_email was NULL
        // =========================================================================
        List<Portfolio> allPortfolios = portfolioRepository.findAll();
        for (Portfolio p : allPortfolios) {
            if (p.getUserEmail() == null || p.getUserEmail().isBlank()) {
                if (p.getUserId() != null) {
                    userRepository.findById(p.getUserId()).ifPresent(u -> {
                        p.setUserEmail(u.getEmail());
                        portfolioRepository.save(p);
                        log.info("🔄 Backfilled user_email: {} for Portfolio ID: {}", u.getEmail(), p.getId());
                    });
                } else {
                    p.setUserEmail(defaultEmail);
                    portfolioRepository.save(p);
                }
            }
        }

        List<StockOrder> allOrders = stockOrderRepository.findAll();
        for (StockOrder o : allOrders) {
            if (o.getUserEmail() == null || o.getUserEmail().isBlank()) {
                if (o.getUserId() != null) {
                    userRepository.findById(o.getUserId()).ifPresent(u -> {
                        o.setUserEmail(u.getEmail());
                        stockOrderRepository.save(o);
                    });
                } else {
                    o.setUserEmail(defaultEmail);
                    stockOrderRepository.save(o);
                }
            }
        }

        List<RiskLimit> allLimits = riskLimitRepository.findAll();
        for (RiskLimit l : allLimits) {
            if (l.getUserEmail() == null || l.getUserEmail().isBlank()) {
                if (l.getUserId() != null) {
                    userRepository.findById(l.getUserId()).ifPresent(u -> {
                        l.setUserEmail(u.getEmail());
                        riskLimitRepository.save(l);
                    });
                } else {
                    l.setUserEmail(defaultEmail);
                    riskLimitRepository.save(l);
                }
            }
        }

        log.info("✅ Supabase PostgreSQL is connected & all tables have active verified data with non-null user_email (User ID: {}, Email: {})", user.getId(), user.getEmail());
    }
}
