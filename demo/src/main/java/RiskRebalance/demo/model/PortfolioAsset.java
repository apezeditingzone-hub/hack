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
@Table(name = "portfolio_assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "portfolio_id", nullable = false)
    private Long portfolioId;

    @Column(nullable = false, length = 50)
    private String symbol;

    @Column(nullable = false)
    private String name;

    @Column(length = 100)
    private String category; // Sovereign, Corporate Bond, Yield, Equity, Cash

    @Column(precision = 19, scale = 4)
    private BigDecimal amount;

    @Column(name = "allocation_percent")
    private Double allocationPercent;

    @Column(name = "risk_weight")
    private Double riskWeight;

    @Column(name = "is_liquid")
    private Boolean isLiquid;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
