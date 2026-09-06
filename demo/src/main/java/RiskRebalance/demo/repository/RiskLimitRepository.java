package RiskRebalance.demo.repository;

import RiskRebalance.demo.model.RiskLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiskLimitRepository extends JpaRepository<RiskLimit, Long> {
    Optional<RiskLimit> findByPortfolioId(Long portfolioId);
    Optional<RiskLimit> findByUserId(Long userId);
}
