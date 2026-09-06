package RiskRebalance.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rebalance_executions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RebalanceExecution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Column(name = "portfolio_id")
    private Long portfolioId;

    @Column(name = "trigger_reason", length = 255)
    private String triggerReason; // FLIGHT_TO_SAFETY, LIQUIDITY_INJECTION, CONCENTRATION_TRIM, MANUAL

    @Column(name = "from_asset_symbol", length = 50)
    private String fromAssetSymbol;

    @Column(name = "to_asset_symbol", length = 50)
    private String toAssetSymbol;

    @Column(name = "amount_rebalanced", precision = 19, scale = 4)
    private BigDecimal amountRebalanced;

    @Column(name = "risk_score_before")
    private Double riskScoreBefore;

    @Column(name = "risk_score_after")
    private Double riskScoreAfter;

    @Column(length = 50)
    private String status; // COMPLETED, FAILED, IN_PROGRESS

    @CreationTimestamp
    @Column(name = "executed_at", updatable = false)
    private LocalDateTime executedAt;
}
