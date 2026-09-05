import React from 'react';
import { 
  Zap, 
  Flame, 
  Droplet, 
  TrendingDown, 
  RotateCcw, 
  AlertOctagon,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function MarketShockSimulator() {
  const {
    shockScenarios,
    activeShock,
    triggerShockScenario,
    resetToSafeState,
    marketMultiplier,
    executeFlightToSafety,
  } = useRiskSafeguard();

  const shockIcons = {
    black_swan: Flame,
    liquidity_crunch: Droplet,
    interest_rate_spike: TrendingDown,
    stablecoin_fx_shock: AlertOctagon,
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="#EF4444" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Market Shock & Stress Injector
            </h2>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
              Simulate systemic financial crises to test real-time safeguard triggers
            </p>
          </div>
        </div>

        {activeShock && (
          <button
            onClick={resetToSafeState}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RotateCcw size={14} />
            <span>Reset to Safe Baseline</span>
          </button>
        )}
      </div>

      {/* Active Shock Banner if active */}
      {activeShock && (
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={22} color="#EF4444" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#991B1B' }}>
                ACTIVE CRISIS SIMULATION: {activeShock.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#B91C1C' }}>
                Stress Multiplier: {marketMultiplier.toFixed(2)}x | Volatility Surge active
              </div>
            </div>
          </div>

          <button
            onClick={() => executeFlightToSafety('Crisis Emergency Rebalancer')}
            style={{
              background: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Zap size={15} />
            <span>Execute Flight to Safety</span>
          </button>
        </div>
      )}

      {/* Scenario Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {shockScenarios.map((scenario) => {
          const Icon = shockIcons[scenario.id] || Zap;
          const isActive = activeShock?.id === scenario.id;

          return (
            <div
              key={scenario.id}
              style={{
                background: isActive ? '#FEF2F2' : '#F8FAFC',
                border: `1px solid ${isActive ? '#EF4444' : '#E2E8F0'}`,
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      background: scenario.severity === 'critical' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color={scenario.severity === 'critical' ? '#EF4444' : '#F59E0B'} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      background: scenario.severity === 'critical' ? '#FEE2E2' : '#FEF3C7',
                      color: scenario.severity === 'critical' ? '#DC2626' : '#D97706',
                    }}
                  >
                    {scenario.severity}
                  </span>
                </div>

                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {scenario.title}
                </h3>

                <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.45 }}>
                  {scenario.description}
                </p>
              </div>

              <button
                onClick={() => triggerShockScenario(scenario.id)}
                style={{
                  width: '100%',
                  background: isActive ? '#DC2626' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#0F172A',
                  border: `1px solid ${isActive ? '#DC2626' : '#CBD5E1'}`,
                  padding: '0.6rem',
                  borderRadius: '9px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#EF4444';
                    e.currentTarget.style.color = '#EF4444';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.color = '#0F172A';
                  }
                }}
              >
                <Zap size={14} />
                <span>{isActive ? 'Crisis Active (Trigger Again)' : 'Simulate Shock'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
