import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Sliders, 
  ArrowUpRight
} from 'lucide-react';

export default function RiskMatrixSection({ onOpenDemo }) {
  const [activeStressScenario, setActiveStressScenario] = useState('rateHike');

  const stressTests = {
    rateHike: {
      name: '+150 bps Fed Shock',
      impact: 'Yield Increased +1.4%',
      riskImpact: 'Zero Capital Loss',
      status: 'Shield Active',
      statusColor: '#10B981',
      desc: 'Autonomous short-duration duration shift protected underlying principal while capturing higher overnight repo yields.'
    },
    liquidityFreeze: {
      name: 'Credit Spread Blowout (+300 bps)',
      impact: '100% Liquidity Preserved',
      riskImpact: 'Max Drawdown: -0.12%',
      status: 'Hedges Triggered',
      statusColor: '#FF5B37',
      desc: 'Algorithmic synthetic put options executed at T+0ms, fully offsetting corporate debt price depreciation.'
    },
    fxShock: {
      name: 'USD / EUR 10% Flash Devaluation',
      impact: 'FX Delta Neutralized',
      riskImpact: 'Net Return: +0.05%',
      status: 'Cross-Currency Swaps OK',
      statusColor: '#2563EB',
      desc: 'Automatic currency forward contracts neutralized cross-border exposure across European subsidiaries.'
    }
  };

  return (
    <section id="risk-engine" style={{ padding: '4.5rem 0', background: '#F8FAFD', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(320px, 1.3fr)', gap: '3rem', alignItems: 'center' }} className="risk-grid">
          
          {/* Left Column: Risk Control Engine Description */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <span className="badge-clean">
                <ShieldCheck size={14} color="#10B981" /> Institutional Safeguards
              </span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.2, color: '#09101D' }}>
              Dynamic Risk Boundaries. <br />
              <span className="gradient-text-coral">Zero Blind Spots.</span>
            </h2>

            <p style={{ color: '#64748B', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '2rem' }}>
              Unlike static treasury spreadsheets, CapitalX continuously models multi-asset correlations, counterparty default probabilities, and macroeconomic stress factors to keep your enterprise capital strictly inside your risk budget.
            </p>

            {/* Risk Pillars List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ padding: '9px', borderRadius: '10px', background: '#FFFFFF', color: '#FF5B37', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <Sliders size={18} />
                </div>
                <div>
                  <h4 style={{ color: '#09101D', fontSize: '0.98rem', fontWeight: 700, marginBottom: '2px' }}>Automated Policy Enforcement</h4>
                  <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Hardcoded investment policy statements (IPS) prevent non-compliant trades automatically.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ padding: '9px', borderRadius: '10px', background: '#FFFFFF', color: '#10B981', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <Lock size={18} />
                </div>
                <div>
                  <h4 style={{ color: '#09101D', fontSize: '0.98rem', fontWeight: 700, marginBottom: '2px' }}>Multi-Sig & Role Separation</h4>
                  <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Treasury team approvals, CFO overrides, and dual-custody settlement verification.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ padding: '9px', borderRadius: '10px', background: '#FFFFFF', color: '#2563EB', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <Server size={18} />
                </div>
                <div>
                  <h4 style={{ color: '#09101D', fontSize: '0.98rem', fontWeight: 700, marginBottom: '2px' }}>SOC-2 Type II & Basel III Compliant</h4>
                  <p style={{ color: '#64748B', fontSize: '0.85rem' }}>End-to-end cryptographic audit trails and real-time regulatory liquidity ratios.</p>
                </div>
              </div>
            </div>

            <button onClick={onOpenDemo} className="btn-secondary" style={{ padding: '0.75rem 1.6rem' }}>
              <span>Simulate Risk Parameters</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Right Column: Clean White Sandbox Card */}
          <div 
            className="clean-card"
            style={{
              padding: '2rem',
              background: '#FFFFFF',
              borderRadius: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E8EDF5' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Risk Sandbox
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#09101D', marginTop: '2px' }}>
                  Macroeconomic Stress Engine
                </h3>
              </div>
              <span className="badge-clean" style={{ fontSize: '0.72rem' }}>100k Monte Carlo</span>
            </div>

            {/* Stress Test Scenario Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {Object.entries(stressTests).map(([key, item]) => {
                const isSelected = activeStressScenario === key;
                return (
                  <div
                    key={key}
                    onClick={() => setActiveStressScenario(key)}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      background: isSelected ? '#F8FAFD' : '#FFFFFF',
                      border: isSelected ? '1.5px solid #09132E' : '1px solid #E8EDF5',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#09101D', fontSize: '0.92rem' }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: item.statusColor, background: `${item.statusColor}15`, padding: '2px 8px', borderRadius: '9999px' }}>
                        {item.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#64748B', marginBottom: '4px' }}>
                      <span>Impact: <strong style={{ color: '#09101D' }}>{item.impact}</strong></span>
                      <span>Risk: <strong style={{ color: item.statusColor }}>{item.riskImpact}</strong></span>
                    </div>

                    {isSelected && (
                      <p style={{ fontSize: '0.78rem', color: '#475569', borderTop: '1px solid #E8EDF5', paddingTop: '6px', marginTop: '6px' }}>
                        🛡️ {item.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Security Badges Ribbon */}
            <div 
              style={{
                background: '#F8FAFD',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid #E8EDF5',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                textAlign: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#09101D' }}>SOC-2 Type II</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Certified Vault</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF5B37' }}>256-bit AES</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Quantum-Ready</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB' }}>Multi-Custodian</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>BNY / JPM / State St.</div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .risk-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
