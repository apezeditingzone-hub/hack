import React from 'react';
import { Sliders, Shield, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function RiskLimitsPanel() {
  const {
    limits,
    updateLimits,
    autoRemediateEnabled,
    setAutoRemediateEnabled,
    resetToSafeState,
  } = useRiskSafeguard();

  const handleSliderChange = (field, value) => {
    updateLimits({ [field]: parseFloat(value) });
  };

  // Preset policies
  const applyPreset = (presetName) => {
    if (presetName === 'conservative') {
      updateLimits({
        maxLossPercent: 3.0,
        minLiquidityPercent: 35.0,
        maxSingleAssetExposure: 25.0,
        criticalRiskScoreThreshold: 65,
        maxVaR99Percent: 2.0,
      });
    } else if (presetName === 'balanced') {
      updateLimits({
        maxLossPercent: 5.0,
        minLiquidityPercent: 25.0,
        maxSingleAssetExposure: 35.0,
        criticalRiskScoreThreshold: 75,
        maxVaR99Percent: 3.5,
      });
    } else if (presetName === 'growth') {
      updateLimits({
        maxLossPercent: 8.0,
        minLiquidityPercent: 15.0,
        maxSingleAssetExposure: 45.0,
        criticalRiskScoreThreshold: 85,
        maxVaR99Percent: 5.5,
      });
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Header with Title and Presets */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sliders size={18} color="#0F172A" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Risk Limits & Safeguard Controls
            </h2>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
              Define automated enforcement ceilings for treasury assets
            </p>
          </div>
        </div>

        {/* Policy Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => applyPreset('conservative')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            Conservative
          </button>
          <button
            onClick={() => applyPreset('balanced')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #FF5B37',
              background: 'rgba(255, 91, 55, 0.08)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#FF5B37',
              cursor: 'pointer',
            }}
          >
            Balanced (Default)
          </button>
          <button
            onClick={() => applyPreset('growth')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            Dynamic Yield
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Limit 1: Max Loss / Drawdown Limit */}
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                Maximum Loss / Drawdown Limit
              </span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Triggers safeguard protection if projected loss exceeds threshold
              </p>
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF5B37', background: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              {limits.maxLossPercent}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="0.5"
            value={limits.maxLossPercent}
            onChange={(e) => handleSliderChange('maxLossPercent', e.target.value)}
            style={{ width: '100%', accentColor: '#FF5B37', cursor: 'pointer' }}
          />
        </div>

        {/* Limit 2: Minimum Liquidity Reserve */}
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                Minimum Liquidity Reserve Floor
              </span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Guaranteed cash and overnight sovereign paper reserve
              </p>
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10B981', background: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              {limits.minLiquidityPercent}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="1"
            value={limits.minLiquidityPercent}
            onChange={(e) => handleSliderChange('minLiquidityPercent', e.target.value)}
            style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
          />
        </div>

        {/* Limit 3: Single Asset Exposure Ceiling */}
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                Single Asset Concentration Limit
              </span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Maximum portfolio percentage allowed in a single asset class
              </p>
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#6366F1', background: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              {limits.maxSingleAssetExposure}%
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="60"
            step="1"
            value={limits.maxSingleAssetExposure}
            onChange={(e) => handleSliderChange('maxSingleAssetExposure', e.target.value)}
            style={{ width: '100%', accentColor: '#6366F1', cursor: 'pointer' }}
          />
        </div>

        {/* Limit 4: Red Alert Score Threshold */}
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                Critical Red Alert Risk Ceiling
              </span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Score above which automated emergency notifications and mitigations trigger
              </p>
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#EF4444', background: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              {limits.criticalRiskScoreThreshold} / 100
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="1"
            value={limits.criticalRiskScoreThreshold}
            onChange={(e) => handleSliderChange('criticalRiskScoreThreshold', e.target.value)}
            style={{ width: '100%', accentColor: '#EF4444', cursor: 'pointer' }}
          />
        </div>

      </div>

      {/* Autopilot Auto-Remediation Toggle Box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: autoRemediateEnabled ? 'rgba(16, 185, 129, 0.08)' : '#F1F5F9',
          border: `1px solid ${autoRemediateEnabled ? 'rgba(16, 185, 129, 0.3)' : '#E2E8F0'}`,
          borderRadius: '12px',
          padding: '1rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              background: autoRemediateEnabled ? '#10B981' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>
              Autonomous Safeguard Auto-Rebalancing
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              {autoRemediateEnabled
                ? 'AI Sentinel will automatically execute flight to safety upon any limit breach'
                : 'Manual Approval Mode: Requires portfolio manager confirmation before rebalance'}
            </div>
          </div>
        </div>

        <button
          onClick={() => setAutoRemediateEnabled(!autoRemediateEnabled)}
          style={{
            background: autoRemediateEnabled ? '#10B981' : '#CBD5E1',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
        >
          {autoRemediateEnabled ? 'AUTOPILOT ON' : 'MANUAL MODE'}
        </button>
      </div>

    </div>
  );
}
