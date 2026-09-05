import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart,
  Bar,
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  RefreshCw, 
  DollarSign, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight,
  ChevronRight,
  Layers,
  Cpu,
  BarChart3,
  SlidersHorizontal
} from 'lucide-react';

const SCENARIOS = {
  balanced: {
    id: 'balanced',
    name: 'AI Dynamic Balanced',
    tag: 'Recommended',
    totalCapital: '$64,850,000',
    expectedReturn: '12.45%',
    riskScore: 22,
    riskLabel: 'Optimal Low-Moderate',
    riskColor: '#10B981',
    sharpeRatio: '2.86',
    var99: '1.14%',
    allocations: [
      { name: 'Sovereign T-Bills', value: 30, color: '#09132E', amount: '$19.45M', yield: '5.20%' },
      { name: 'AAA Corporate Debt', value: 28, color: '#2563EB', amount: '$18.15M', yield: '6.45%' },
      { name: 'Hedged Equities', value: 20, color: '#FF5B37', amount: '$12.97M', yield: '16.80%' },
      { name: 'Private Credit', value: 14, color: '#8B5CF6', amount: '$9.08M', yield: '10.50%' },
      { name: 'Macro Hedges', value: 8, color: '#10B981', amount: '$5.18M', yield: '4.80%' },
    ],
    trends: [
      { period: '9am', current: 62, target: 45, optimized: 75 },
      { period: '11am', current: 78, target: 50, optimized: 92 },
      { period: '1pm', current: 104, target: 65, optimized: 120 },
      { period: '3pm', current: 85, target: 55, optimized: 105 },
      { period: '5pm', current: 95, target: 60, optimized: 115 },
      { period: '7pm', current: 110, target: 70, optimized: 135 },
    ],
    logs: [
      'Automated sweep: Reallocated $1.8M from cash sweep to 90-day T-Bill (+48 bps)',
      'Hedging trigger active: Delta hedge re-indexed on S&P 500 options',
      'Liquidity verified: $24.5M T+0 available for operational disbursements'
    ]
  },
  conservative: {
    id: 'conservative',
    name: 'Capital Fortress',
    tag: 'Max Preservation',
    totalCapital: '$64,850,000',
    expectedReturn: '7.80%',
    riskScore: 9,
    riskLabel: 'Ultra Low Risk',
    riskColor: '#00D4FF',
    sharpeRatio: '3.45',
    var99: '0.42%',
    allocations: [
      { name: 'Sovereign T-Bills', value: 55, color: '#09132E', amount: '$35.67M', yield: '5.25%' },
      { name: 'AAA Corporate Debt', value: 30, color: '#2563EB', amount: '$19.45M', yield: '5.80%' },
      { name: 'Overnight Repos', value: 10, color: '#FF5B37', amount: '$6.48M', yield: '5.10%' },
      { name: 'Commercial Paper', value: 5, color: '#10B981', amount: '$3.24M', yield: '5.60%' },
    ],
    trends: [
      { period: '9am', current: 50, target: 40, optimized: 58 },
      { period: '11am', current: 60, target: 45, optimized: 68 },
      { period: '1pm', current: 75, target: 50, optimized: 82 },
      { period: '3pm', current: 70, target: 50, optimized: 78 },
      { period: '5pm', current: 80, target: 55, optimized: 88 },
      { period: '7pm', current: 85, target: 60, optimized: 94 },
    ],
    logs: [
      'Fortress mode: 100% investment grade government and sovereign debt',
      'Zero drawdown exposure past 0.5% max tolerance',
      'Daily liquidity coverage ratio: 480% above regulatory baseline'
    ]
  },
  growth: {
    id: 'growth',
    name: 'Yield Maximizer',
    tag: 'Aggressive Alpha',
    totalCapital: '$64,850,000',
    expectedReturn: '17.20%',
    riskScore: 38,
    riskLabel: 'Moderate Growth',
    riskColor: '#F59E0B',
    sharpeRatio: '2.40',
    var99: '2.65%',
    allocations: [
      { name: 'Quantitative Equities', value: 35, color: '#FF5B37', amount: '$22.70M', yield: '19.4%' },
      { name: 'Private Structured Debt', value: 25, color: '#8B5CF6', amount: '$16.21M', yield: '12.8%' },
      { name: 'High Yield Corporate', value: 20, color: '#2563EB', amount: '$12.97M', yield: '8.4%' },
      { name: 'Sovereign Liquidity', value: 12, color: '#09132E', amount: '$7.78M', yield: '5.2%' },
      { name: 'Tail Risk Hedges', value: 8, color: '#10B981', amount: '$5.19M', yield: '6.0%' },
    ],
    trends: [
      { period: '9am', current: 70, target: 50, optimized: 90 },
      { period: '11am', current: 95, target: 60, optimized: 125 },
      { period: '1pm', current: 130, target: 75, optimized: 160 },
      { period: '3pm', current: 110, target: 70, optimized: 145 },
      { period: '5pm', current: 125, target: 75, optimized: 155 },
      { period: '7pm', current: 145, target: 85, optimized: 180 },
    ],
    logs: [
      'Alpha engine: Expanded private credit spread targeting +650 bps',
      'Dynamic stop-loss safeguards updated across 14 trading sub-pools',
      'Automated synthetic collar protective bounds intact'
    ]
  }
};

