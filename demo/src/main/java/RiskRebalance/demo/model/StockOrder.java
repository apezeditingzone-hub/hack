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
@Table(name = "stock_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Column(name = "portfolio_id")
    private Long portfolioId;

    @Column(nullable = false, length = 50)
    private String symbol;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "order_type", length = 20)
    private String orderType; // BUY, SELL

    private Integer quantity;

    @Column(precision = 19, scale = 4)
    private BigDecimal price;

    @Column(name = "total_amount", precision = 19, scale = 4)
    private BigDecimal totalAmount;

    @Column(length = 50)
    private String status; // EXECUTED, PENDING, CANCELLED

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
