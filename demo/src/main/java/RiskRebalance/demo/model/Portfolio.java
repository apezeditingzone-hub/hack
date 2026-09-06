package RiskRebalance.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Column(nullable = false)
    private String name;

    @Column(name = "total_aum", precision = 19, scale = 4)
    private BigDecimal totalAum;

    @Column(length = 10)
    private String currency; // INR, USD

    @Column(name = "risk_score")
    private Double riskScore;

    @Column(name = "liquidity_percent")
    private Double liquidityPercent;

    @Column(name = "status", length = 50)
    private String status; // ACTIVE, BALANCED, ALERT, UNDER_REBALANCE

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
