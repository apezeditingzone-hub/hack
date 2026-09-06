import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Activity, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useRiskSafeguard } from '../context/RiskSafeguardContext';
import RedAlertBanner from '../components/safeguards/RedAlertBanner';
import RiskScoreCard from '../components/safeguards/RiskScoreCard';
import RiskLimitsPanel from '../components/safeguards/RiskLimitsPanel';
import RiskDashboardCharts from '../components/safeguards/RiskDashboardCharts';
import MarketShockSimulator from '../components/safeguards/MarketShockSimulator';
import CorrectiveActionsWidget from '../components/safeguards/CorrectiveActionsWidget';
import AlertHistoryTable from '../components/safeguards/AlertHistoryTable';

export default function SafeguardsPage() {
  const navigate = useNavigate();
  const {
    isLiveSimulating,
    setIsLiveSimulating,
    resetToSafeState,
    riskStatus,
    autoRemediateEnabled,
    setAutoRemediateEnabled,
  } = useRiskSafeguard();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '6.85rem 1.5rem 4rem 1.5rem', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Page Top Title & Telemetry Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#FFFFFF', padding: '1.25rem 1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(15,23,42,0.02)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF5B37 0%, #09132E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 91, 55, 0.25)',
              }}
            >
              <ShieldCheck size={24} color="#FFFFFF" strokeWidth={2.4} />
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 91, 55, 0.1)', color: '#FF5B37', padding: '2px 8px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
                <ShieldCheck size={12} />
                <span>Autonomous Risk Sentinel</span>
              </div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#09101D', margin: 0, letterSpacing: '-0.02em' }}>
                Risk Limits & Autonomous Safeguards
              </h1>
            </div>
          </div>

          {/* Quick Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Live Ticker Simulation Toggle */}
            <button
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isLiveSimulating ? 'rgba(16, 185, 129, 0.1)' : '#F1F5F9',
                border: `1px solid ${isLiveSimulating ? '#10B981' : '#CBD5E1'}`,
                color: isLiveSimulating ? '#059669' : '#64748B',
                padding: '0.55rem 0.95rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {isLiveSimulating ? <Pause size={14} /> : <Play size={14} />}
              <span>{isLiveSimulating ? 'Live Telemetry Active' : 'Telemetry Paused'}</span>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: isLiveSimulating ? '#10B981' : '#94A3B8' }} />
            </button>

            {/* Reset to Safe State Button */}
            <button
              onClick={resetToSafeState}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                padding: '0.55rem 0.95rem',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.15s ease',
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Baseline</span>
            </button>
          </div>

        </div>
        
        {/* Red Alert Banner (Conditionally Rendered when breach occurs) */}
        <RedAlertBanner />

        {/* Section 1: Real-time Risk Score & Limits Configuration */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
          <RiskScoreCard />
          <RiskLimitsPanel />
        </div>

        {/* Section 2: Comprehensive Risk Dashboard Charts */}
        <div>
          <RiskDashboardCharts />
        </div>

        {/* Section 3: Market Shock Simulator & Stress Injector */}
        <div>
          <MarketShockSimulator />
        </div>

        {/* Section 4: AI Safeguard Remediation & Corrective Actions */}
        <div>
          <CorrectiveActionsWidget />
        </div>

        {/* Section 5: Alert History & Audit Trail */}
        <div>
          <AlertHistoryTable />
        </div>

      </main>

    </div>
  );
}