export default function DashboardVisualizer({ onOpenDemo }) {
  const [activeScenarioKey, setActiveScenarioKey] = useState('balanced');
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalanceCompleted, setRebalanceCompleted] = useState(false);
  
  const currentScenario = SCENARIOS[activeScenarioKey];

  const handleSimulateRebalance = () => {
    setIsRebalancing(true);
    setRebalanceCompleted(false);
    setTimeout(() => {
      setIsRebalancing(false);
      setRebalanceCompleted(true);
      setTimeout(() => setRebalanceCompleted(false), 4000);
    }, 1200);
  };

  return (
    <section id="visualization" style={{ padding: '3rem 0 5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge-coral-subtle">
              <Sparkles size={13} /> Live Intelligence Deck
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.7rem)', letterSpacing: '-0.03em', marginBottom: '0.75rem', color: '#09101D' }}>
            Autonomous Capital Optimization <span className="gradient-text-coral">Dashboard</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.02rem' }}>
            A unified view of corporate liquidity, dynamic asset weights, automated risk limits, and real-time yield curves.
          </p>
        </div>

        {/* Dashboard Main Container Container styled like the reference app */}
        <div 
          style={{
            background: '#F8FAFD',
            border: '1px solid #E2E8F0',
            borderRadius: '26px',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.06)'
          }}
        >
          
          {/* Top Dashboard Header Bar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #E8EDF5',
              marginBottom: '1.75rem'
            }}
          >
            {/* Left: Entity & Mode */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: '#09132E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Cpu size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09101D' }}>Apex Global Treasury</span>
                  <span className="badge-live-emerald"><span className="pulse-dot"></span> LIVE SYSTEM</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '12px', marginTop: '2px' }}>
                  <span>Entity ID: <strong style={{ color: '#0F172A' }}>CTX-ENT-8841</strong></span>
                  <span>Currency: <strong style={{ color: '#0F172A' }}>USD ($)</strong></span>
                  <span>Compliance: <strong style={{ color: '#10B981' }}>SOC-2 / Basel III OK</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Strategy selector & AI Rebalance trigger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Scenario Toggle Pills */}
              <div 
                style={{
                  display: 'flex',
                  background: '#FFFFFF',
                  padding: '4px',
                  borderRadius: '9999px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                {Object.values(SCENARIOS).map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenarioKey(sc.id)}
                    style={{
                      background: activeScenarioKey === sc.id ? '#09132E' : 'transparent',
                      border: 'none',
                      color: activeScenarioKey === sc.id ? '#FFFFFF' : '#64748B',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>

              {/* Action Trigger Button (Coral Pill) */}
              <button
                onClick={handleSimulateRebalance}
                disabled={isRebalancing}
                className="btn-coral"
                style={{
                  padding: '0.6rem 1.3rem',
                  fontSize: '0.86rem'
                }}
              >
                <RefreshCw size={15} className={isRebalancing ? 'animate-spin-slow' : ''} />
                <span>{isRebalancing ? 'Optimizing...' : 'Run AI Rebalance +'}</span>
              </button>
            </div>
          </div>

          {/* Rebalance Toast if triggered */}
          {rebalanceCompleted && (
            <div 
              style={{
                marginBottom: '1.5rem',
                padding: '0.75rem 1.25rem',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#065F46',
                fontSize: '0.88rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span><strong>AI Optimization Completed:</strong> Successfully reallocated funds across 5 asset tiers. Net yield increased by <strong>+18 bps</strong>.</span>
              </div>
              <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669' }}>LATENCY: 182ms</span>
            </div>
          )}

          {/* 4 Core Financial Visualizer Metrics Cards */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            {/* 1. Total Capital */}
            <div className="clean-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Total Capital</span>
                <DollarSign size={18} color="#09132E" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#09101D', margin: '0.4rem 0 0.2rem 0' }}>
                {currentScenario.totalCapital}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#10B981', fontWeight: 600 }}>
                <ArrowUpRight size={16} />
                <span>+$4,920,000 (14.2% YTD)</span>
              </div>
            </div>

            {/* 2. Expected Return */}
            <div className="clean-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Expected Return</span>
                <TrendingUp size={18} color="#FF5B37" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FF5B37', margin: '0.4rem 0 0.2rem 0' }}>
                {currentScenario.expectedReturn}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                Sharpe: <strong style={{ color: '#09101D' }}>{currentScenario.sharpeRatio}</strong> | Alpha: +340 bps
              </div>
            </div>

            {/* 3. Risk Score */}
            <div className="clean-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Risk Score</span>
                <ShieldCheck size={18} color="#10B981" />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0.4rem 0 0.2rem 0' }}>
                <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#09101D' }}>
                  {currentScenario.riskScore}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '9999px', marginLeft: 'auto' }}>
                  {currentScenario.riskLabel}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                99% Daily VaR: <strong style={{ color: '#09101D' }}>{currentScenario.var99}</strong>
              </div>
            </div>

            {/* 4. Instant Liquidity */}
            <div className="clean-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Instant Liquidity</span>
                <Activity size={18} color="#2563EB" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#09101D', margin: '0.4rem 0 0.2rem 0' }}>
                98.4%
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                T+0 Settlement: <strong style={{ color: '#09101D' }}>$24.5M Liquid</strong>
              </div>
            </div>
          </div>

          {/* Main Content Layout: Deep Navy Feature Card on Left + Clean Trend & Allocations on Right (matching reference image style) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}
            className="dashboard-main-grid"
          >
            
            {/* Left: Deep Navy Visual Card (Identical aesthetic to the "Fitness Goals 80%" card in reference image) */}
            <div 
              className="navy-hero-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '380px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Capital Efficiency</span>
                  <button 
                    onClick={onOpenDemo}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94A3B8',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    Details <ChevronRight size={14} />
                  </button>
                </div>

                {/* Glowing Circular Wave Arc & Percentage Metric */}
                <div style={{ textAlign: 'center', margin: '1.5rem 0', position: 'relative' }}>
                  {/* Neon Cyan Ambient Wave SVG */}
                  <svg viewBox="0 0 200 120" style={{ width: '100%', height: '110px', overflow: 'visible' }}>
                    <path 
                      d="M 10,90 Q 60,10 100,50 T 190,40" 
                      fill="none" 
                      stroke="#00D4FF" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.7))' }}
                    />
                    <path 
                      d="M 10,100 Q 50,30 100,70 T 190,60" 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                  </svg>

                  <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginTop: '-10px' }}>
                    84%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500 }}>
                    Autonomous Yield Optimization Score
                  </div>
                </div>
              </div>

              {/* Bottom Card Pill matching the reference workout pill */}
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF' }}>Risk Compliance Active</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>4/4 Constraints Guarded</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }}></div>
              </div>
            </div>

            {/* Right: Clean White Multi-Tab Content (Trends & Allocation Breakdown) */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              {/* Top Trend Chart Card (like "Blood Glucose Trends" in reference image) */}
              <div 
                className="clean-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09101D' }}>
                      Yield & Liquidity Velocity Trends
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Real-time cash flow deployment vs baseline idle yields
                    </p>
                  </div>

                  {/* Legend matching reference today/yesterday dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5B37' }}></span>
                      <span style={{ color: '#0F172A', fontWeight: 600 }}>Optimized AI</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1' }}></span>
                      <span style={{ color: '#64748B', fontWeight: 500 }}>Static Baseline</span>
                    </div>
                  </div>
                </div>

                {/* Vertical Bar Chart matching the reference chart aesthetic */}
                <div style={{ height: '140px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentScenario.trends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <Tooltip content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="clean-recharts-tooltip">
                              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '2px' }}>Time: {label}</div>
                              <div style={{ color: '#FF5B37', fontSize: '0.8rem', fontWeight: 600 }}>AI Optimized: {payload[0]?.value} bps</div>
                              <div style={{ color: '#64748B', fontSize: '0.8rem' }}>Baseline: {payload[1]?.value} bps</div>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Bar dataKey="optimized" fill="#FF5B37" radius={[6, 6, 0, 0]} barSize={14} />
                      <Bar dataKey="current" fill="#CBD5E1" radius={[6, 6, 0, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Asset Allocation Table & Pills (like "Medication Schedule" in reference image) */}
              <div 
                className="clean-card"
                style={{
                  padding: '1.25rem 1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#09101D' }}>Asset Allocation Portfolio</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>5 Active Positions</span>
                  </div>
                  <span className="badge-clean" style={{ fontSize: '0.75rem' }}>Auto-Rebalancing Enabled</span>
                </div>

                {/* Clean Table list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentScenario.allocations.slice(0, 4).map((item, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        background: idx % 2 === 0 ? '#F8FAFD' : '#FFFFFF',
                        border: '1px solid #E8EDF5',
                        fontSize: '0.84rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '35%' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></span>
                        <span style={{ fontWeight: 700, color: '#0F172A' }}>{item.name}</span>
                      </div>
                      <div style={{ color: '#64748B', fontWeight: 500 }}>{item.amount}</div>
                      <div style={{ color: '#10B981', fontWeight: 700 }}>{item.yield} yield</div>
                      <div style={{ fontWeight: 800, color: '#09101D', width: '45px', textAlign: 'right' }}>{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
