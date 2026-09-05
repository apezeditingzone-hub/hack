import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingDown, 
  Activity, 
  Lock,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function RiskScoreCard() {
  const {
    currentRiskScore,
    limits,
    riskStatus,
    calculatedVaR,
    currentMaxDrawdown,
    currentLiquidity,
    marketMultiplier,
    activeShock,
  } = useRiskSafeguard();

  // Color mapping: Green = Safe, Yellow = Warning, Red = Critical
  const statusConfig = {
    safe: {
      label: 'SAFE',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      badgeBorder: 'rgba(16, 185, 129, 0.3)',
      color: '#10B981',
      icon: ShieldCheck,
      desc: 'All assets within institutional risk boundaries.',
    },
    warning: {
      label: 'WARNING',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      badgeBorder: 'rgba(245, 158, 11, 0.35)',
      color: '#F59E0B',
      icon: AlertTriangle,
      desc: 'Approaching risk ceiling. Prepare mitigation.',
    },
    critical: {
      label: 'CRITICAL ALERT',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.4)',
      color: '#EF4444',
      icon: ShieldAlert,
      desc: 'Risk limit breached. Immediate action required!',
    },
  }[riskStatus];

  const StatusIcon = statusConfig.icon;

  // Calculate percentage fill for gauge (0 - 100)
  const scorePercent = Math.min(100, Math.max(0, currentRiskScore));

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${riskStatus === 'critical' ? '#FCA5A5' : '#E2E8F0'}`,
        boxShadow: riskStatus === 'critical' 
          ? '0 10px 30px rgba(239, 68, 68, 0.15)' 
          : '0 4px 20px rgba(15, 23, 42, 0.04)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Top Title & Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Live Risk Sentinel
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
            Real-Time Risk Score
          </h2>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: statusConfig.badgeBg,
            border: `1px solid ${statusConfig.badgeBorder}`,
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            color: statusConfig.color,
            fontWeight: 800,
            fontSize: '0.82rem',
            letterSpacing: '0.04em',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: statusConfig.color,
              boxShadow: `0 0 8px ${statusConfig.color}`,
              animation: riskStatus === 'critical' ? 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
            }}
          />
          <StatusIcon size={16} />
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Main Metric Hero Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 1.2fr) minmax(220px, 2fr)',
          gap: '1.5rem',
          alignItems: 'center',
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          border: '1px solid #EEF2F6',
        }}
      >
        {/* Large Score Display */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontSize: '3.25rem',
                fontWeight: 900,
                color: statusConfig.color,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {currentRiskScore}
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#94A3B8' }}>
              / 100
            </span>
          </div>

          <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
            Threshold Limit: <strong style={{ color: '#0F172A' }}>{limits.criticalRiskScoreThreshold}</strong>
          </div>
        </div>

        {/* Dynamic Progress Bar Gauge */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', marginBottom: '6px' }}>
            <span style={{ color: '#10B981' }}>0 (Safe)</span>
            <span style={{ color: '#F59E0B' }}>50 (Warning)</span>
            <span style={{ color: '#EF4444' }}>{limits.criticalRiskScoreThreshold} (Critical)</span>
            <span>100</span>
          </div>

          <div
            style={{
              height: '14px',
              borderRadius: '9999px',
              background: '#E2E8F0',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${scorePercent}%`,
                height: '100%',
                borderRadius: '9999px',
                background: currentRiskScore >= limits.criticalRiskScoreThreshold
                  ? 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)'
                  : currentRiskScore >= limits.warningRiskScoreThreshold
                  ? 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)'
                  : '#10B981',
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease',
              }}
            />
          </div>

          <p style={{ margin: '8px 0 0 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
            {statusConfig.desc}
          </p>
        </div>
      </div>

      {/* Sub-Metric Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.85rem',
        }}
      >
        <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Max Drawdown Proj.
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: currentMaxDrawdown > limits.maxLossPercent ? '#EF4444' : '#0F172A', marginTop: '2px' }}>
            {currentMaxDrawdown}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Limit: {limits.maxLossPercent}%
          </div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            99% 1-Day VaR
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: calculatedVaR > limits.maxVaR99Percent ? '#EF4444' : '#0F172A', marginTop: '2px' }}>
            {calculatedVaR}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Limit: {limits.maxVaR99Percent}%
          </div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Liquid Reserves
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: currentLiquidity < limits.minLiquidityPercent ? '#EF4444' : '#10B981', marginTop: '2px' }}>
            {currentLiquidity}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Floor: {limits.minLiquidityPercent}%
          </div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
            Stress Multiplier
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: marketMultiplier > 1.0 ? '#EF4444' : '#0F172A', marginTop: '2px' }}>
            {marketMultiplier.toFixed(2)}x
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            {activeShock ? 'Shock Active' : 'Normal Market'}
          </div>
        </div>
      </div>
    </div>
  );
}
