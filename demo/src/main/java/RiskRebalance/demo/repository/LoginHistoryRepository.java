package RiskRebalance.demo.repository;

import RiskRebalance.demo.model.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {
    List<LoginHistory> findByEmailOrderByLoginTimeDesc(String email);
    List<LoginHistory> findByUserIdOrderByLoginTimeDesc(Long userId);
}
