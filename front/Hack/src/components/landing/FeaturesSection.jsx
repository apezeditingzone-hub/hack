import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Layers
} from 'lucide-react';

export default function FeaturesSection({ onOpenDemo }) {
  const features = [
    {
      id: 'ai-optimization',
      icon: Cpu,
      badge: 'Autonomous Intelligence',
      title: 'AI Capital Optimization',
      color: '#FF5B37',
      description: 'Harness machine-learning algorithms that continuously evaluate global yield curves, liquidity profiles, and money market instruments to auto-allocate corporate treasury funds with maximum capital efficiency.',
      bulletPoints: [
        'Dynamic yield curve & duration arbitrage with 0 manual intervention',
        'Predictive cashflow matching that prevents idle capital drag',
        'Automated sweeps between operational cash, T-bills, and high-yield notes',
        'Multi-currency treasury optimization across USD, EUR, GBP, & JPY'
      ],
      statLabel: 'Average Yield Uplift',
      statValue: '+265 bps',
      statSub: 'Over standard commercial bank deposits'
    },
    {
      id: 'risk-control',
      icon: ShieldCheck,
      badge: 'Institutional Risk Engine',
      title: 'Automated Risk Control',
      color: '#09132E',
      description: 'Enforce non-negotiable risk limits, investment mandates, and counterparty exposure bounds through programmatic smart guardrails and real-time algorithmic hedging.',
      bulletPoints: [
        'Real-time Value-at-Risk (VaR 99.9%) continuous telemetry calculation',
        'Automated downside circuit breakers and synthetic derivative hedges',
        'Counterparty concentration limits and sovereign credit risk filtering',
        'Automated multi-tier approval workflows with cryptographic audit trails'
      ],
      statLabel: 'Mandate Compliance',
      statValue: '100.0%',
      statSub: 'Zero unauthorized risk tolerance deviations'
    },
    {
      id: 'portfolio-analysis',
      icon: Activity,
      badge: 'Real-Time Telemetry',
      title: 'Real-Time Portfolio Analysis',
      color: '#2563EB',
      description: 'Gain unified visibility across all global bank accounts, custodian vaults, money market funds, and debt holdings with sub-second telemetry and instant macroeconomic stress simulation.',
      bulletPoints: [
        'Aggregated institutional dashboard with sub-second data synchronization',
        'One-click macroeconomic shock testing (Fed rate cuts/hikes, FX devaluations)',
        'Cash drag heatmaps & liquidity runway forecasting up to 36 months',
        'Automated audit-ready PDF/Excel reporting for Board & regulators'
      ],
      statLabel: 'Analytics Latency',
      statValue: '< 50ms',
      statSub: 'Sub-second real-time balance consolidation'
    }
  ];

  return (
    <section id="features" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <span className="badge-coral-subtle">
              <Layers size={13} /> Enterprise Pillars
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.3vw, 2.7rem)', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: '#09101D' }}>
            Engineered for Autonomous <span className="gradient-text-coral">Corporate Treasury</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem' }}>
            Three deeply integrated enterprise engines designed to transform idle corporate balances into high-yield, risk-protected operational powerhouses.
          </p>
        </div>

        {/* 3 Main Feature Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={feat.id}
                className="clean-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '22px',
                  background: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Icon & Badge Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div 
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: feat.color === '#FF5B37' ? 'rgba(255, 91, 55, 0.1)' : feat.color === '#09132E' ? 'rgba(9, 19, 46, 0.08)' : 'rgba(37, 99, 235, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: feat.color
                      }}
                    >
                      <IconComponent size={24} strokeWidth={2.2} />
                    </div>

                    <span 
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: feat.color,
                        background: '#F8FAFD',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        border: '1px solid #E8EDF5'
                      }}
                    >
                      Pillar 0{index + 1}
                    </span>
                  </div>

                  {/* Feature Title */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09101D', marginBottom: '0.65rem' }}>
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                    {feat.description}
                  </p>

                  {/* Feature Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                    {feat.bulletPoints.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle2 size={16} color={feat.color === '#09132E' ? '#10B981' : feat.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action */}
                <div 
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #E8EDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                      {feat.statLabel}
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: feat.color }}>
                      {feat.statValue}
                    </div>
                  </div>

                  <button
                    onClick={onOpenDemo}
                    style={{
                      background: '#F8FAFD',
                      border: '1px solid #E2E8F0',
                      color: '#09101D',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#09132E';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#F8FAFD';
                      e.currentTarget.style.color = '#09101D';
                    }}
                  >
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
