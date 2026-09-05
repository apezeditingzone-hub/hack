import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Activity, 
  ArrowLeft,
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
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#0F172A', paddingBottom: '4rem' }}>
      
      {/* Top Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E2E8F0',
          padding: '0.85rem 1.75rem',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Brand & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Platform</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF5B37 0%, #09132E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(255, 91, 55, 0.25)',
                }}
              >
                <ShieldCheck size={20} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#09101D', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Capital<span style={{ color: '#FF5B37' }}>X</span> Control & Safeguards
                </h1>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Autonomous Risk & Limit Sentinel
                </span>
              </div>
            </div>
          </div>

          {/* Top Right Quick Controls */}
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
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isLiveSimulating ? <Pause size={13} /> : <Play size={13} />}
              <span>{isLiveSimulating ? 'Live Telemetry Active' : 'Telemetry Paused'}</span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isLiveSimulating ? '#10B981' : '#94A3B8' }} />
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
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              <span>Reset Baseline</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
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
