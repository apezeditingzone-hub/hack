import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  DEFAULT_RISK_LIMITS,
  INITIAL_ASSET_ALLOCATION,
  SHOCK_SCENARIOS,
  INITIAL_ALERT_LOGS,
  calculateTotalAUM,
  calculateCompositeRiskScore,
  calculateLiquidityPercent,
} from '../services/riskSafeguardService';

const RiskSafeguardContext = createContext(null);

export function RiskSafeguardProvider({ children }) {
  const [limits, setLimits] = useState(DEFAULT_RISK_LIMITS);
  const [assets, setAssets] = useState(INITIAL_ASSET_ALLOCATION);
  const [activeShock, setActiveShock] = useState(null);
  const [marketMultiplier, setMarketMultiplier] = useState(1.0);
  const [autoRemediateEnabled, setAutoRemediateEnabled] = useState(false);
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [alertLogs, setAlertLogs] = useState(INITIAL_ALERT_LOGS);
  const [showRedAlertBanner, setShowRedAlertBanner] = useState(false);
  const [activeMitigationSuggestion, setActiveMitigationSuggestion] = useState(null);

  // Time-series history for dashboard charts
  const [riskHistory, setRiskHistory] = useState(() => {
    const initial = [];
    const now = Date.now();
    for (let i = 12; i >= 0; i--) {
      const timeStr = new Date(now - i * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const baseRisk = 28 + Math.sin(i) * 6;
      initial.push({
        time: timeStr,
        riskScore: Math.round(baseRisk * 10) / 10,
        riskLimit: DEFAULT_RISK_LIMITS.criticalRiskScoreThreshold,
        warningLimit: DEFAULT_RISK_LIMITS.warningRiskScoreThreshold,
        liquidityPct: 63.0,
        portfolioAUM: 142.85,
      });
    }
    return initial;
  });

  const totalAUM = calculateTotalAUM(assets);
  const currentLiquidity = calculateLiquidityPercent(assets);
  const currentRiskScore = calculateCompositeRiskScore(assets, limits, marketMultiplier);

  // Determine risk level: 'safe' | 'warning' | 'critical'
  const riskStatus = currentRiskScore >= limits.criticalRiskScoreThreshold
    ? 'critical'
    : currentRiskScore >= limits.warningRiskScoreThreshold
    ? 'warning'
    : 'safe';

  // Value at Risk calculation (approximate 99% 1-day)
  const calculatedVaR = Math.round((currentRiskScore * 0.055) * 10) / 10;
  // Current portfolio Max Drawdown projection
  const currentMaxDrawdown = Math.round((currentRiskScore * 0.09) * 10) / 10;

  // Track if any specific limit is breached
  const isLossLimitBreached = currentMaxDrawdown > limits.maxLossPercent;
  const isLiquidityBreached = currentLiquidity < limits.minLiquidityPercent;
  const highestAssetExposure = Math.max(...assets.map(a => (a.amount / totalAUM) * 100));
  const isExposureBreached = highestAssetExposure > limits.maxSingleAssetExposure;
  const isVaRBreached = calculatedVaR > limits.maxVaR99Percent;

  const isAnyLimitBreached = isLossLimitBreached || isLiquidityBreached || isExposureBreached || isVaRBreached || riskStatus === 'critical';

  // Trigger alert banner when breach occurs
  useEffect(() => {
    if (isAnyLimitBreached || riskStatus === 'critical') {
      setShowRedAlertBanner(true);

      // Prepare AI Suggested Action
      if (isLiquidityBreached) {
        setActiveMitigationSuggestion({
          title: 'Emergency Liquidity Injection',
          reason: `Liquid reserves (${currentLiquidity}%) fell below institutional floor (${limits.minLiquidityPercent}%).`,
          recommendedStep: 'Sweep ₹15 Cr from Corporate Paper and Market Yields into 100% liquid RBI T-Bills.',
          actionKey: 'rebalance_liquidity',
        });
      } else if (isExposureBreached) {
        setActiveMitigationSuggestion({
          title: 'Concentration Trim & De-Risking',
          reason: `Single asset allocation (${highestAssetExposure.toFixed(1)}%) breached maximum concentration limit (${limits.maxSingleAssetExposure}%).`,
          recommendedStep: 'Trim over-concentrated asset and diversify into risk-free sovereign reserves.',
          actionKey: 'trim_concentration',
        });
      } else if (activeShock) {
        setActiveMitigationSuggestion({
          title: 'Macro Shock Containment Protocol',
          reason: `Market shock active: ${activeShock.title}. Volatility multiplier at ${marketMultiplier.toFixed(2)}x.`,
          recommendedStep: activeShock.suggestedAction,
          actionKey: 'contain_shock',
        });
      } else {
        setActiveMitigationSuggestion({
          title: 'Autonomous Portfolio De-Risking',
          reason: `Portfolio Risk Score (${currentRiskScore}) breached safety threshold (${limits.criticalRiskScoreThreshold}).`,
          recommendedStep: 'Execute Flight to Safety: Rebalance 40% of volatile yield into RBI Sovereign Treasury Bills.',
          actionKey: 'flight_to_safety',
        });
      }

      // If Autopilot is enabled, automatically trigger after a 3s safety delay
      if (autoRemediateEnabled) {
        const timer = setTimeout(() => {
          executeFlightToSafety('Autonomous AI Sentinel');
        }, 2200);
        return () => clearTimeout(timer);
      }
    } else {
      if (riskStatus === 'safe') {
        setShowRedAlertBanner(false);
      }
    }
  }, [isAnyLimitBreached, riskStatus, currentLiquidity, highestAssetExposure, activeShock, limits, autoRemediateEnabled]);

  // Tick simulation
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      // Add slight random market wiggle
      const wiggle = (Math.random() - 0.5) * 1.4;
      const effectiveScore = Math.max(8, Math.min(99, Math.round((currentRiskScore + wiggle) * 10) / 10));

      setRiskHistory((prev) => {
        const next = [
          ...prev.slice(1),
          {
            time: nowStr,
            riskScore: effectiveScore,
            riskLimit: limits.criticalRiskScoreThreshold,
            warningLimit: limits.warningRiskScoreThreshold,
            liquidityPct: currentLiquidity,
            portfolioAUM: Math.round((totalAUM / 1000000) * 100) / 100,
          }
        ];
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveSimulating, currentRiskScore, limits, currentLiquidity, totalAUM]);

  // Log incident helper
  const addIncidentLog = useCallback((log) => {
    const newEntry = {
      id: 'alt_' + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      ...log,
    };
    setAlertLogs((prev) => [newEntry, ...prev.slice(0, 49)]);
  }, []);

  // Corrective Action 1: Flight to Safety (Emergency Rebalance)
  const executeFlightToSafety = useCallback((source = 'Portfolio Manager') => {
    setAssets((prev) => {
      const total = calculateTotalAUM(prev);
      // Re-allocate: 60% T-Bills, 25% Prime Money Market, 10% IG Corp Paper, 3% Private Credit, 2% Alpha
      const updated = [
        { ...prev[0], amount: Math.round(total * 0.60), percentage: 60.0 },
        { ...prev[1], amount: Math.round(total * 0.25), percentage: 25.0 },
        { ...prev[2], amount: Math.round(total * 0.10), percentage: 10.0 },
        { ...prev[3], amount: Math.round(total * 0.03), percentage: 3.0 },
        { ...prev[4], amount: Math.round(total * 0.02), percentage: 2.0 },
      ];
      return updated;
    });

    setMarketMultiplier(1.0);
    setActiveShock(null);
    setShowRedAlertBanner(false);

    addIncidentLog({
      severity: 'safe',
      title: 'Emergency Flight to Safety Executed',
      asset: 'Multi-Asset Treasury Portfolio',
      message: `De-risked high-beta allocations. 85% of capital concentrated in Tier-1 US T-Bills and Overnight Reserves.`,
      actionTaken: `Executed by ${source}. Risk Score suppressed below warning threshold.`,
      status: 'auto-remediated',
      riskScoreAtTrigger: currentRiskScore,
    });
  }, [currentRiskScore, addIncidentLog]);

  // Corrective Action 2: Inject Liquidity
  const executeLiquidityInjection = useCallback((amount = 20000000) => {
    setAssets((prev) => {
      // Move from corp bonds & private credit into T-Bills and Prime Funds
      const updated = prev.map((asset) => {
        if (asset.id === 'tbills') return { ...asset, amount: asset.amount + amount * 0.6 };
        if (asset.id === 'mkt_fund') return { ...asset, amount: asset.amount + amount * 0.4 };
        if (asset.id === 'priv_credit') return { ...asset, amount: Math.max(2000000, asset.amount - amount * 0.5) };
        if (asset.id === 'alpha_strat') return { ...asset, amount: Math.max(1000000, asset.amount - amount * 0.5) };
        return asset;
      });
      // Recalculate percentages
      const newTotal = calculateTotalAUM(updated);
      return updated.map(a => ({ ...a, percentage: Math.round((a.amount / newTotal) * 1000) / 10 }));
    });

    setShowRedAlertBanner(false);
    addIncidentLog({
      severity: 'safe',
      title: 'Emergency Liquidity Injection Executed',
      asset: 'Sovereign Cash & Prime Reserves',
      message: `Injected ₹20 Cr liquidity buffer into RBI sovereign T-Bills. Instant liquidity restored to safe levels.`,
      actionTaken: 'Liquidity reserve re-established above policy floor.',
      status: 'resolved',
      riskScoreAtTrigger: currentRiskScore,
    });
  }, [currentRiskScore, addIncidentLog]);

  // Corrective Action 3: Concentration Trim
  const executeConcentrationTrim = useCallback(() => {
    setAssets((prev) => {
      const total = calculateTotalAUM(prev);
      const ceilingAmount = total * (limits.maxSingleAssetExposure / 100);

      const updated = prev.map((asset) => {
        if (asset.amount > ceilingAmount) {
          const excess = asset.amount - ceilingAmount;
          return { ...asset, amount: ceilingAmount };
        }
        return asset;
      });

      // Distribute excess to T-Bills
      const trimmedTotal = calculateTotalAUM(updated);
      const remaining = total - trimmedTotal;
      if (remaining > 0) {
        updated[0].amount += remaining;
      }

      return updated.map(a => ({ ...a, percentage: Math.round((a.amount / total) * 1000) / 10 }));
    });

    setShowRedAlertBanner(false);
    addIncidentLog({
      severity: 'safe',
      title: 'Portfolio Concentration Equalized',
      asset: 'Single Asset Exposure Rebalance',
      message: `Capped maximum exposure under ${limits.maxSingleAssetExposure}% policy ceiling.`,
      actionTaken: 'Autonomous AI trim balanced concentration risk.',
      status: 'resolved',
      riskScoreAtTrigger: currentRiskScore,
    });
  }, [limits, currentRiskScore, addIncidentLog]);

  // Trigger Market Shock Scenario
  const triggerShockScenario = useCallback((scenarioId) => {
    const shock = SHOCK_SCENARIOS.find(s => s.id === scenarioId);
    if (!shock) return;

    setActiveShock(shock);
    setMarketMultiplier(shock.impact.riskMultiplier);

    // Degrade asset values based on shock
    setAssets((prev) => {
      return prev.map((asset) => {
        let factor = 1.0;
        if (asset.id === 'priv_credit') factor = 1 - (shock.impact.privCreditDrawdown / 100);
        if (asset.id === 'alpha_strat') factor = 1 - (shock.impact.alphaStratDrawdown / 100);
        if (asset.id === 'corp_bonds') factor = 1 - (shock.impact.corpBondsDrop / 100);
        const newAmt = Math.round(asset.amount * factor);
        return { ...asset, amount: newAmt };
      });
    });

    setShowRedAlertBanner(true);

    addIncidentLog({
      severity: 'critical',
      title: `MARKET SHOCK DETECTED: ${shock.title}`,
      asset: 'Treasury Portfolio Global Exposure',
      message: shock.description,
      actionTaken: `Automated Safeguard System flagged RED ALERT. Suggested: ${shock.suggestedAction}`,
      status: 'pending-action',
      riskScoreAtTrigger: Math.min(98.5, currentRiskScore * shock.impact.riskMultiplier),
    });
  }, [currentRiskScore, addIncidentLog]);

  // Reset to default baseline state
  const resetToSafeState = useCallback(() => {
    setAssets(INITIAL_ASSET_ALLOCATION);
    setLimits(DEFAULT_RISK_LIMITS);
    setActiveShock(null);
    setMarketMultiplier(1.0);
    setShowRedAlertBanner(false);

    addIncidentLog({
      severity: 'safe',
      title: 'Safeguard System Reset to Baseline Parameters',
      asset: 'Full Treasury Architecture',
      message: 'Portfolio asset allocations and risk limits restored to verified initial state.',
      actionTaken: 'Baseline configuration reloaded.',
      status: 'resolved',
      riskScoreAtTrigger: 28.5,
    });
  }, [addIncidentLog]);

  // Execute Live Stock / Bond Order & Update Portfolio Allocation
  const executeLiveOrder = useCallback((order) => {
    const isBuy = order.side === 'BUY';
    const amountDelta = order.total;

    setAssets((prev) => {
      // Find matching asset category or default to high-beta alpha for equities / tbills for sovereign debt
      const targetId = order.symbol.startsWith('IN91') || order.symbol.startsWith('IN10') ? 'tbills' : 'alpha_strat';
      const updated = prev.map((asset) => {
        if (asset.id === targetId) {
          const newAmount = isBuy ? asset.amount + amountDelta : Math.max(1000000, asset.amount - amountDelta);
          return { ...asset, amount: newAmount };
        }
        return asset;
      });

      const newTotal = calculateTotalAUM(updated);
      return updated.map(a => ({ ...a, percentage: Math.round((a.amount / newTotal) * 1000) / 10 }));
    });

    addIncidentLog({
      severity: 'safe',
      title: `Institutional Order Executed: ${order.side} ${order.shares.toLocaleString('en-IN')} ${order.symbol}`,
      asset: order.symbol,
      message: `Settled ₹${order.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })} via Automated NSE/RBI Clearing Channel.`,
      actionTaken: 'Portfolio liquidity, weights, and holdings updated across all dashboards.',
      status: 'verified',
      riskScoreAtTrigger: currentRiskScore,
    });
  }, [currentRiskScore, addIncidentLog]);

  // Update Limits
  const updateLimits = useCallback((newLimits) => {
    setLimits((prev) => ({ ...prev, ...newLimits }));
  }, []);

  const value = {
    limits,
    updateLimits,
    assets,
    setAssets,
    totalAUM,
    currentLiquidity,
    currentRiskScore,
    riskStatus,
    calculatedVaR,
    currentMaxDrawdown,
    isLossLimitBreached,
    isLiquidityBreached,
    isExposureBreached,
    isVaRBreached,
    isAnyLimitBreached,
    activeShock,
    marketMultiplier,
    autoRemediateEnabled,
    setAutoRemediateEnabled,
    isLiveSimulating,
    setIsLiveSimulating,
    alertLogs,
    addIncidentLog,
    showRedAlertBanner,
    setShowRedAlertBanner,
    activeMitigationSuggestion,
    riskHistory,
    executeFlightToSafety,
    executeLiquidityInjection,
    executeConcentrationTrim,
    executeLiveOrder,
    triggerShockScenario,
    resetToSafeState,
    shockScenarios: SHOCK_SCENARIOS,
  };

  return (
    <RiskSafeguardContext.Provider value={value}>
      {children}
    </RiskSafeguardContext.Provider>
  );
}

export function useRiskSafeguard() {
  const context = useContext(RiskSafeguardContext);
  if (!context) {
    throw new Error('useRiskSafeguard must be used within a RiskSafeguardProvider');
  }
  return context;
}
