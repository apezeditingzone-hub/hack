package RiskRebalance.demo.controller;

import RiskRebalance.demo.model.*;
import RiskRebalance.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/portfolios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;
    private final PortfolioAssetRepository portfolioAssetRepository;
    private final StockOrderRepository stockOrderRepository;
    private final RiskLimitRepository riskLimitRepository;
    private final SafeguardAlertRepository safeguardAlertRepository;
    private final RebalanceExecutionRepository rebalanceExecutionRepository;
    private final UserRepository userRepository;

    /**
     * Save or update portfolio details entered by user
     */
    @PostMapping("/save")
    public ResponseEntity<?> savePortfolio(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        String name = (String) request.getOrDefault("name", "Indian Institutional Treasury Portfolio");
        Object capitalObj = request.get("capital");
        Object riskObj = request.get("maxRiskLimit");
        Object liquidityObj = request.get("minLiquidityLimit");
        Object returnObj = request.get("targetExpectedReturn");
        List<Map<String, Object>> assetsData = (List<Map<String, Object>>) request.get("assets");

        String cleanEmail = email != null && !email.isBlank() ? email.trim().toLowerCase() : null;
        Long userId = null;
        if (cleanEmail != null) {
            Optional<User> userOpt = userRepository.findByEmailIgnoreCase(cleanEmail);
            if (userOpt.isPresent()) {
                userId = userOpt.get().getId();
            }
        }

        BigDecimal capital = capitalObj != null ? new BigDecimal(capitalObj.toString()) : new BigDecimal("500000000");
        Double riskScore = riskObj != null ? Double.parseDouble(riskObj.toString()) : 18.0;
        Double liquidity = liquidityObj != null ? Double.parseDouble(liquidityObj.toString()) : 30.0;
        Double returnTarget = returnObj != null ? Double.parseDouble(returnObj.toString()) : 12.5;

        // Find existing portfolio or create new
        Portfolio portfolio;
        if (userId != null) {
            List<Portfolio> existing = portfolioRepository.findByUserId(userId);
            if (!existing.isEmpty()) {
                portfolio = existing.get(0);
            } else {
                portfolio = new Portfolio();
                portfolio.setUserId(userId);
            }
        } else {
            portfolio = new Portfolio();
        }

        portfolio.setUserEmail(cleanEmail);
        portfolio.setName(name);
        portfolio.setTotalAum(capital);
        portfolio.setCurrency("INR");
        portfolio.setRiskScore(riskScore);
        portfolio.setLiquidityPercent(liquidity);
        portfolio.setStatus("ACTIVE");

        Portfolio savedPortfolio = portfolioRepository.save(portfolio);

        // Save / update risk limits
        RiskLimit riskLimit = riskLimitRepository.findByPortfolioId(savedPortfolio.getId())
                .orElse(new RiskLimit());
        riskLimit.setPortfolioId(savedPortfolio.getId());
        riskLimit.setUserId(userId);
        riskLimit.setUserEmail(cleanEmail);
        riskLimit.setMaxLossPercent(8.0);
        riskLimit.setMinLiquidityPercent(liquidity);
        riskLimit.setMaxSingleAssetExposure(35.0);
        riskLimit.setWarningRiskScoreThreshold(50.0);
        riskLimit.setCriticalRiskScoreThreshold(75.0);
        riskLimitRepository.save(riskLimit);

        // Save assets if provided
        if (assetsData != null && !assetsData.isEmpty()) {
            // Remove old assets
            List<PortfolioAsset> existingAssets = portfolioAssetRepository.findByPortfolioId(savedPortfolio.getId());
            if (!existingAssets.isEmpty()) {
                portfolioAssetRepository.deleteAll(existingAssets);
            }

            List<PortfolioAsset> assetEntities = new ArrayList<>();
            for (Map<String, Object> a : assetsData) {
                String assetName = (String) a.getOrDefault("name", "Asset");
                String symbol = (String) a.getOrDefault("symbol", (String) a.getOrDefault("id", "ASSET"));
                String category = (String) a.getOrDefault("category", "Uncategorized");
                Object amt = a.get("amount");
                Object pct = a.get("percentage");
                Object safe = a.get("isSafe");

                PortfolioAsset asset = PortfolioAsset.builder()
                        .portfolioId(savedPortfolio.getId())
                        .name(assetName)
                        .symbol(symbol)
                        .category(category)
                        .amount(amt != null ? new BigDecimal(amt.toString()) : BigDecimal.ZERO)
                        .allocationPercent(pct != null ? Double.parseDouble(pct.toString()) : 0.0)
                        .riskWeight(safe != null && Boolean.parseBoolean(safe.toString()) ? 0.05 : 0.65)
                        .isLiquid(safe != null && Boolean.parseBoolean(safe.toString()))
                        .build();

                assetEntities.add(asset);
            }
            portfolioAssetRepository.saveAll(assetEntities);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("portfolioId", savedPortfolio.getId());
        response.put("userId", savedPortfolio.getUserId());
        response.put("userEmail", savedPortfolio.getUserEmail());
        response.put("totalAum", savedPortfolio.getTotalAum());
        response.put("riskScore", savedPortfolio.getRiskScore());
        response.put("liquidityPercent", savedPortfolio.getLiquidityPercent());
        response.put("message", "Portfolio details successfully stored in Supabase PostgreSQL database!");

        return ResponseEntity.ok(response);
    }

    /**
     * Get user's saved portfolio and asset breakdown
     */
    @GetMapping("/user")
    public ResponseEntity<?> getUserPortfolio(@RequestParam(required = false) String email) {
        if (email == null || email.isBlank()) {
            List<Portfolio> all = portfolioRepository.findAll();
            if (all.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "No portfolio found"));
            }
            Portfolio p = all.get(0);
            List<PortfolioAsset> assets = portfolioAssetRepository.findByPortfolioId(p.getId());
            return ResponseEntity.ok(Map.of("portfolio", p, "assets", assets));
        }

        String cleanEmail = email.trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(cleanEmail);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        List<Portfolio> portfolios = portfolioRepository.findByUserId(userOpt.get().getId());
        if (portfolios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "No portfolio for user"));
        }

        Portfolio p = portfolios.get(0);
        List<PortfolioAsset> assets = portfolioAssetRepository.findByPortfolioId(p.getId());
        return ResponseEntity.ok(Map.of("portfolio", p, "assets", assets));
    }

    /**
     * Save a stock order (Buy / Sell)
     */
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> request) {
        String symbol = (String) request.get("symbol");
        String companyName = (String) request.getOrDefault("companyName", symbol);
        String orderType = (String) request.getOrDefault("orderType", "BUY");
        Object quantityObj = request.get("quantity");
        Object priceObj = request.get("price");
        Object totalAmountObj = request.get("totalAmount");
        String rawEmail = (String) request.get("email");
        String cleanEmail = rawEmail != null && !rawEmail.isBlank() ? rawEmail.trim().toLowerCase() : null;

        if (symbol == null || quantityObj == null || priceObj == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "symbol, quantity, and price are required"));
        }

        Long userId = null;
        if (cleanEmail != null) {
            Optional<User> userOpt = userRepository.findByEmailIgnoreCase(cleanEmail);
            if (userOpt.isPresent()) {
                userId = userOpt.get().getId();
            }
        }

        Integer qty = Integer.parseInt(quantityObj.toString());
        BigDecimal price = new BigDecimal(priceObj.toString());
        BigDecimal total = totalAmountObj != null ? new BigDecimal(totalAmountObj.toString()) : price.multiply(BigDecimal.valueOf(qty));

        StockOrder order = StockOrder.builder()
                .userId(userId)
                .userEmail(cleanEmail)
                .symbol(symbol)
                .companyName(companyName)
                .orderType(orderType)
                .quantity(qty)
                .price(price)
                .totalAmount(total)
                .status("EXECUTED")
                .build();

        StockOrder savedOrder = stockOrderRepository.save(order);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "orderId", savedOrder.getId(),
                "userId", savedOrder.getUserId() != null ? savedOrder.getUserId() : 0,
                "userEmail", savedOrder.getUserEmail() != null ? savedOrder.getUserEmail() : "",
                "symbol", savedOrder.getSymbol(),
                "status", savedOrder.getStatus(),
                "totalAmount", savedOrder.getTotalAmount(),
                "message", "Order saved in database!"
        ));
    }

    /**
     * Get all stock orders
     */
    @GetMapping("/orders")
    public ResponseEntity<List<StockOrder>> getAllOrders() {
        return ResponseEntity.ok(stockOrderRepository.findAll());
    }
}
