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
@Table(name = "risk_limits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiskLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Column(name = "portfolio_id")
    private Long portfolioId;

    @Column(name = "max_var_99_percent")
    private Double maxVaR99Percent;

    @Column(name = "max_loss_percent")
    private Double maxLossPercent;

    @Column(name = "min_liquidity_percent")
    private Double minLiquidityPercent;

    @Column(name = "max_single_asset_exposure")
    private Double maxSingleAssetExposure;

    @Column(name = "warning_risk_score_threshold")
    private Double warningRiskScoreThreshold;

    @Column(name = "critical_risk_score_threshold")
    private Double criticalRiskScoreThreshold;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
