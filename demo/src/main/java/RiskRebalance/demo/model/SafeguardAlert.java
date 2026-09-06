package RiskRebalance.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "safeguard_alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SafeguardAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Column(name = "portfolio_id")
    private Long portfolioId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String severity; // INFO, WARNING, CRITICAL

    @Column(length = 50)
    private String status; // ACTIVE, RESOLVED, AUTO_REMEDIATED

    @Column(name = "action_taken", columnDefinition = "TEXT")
    private String actionTaken;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
