import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  SlidersHorizontal, 
  CheckCircle, 
  RefreshCw,
  Droplet,
  Layers
} from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function CorrectiveActionsWidget() {
  const {
    currentRiskScore,
    limits,
    isLiquidityBreached,
    isExposureBreached,
    isLossLimitBreached,
    activeMitigationSuggestion,
    executeFlightToSafety,
    executeLiquidityInjection,
    executeConcentrationTrim,
    resetToSafeState,
  } = useRiskSafeguard();

  const [lastExecutedAction, setLastExecutedAction] = useState(null);

  const handleAction = (actionKey, name) => {
    if (actionKey === 'flight_to_safety' || actionKey === 'contain_shock') {
      executeFlightToSafety();
    } else if (actionKey === 'rebalance_liquidity') {
      executeLiquidityInjection(25000000);
    } else if (actionKey === 'trim_concentration') {
      executeConcentrationTrim();
    }
    setLastExecutedAction(name);
    setTimeout(() => setLastExecutedAction(null), 3500);
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
          <div style={{ width: 34, height: 34, borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="#10B981" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              AI Safeguard Remediation & Action Engine
            </h2>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
              One-click autonomous rebalancing and capital preservation protocols
            </p>
          </div>
        </div>

        {lastExecutedAction && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.82rem', fontWeight: 700 }}>
            <CheckCircle size={16} />
            <span>{lastExecutedAction} Successfully Executed!</span>
          </div>
        )}
      </div>

      {/* Suggested Primary Action Banner */}
      {activeMitigationSuggestion && (
        <div
          style={{
            background: 'linear-gradient(135deg, #09132E 0%, #1E293B 100%)',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ background: '#FF5B37', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', textTransform: 'uppercase' }}>
                Recommended AI Action
              </span>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{activeMitigationSuggestion.title}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#F1F5F9', maxWidth: '650px', lineHeight: 1.4 }}>
              {activeMitigationSuggestion.recommendedStep}
            </p>
          </div>

          <button
            onClick={() => handleAction(activeMitigationSuggestion.actionKey, activeMitigationSuggestion.title)}
            style={{
              background: '#FF5B37',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.65rem 1.4rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(255, 91, 55, 0.3)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <Zap size={15} />
            <span>Execute AI Recommendation</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* 3 Core Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        
        {/* Action Card 1: Flight to Safety */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={16} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Flight to Safety Protocol
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', lineHeight: 1.45 }}>
              Instantly shifts 85% of multi-asset capital into US Sovereign T-Bills and overnight reverse repo, suppressing risk score to &lt;20.
            </p>
          </div>

          <button
            onClick={() => handleAction('flight_to_safety', 'Flight to Safety')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              padding: '0.6rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10B981'; e.currentTarget.style.color = '#10B981'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#0F172A'; }}
          >
            <ShieldCheck size={14} />
            <span>Trigger Flight to Safety</span>
          </button>
        </div>

        {/* Action Card 2: Liquidity Injection */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplet size={16} color="#3B82F6" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Inject Instant Liquidity Buffer
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', lineHeight: 1.45 }}>
              Draws down available credit reserves and sweeps $25M from corporate paper into liquid prime cash to protect payroll & operational obligations.
            </p>
          </div>

          <button
            onClick={() => handleAction('rebalance_liquidity', 'Liquidity Injection')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              padding: '0.6rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#3B82F6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#0F172A'; }}
          >
            <Droplet size={14} />
            <span>Inject +$25M Liquidity</span>
          </button>
        </div>

        {/* Action Card 3: Concentration Trim */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={16} color="#6366F1" />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Equalize Asset Concentration
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', lineHeight: 1.45 }}>
              Enforces maximum asset exposure ceiling ({limits.maxSingleAssetExposure}%), distributing overweight gains into diversified sovereign paper.
            </p>
          </div>

          <button
            onClick={() => handleAction('trim_concentration', 'Concentration Rebalance')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              padding: '0.6rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366F1'; e.currentTarget.style.color = '#6366F1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#0F172A'; }}
          >
            <Layers size={14} />
            <span>Trim Concentration Risk</span>
          </button>
        </div>

      </div>
    </div>
  );
}
