package RiskRebalance.demo.repository;

import RiskRebalance.demo.model.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockOrderRepository extends JpaRepository<StockOrder, Long> {
    List<StockOrder> findByUserId(Long userId);
    List<StockOrder> findByPortfolioId(Long portfolioId);
}
