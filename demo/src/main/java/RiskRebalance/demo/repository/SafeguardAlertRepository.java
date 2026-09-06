package RiskRebalance.demo.repository;

import RiskRebalance.demo.model.SafeguardAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SafeguardAlertRepository extends JpaRepository<SafeguardAlert, Long> {
    List<SafeguardAlert> findByPortfolioIdOrderByCreatedAtDesc(Long portfolioId);
}
