package RiskRebalance.demo.repository;

import RiskRebalance.demo.model.RebalanceExecution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RebalanceExecutionRepository extends JpaRepository<RebalanceExecution, Long> {
    List<RebalanceExecution> findByPortfolioIdOrderByExecutedAtDesc(Long portfolioId);
}
