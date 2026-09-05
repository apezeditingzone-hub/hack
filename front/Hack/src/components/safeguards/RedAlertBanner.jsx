import React from 'react';
import { AlertTriangle, ShieldAlert, Zap, ArrowRight, X } from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function RedAlertBanner() {
  const {
    showRedAlertBanner,
    setShowRedAlertBanner,
    currentRiskScore,
    limits,
    activeShock,
    isLiquidityBreached,
    isExposureBreached,
    isLossLimitBreached,
    currentLiquidity,
    currentMaxDrawdown,
    activeMitigationSuggestion,
    executeFlightToSafety,
    executeLiquidityInjection,
    executeConcentrationTrim,
    autoRemediateEnabled,
  } = useRiskSafeguard();

  if (!showRedAlertBanner) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.96) 0%, rgba(185, 28, 28, 0.98) 100%)',
        border: '1px solid rgba(254, 202, 202, 0.4)',
        boxShadow: '0 8px 30px rgba(239, 68, 68, 0.35)',
        color: '#FFFFFF',
        padding: '1.1rem 1.5rem',
        borderRadius: '16px',
        marginBottom: '1.75rem',
        position: 'relative',
        animation: 'pulseGlow 2.5s infinite ease-in-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
        
        {/* Left: Siren & Alert Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 500px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <ShieldAlert size={26} color="#FFFFFF" strokeWidth={2.5} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#FFFFFF',
                  color: '#DC2626',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                CRITICAL RED ALERT
              </span>
              <span style={{ fontSize: '0.85rem', color: '#FEE2E2', fontWeight: 600 }}>
                Automatic Risk Limit Breach Detected
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '6px 0 4px 0', letterSpacing: '-0.01em' }}>
              {activeShock ? activeShock.title : 'Portfolio Institutional Risk Threshold Exceeded'}
            </h3>

            <p style={{ margin: 0, fontSize: '0.88rem', color: '#FEE2E2', lineHeight: 1.5 }}>
              {activeMitigationSuggestion?.reason || `Risk Score has surged to ${currentRiskScore} (Safety Ceiling: ${limits.criticalRiskScoreThreshold}). Immediate remediation recommended.`}
            </p>

            {/* Breached Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              <span style={{ background: 'rgba(0,0,0,0.25)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                Score: <strong style={{ color: '#FEE2E2' }}>{currentRiskScore}</strong> / {limits.criticalRiskScoreThreshold} Limit
              </span>
              {isLossLimitBreached && (
                <span style={{ background: 'rgba(0,0,0,0.25)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                  Drawdown: <strong style={{ color: '#FEE2E2' }}>{currentMaxDrawdown}%</strong> / {limits.maxLossPercent}% Limit
                </span>
              )}
              {isLiquidityBreached && (
                <span style={{ background: 'rgba(0,0,0,0.25)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                  Liquidity: <strong style={{ color: '#FEE2E2' }}>{currentLiquidity}%</strong> / {limits.minLiquidityPercent}% Floor
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Corrective Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => executeFlightToSafety('Manual Risk Override')}
              style={{
                background: '#FFFFFF',
                color: '#B91C1C',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                transition: 'transform 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'none'; }}
            >
              <Zap size={16} />
              <span>⚡ Trigger Flight to Safety</span>
            </button>

            {isLiquidityBreached && (
              <button
                onClick={() => executeLiquidityInjection(20000000)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Inject Liquidity
              </button>
            )}

            <button
              onClick={() => setShowRedAlertBanner(false)}
              aria-label="Dismiss alert"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FEE2E2',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {autoRemediateEnabled && (
            <span style={{ fontSize: '0.75rem', color: '#FEE2E2', fontStyle: 'italic' }}>
              🤖 Autonomous AI Sentinel is active & remediating...
            </span>
          )}
        </div>

      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 30px rgba(239, 68, 68, 0.35); }
          50% { box-shadow: 0 8px 40px rgba(239, 68, 68, 0.65); }
        }
      `}</style>
    </div>
  );
}
