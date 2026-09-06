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
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight,
  ChevronRight,
  Layers,
  Cpu,
  BarChart3,
  SlidersHorizontal,
  Search,
  Globe,
  X
} from 'lucide-react';

const SCENARIOS = {
  balanced: {
    id: 'balanced',
    name: 'AI Dynamic Balanced',
    tag: 'Recommended',
    totalCapital: '₹50,00,00,000',
    expectedReturn: '12.45%',
    riskScore: 22,
    riskLabel: 'Optimal Low-Moderate',
    riskColor: '#10B981',
    sharpeRatio: '2.86',
    var99: '1.14%',
    allocations: [
      { name: 'RBI 91D T-Bills', value: 30, color: '#09132E', amount: '₹15.00 Cr', yield: '6.74%' },
      { name: 'AAA PSU & Corp Debt', value: 28, color: '#2563EB', amount: '₹14.00 Cr', yield: '7.65%' },
      { name: 'NIFTY 50 Bluechips', value: 20, color: '#FF5B37', amount: '₹10.00 Cr', yield: '16.50%' },
      { name: 'Indian Direct Credit', value: 14, color: '#8B5CF6', amount: '₹7.00 Cr', yield: '11.20%' },
      { name: 'Sovereign Gold & Hedges', value: 8, color: '#10B981', amount: '₹4.00 Cr', yield: '6.80%' },
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
      'Automated sweep: Reallocated ₹1.80 Cr from overnight repo to 91-day RBI T-Bill (+48 bps)',
      'Hedging trigger active: Delta hedge re-indexed on NIFTY 50 index options',
      'Liquidity verified: ₹24.50 Cr T+0 available for immediate operational settlement'
    ]
  },
  conservative: {
    id: 'conservative',
    name: 'Capital Fortress',
    tag: 'Max Preservation',
    totalCapital: '₹50,00,00,000',
    expectedReturn: '7.80%',
    riskScore: 9,
    riskLabel: 'Ultra Low Risk',
    riskColor: '#00D4FF',
    sharpeRatio: '3.45',
    var99: '0.42%',
    allocations: [
      { name: 'RBI 91D T-Bills', value: 55, color: '#09132E', amount: '₹27.50 Cr', yield: '6.74%' },
      { name: 'GoI 10-Yr G-Sec', value: 30, color: '#2563EB', amount: '₹15.00 Cr', yield: '6.86%' },
      { name: 'Overnight Repos', value: 10, color: '#FF5B37', amount: '₹5.00 Cr', yield: '6.50%' },
      { name: 'AAA Commercial Paper', value: 5, color: '#10B981', amount: '₹2.50 Cr', yield: '7.10%' },
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
      'Fortress mode: 100% investment grade Indian government and sovereign debt',
      'Zero drawdown exposure past 0.5% max tolerance',
      'Daily liquidity coverage ratio: 480% above RBI regulatory baseline'
    ]
  },
  growth: {
    id: 'growth',
    name: 'Yield Maximizer',
    tag: 'Aggressive Alpha',
    totalCapital: '₹50,00,00,000',
    expectedReturn: '17.20%',
    riskScore: 38,
    riskLabel: 'Moderate Growth',
    riskColor: '#F59E0B',
    sharpeRatio: '2.40',
    var99: '2.65%',
    allocations: [
      { name: 'NIFTY & Midcap Equities', value: 35, color: '#FF5B37', amount: '₹17.50 Cr', yield: '19.4%' },
      { name: 'Direct Corporate Credit', value: 25, color: '#8B5CF6', amount: '₹12.50 Cr', yield: '12.8%' },
      { name: 'High Yield PSU Bonds', value: 20, color: '#2563EB', amount: '₹10.00 Cr', yield: '9.4%' },
      { name: 'RBI Liquid Reserves', value: 12, color: '#09132E', amount: '₹6.00 Cr', yield: '6.7%' },
      { name: 'NSE Derivatives Hedge', value: 8, color: '#10B981', amount: '₹4.00 Cr', yield: '7.0%' },
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
      'Alpha engine: Expanded Indian private credit spread targeting +650 bps',
      'Dynamic stop-loss safeguards updated across 14 domestic trading pools',
      'Automated synthetic collar protective bounds active on NIFTY index'
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
    <section id="visualization" style={{ padding: '0', position: 'relative', width: '100%' }}>
      <div style={{ maxWidth: '1380px', margin: '0 auto', width: '100%' }}>
        {/* Main Flux Ethereal Frosted Canvas */}
        <div 
          className="glass-panel"
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            color: '#0F172A',
            backdropFilter: 'blur(32px) saturate(190%)',
            WebkitBackdropFilter: 'blur(32px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            borderRadius: '26px',
            padding: '1.4rem 1.8rem',
            boxShadow: '0 16px 48px rgba(15, 23, 42, 0.05), 0 2px 12px rgba(15, 23, 42, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem',
            transition: 'all 0.3s ease'
          }}
        >
          
          {/* Top Flux Header & Greeting Bar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid rgba(226, 232, 240, 0.7)'
            }}
          >
            {/* Left: Greeting */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', margin: 0 }}>
                  Welcome Back, Treasury Head
                </h1>
                <span className="badge-live-emerald" style={{ padding: '3px 9px', fontSize: '0.72rem' }}>
                  <span className="pulse-dot"></span> 4 AGENTS ACTIVE (₹ INR)
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '3px 0 0 0' }}>
                Autonomous AI safeguards monitoring Indian capital layers, RBI Repo liquidity, and SEBI / Basel III compliance.
              </p>
            </div>

            {/* Right: Action Buttons and Scenario Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              {/* Action Buttons */}
              <button 
                onClick={handleSimulateRebalance}
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  color: '#334155',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <Cpu size={13} color="#64748B" />
                <span>+ New AI Agent</span>
              </button>

              <button 
                onClick={handleSimulateRebalance}
                disabled={isRebalancing}
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  color: '#334155',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={13} color="#F59E0B" className={isRebalancing ? 'animate-spin-slow' : ''} />
                <span>{isRebalancing ? 'Rebalancing...' : 'Restart'}</span>
              </button>

              {/* Scenario Toggle */}
              <div 
                style={{
                  display: 'flex',
                  background: 'rgba(255, 255, 255, 0.85)',
                  padding: '2px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(226, 232, 240, 0.9)'
                }}
              >
                {Object.values(SCENARIOS).map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenarioKey(sc.id)}
                    style={{
                      background: activeScenarioKey === sc.id ? '#0F172A' : 'transparent',
                      border: 'none',
                      color: activeScenarioKey === sc.id ? '#FFFFFF' : '#64748B',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {sc.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Yellow Gold "Launch Zone" Pill Button */}
              <button 
                onClick={handleSimulateRebalance}
                className="btn-flux-yellow"
                style={{ padding: '0.5rem 1.15rem', fontSize: '0.8rem' }}
              >
                <Sparkles size={14} />
                <span>Launch Zone</span>
              </button>
            </div>
          </div>

          {/* Rebalance Toast */}
          {rebalanceCompleted && (
            <div 
              style={{
                padding: '0.6rem 1.1rem',
                background: 'rgba(236, 253, 245, 0.9)',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#065F46',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span><strong>AI Dynamic Sweep Completed:</strong> Allocation optimized across 5 Indian asset tiers (+18 bps).</span>
              </div>
              <span className="mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669' }}>LATENCY: 182ms</span>
            </div>
          )}

          {/* Top Row: Left "Getting Started" + Right "Compliance Pulse" */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '1rem',
              alignItems: 'stretch'
            }}
            className="flux-top-grid"
          >
            {/* Left: Getting Started Checklist Card */}
            <div 
              className="clean-card"
              style={{
                padding: '1.2rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.9rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Getting Started</h3>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06B6D4' }}>70%</span>
                </div>
                <p style={{ fontSize: '0.76rem', color: '#64748B', margin: '0 0 0.75rem 0' }}>
                  The quickest path to deploy AI capital sweep & Indian portfolio compliance.
                </p>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '5px', background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.9rem' }}>
                  <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #06B6D4 0%, #3B82F6 100%)', borderRadius: '9999px' }}></div>
                </div>

                {/* Checklist items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 600 }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Create RBI & NSE liquidity workspace</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#1E293B', fontWeight: 600 }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Deploy NIFTY yield AI agent</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748B' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #CBD5E1' }}></div>
                    <span>Configure NSE/BSE data connection</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748B' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #CBD5E1' }}></div>
                    <span>Set dynamic G-Sec yield stop-loss</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Compliance Pulse Card with Exact Arc Gauge */}
            <div 
              className="clean-card"
              style={{
                padding: '1.2rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Compliance pulse</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Details <ChevronRight size={12} />
                </span>
              </div>

              {/* Arc Gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', margin: '0.2rem 0' }}>
                <div style={{ position: 'relative', width: '170px', height: '95px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
                  <svg width="170" height="170" viewBox="0 0 170 170" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="fluxArcYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                      <linearGradient id="fluxArcCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                      <linearGradient id="fluxArcGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                      <linearGradient id="fluxArcSlate" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1E293B" />
                      </linearGradient>
                    </defs>

                    {/* Semicircle Track */}
                    <circle
                      cx="85"
                      cy="85"
                      r="65"
                      fill="transparent"
                      stroke="url(#fluxArcYellow)"
                      strokeWidth="11"
                      strokeDasharray="46 360"
                      strokeDashoffset="204.2"
                      style={{ transformOrigin: '85px 85px', transform: 'rotate(180deg)' }}
                    />
                    <circle
                      cx="85"
                      cy="85"
                      r="65"
                      fill="transparent"
                      stroke="url(#fluxArcCyan)"
                      strokeWidth="11"
                      strokeDasharray="50 360"
                      strokeDashoffset="153"
                      style={{ transformOrigin: '85px 85px', transform: 'rotate(180deg)' }}
                    />
                    <circle
                      cx="85"
                      cy="85"
                      r="65"
                      fill="transparent"
                      stroke="url(#fluxArcGreen)"
                      strokeWidth="11"
                      strokeDasharray="48 360"
                      strokeDashoffset="98"
                      style={{ transformOrigin: '85px 85px', transform: 'rotate(180deg)' }}
                    />
                    <circle
                      cx="85"
                      cy="85"
                      r="65"
                      fill="transparent"
                      stroke="url(#fluxArcSlate)"
                      strokeWidth="11"
                      strokeDasharray="44 360"
                      strokeDashoffset="45"
                      style={{ transformOrigin: '85px 85px', transform: 'rotate(180deg)' }}
                    />
                  </svg>

                  {/* Centered Metric in Arc */}
                  <div style={{ position: 'absolute', bottom: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Policy Coverage
                    </span>
                    <span style={{ fontSize: '1.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                      94%
                    </span>
                  </div>
                </div>
              </div>

              {/* Compliance Sub-rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.32rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.73rem' }}>
                  <span style={{ color: '#64748B' }}>SEBI / Basel Privacy (VaR &lt; 1%)</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.73rem' }}>
                  <span style={{ color: '#64748B' }}>Adaptive Yield Split (SOC-2)</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.73rem' }}>
                  <span style={{ color: '#64748B' }}>RBI Statutory Liquidity Ratio (SLR)</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>OK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: 4 Metric Cards with Mini Sparkline Visuals */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.9rem'
            }}
            className="flux-metrics-grid"
          >
            {/* 1. Volume / Capital */}
            <div className="clean-card" style={{ padding: '0.85rem 1.1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Capital (₹)</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0.15rem 0' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>₹50 Cr</span>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>+12%</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Compare from last 24hrs</div>
              {/* Mini Sparkline Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '26px' }}>
                {[30, 45, 60, 40, 75, 50, 90, 65, 80, 55, 95, 70, 85].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 10 ? '#06B6D4' : '#E2E8F0', borderRadius: '2px' }}></div>
                ))}
              </div>
            </div>

            {/* 2. Cost / Net Yield */}
            <div className="clean-card" style={{ padding: '0.85rem 1.1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Net Daily Yield</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0.15rem 0' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>₹1.68 L</span>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>+14.2%</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Compare from last 24hrs</div>
              {/* Mini Wave Sparkline */}
              <div style={{ height: '26px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentScenario.trends} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fluxGreenWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="optimized" stroke="#10B981" strokeWidth={2} fill="url(#fluxGreenWave)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3. Success Rate */}
            <div className="clean-card" style={{ padding: '0.85rem 1.1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Execution Rate</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0.15rem 0' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>99.4%</span>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>+1.8%</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Compare from last month</div>
              {/* Mini Sparkline Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '26px' }}>
                {[50, 65, 80, 60, 95, 75, 85, 90, 70, 100, 80, 90, 95].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 9 ? '#F59E0B' : '#E2E8F0', borderRadius: '2px' }}></div>
                ))}
              </div>
            </div>

            {/* 4. P95 Latency / Liquidity */}
            <div className="clean-card" style={{ padding: '0.85rem 1.1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>NSE P95 Latency</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0.15rem 0' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>18ms</span>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>Optimal</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '0.4rem' }}>Direct DMA Connection</div>
              {/* Mini Sparkline Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '26px' }}>
                {[40, 55, 70, 50, 65, 80, 60, 75, 85, 60, 70, 80, 65].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 7 ? '#FF5B37' : '#E2E8F0', borderRadius: '2px' }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Left 30-day Forecast & Segmented Bar + Right Live Data Stream Table */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.35fr',
              gap: '1rem',
              alignItems: 'stretch'
            }}
            className="flux-bottom-grid"
          >
            {/* Left: 30-day Cost / Allocation Forecast */}
            <div 
              className="clean-card"
              style={{
                padding: '1.2rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>30-day Yield Forecast (₹)</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', margin: '0.15rem 0' }}>
                  ₹5.18 Cr
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '1rem' }}>
                  +12.5% Projected yield surge for next 30 days
                </div>

                {/* Percentage Segment Headers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  <span>60%</span>
                  <span>30%</span>
                  <span>10%</span>
                </div>

                {/* Multi-Segment Color Bars */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '0.75rem' }}>
                  {/* Segment 1: Cyan Bars */}
                  <div style={{ flex: 6, display: 'flex', gap: '3px' }}>
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: '14px', background: '#06B6D4', borderRadius: '2px' }}></div>
                    ))}
                  </div>
                  {/* Segment 2: Amber Bars */}
                  <div style={{ flex: 3, display: 'flex', gap: '3px' }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: '14px', background: '#F59E0B', borderRadius: '2px' }}></div>
                    ))}
                  </div>
                  {/* Segment 3: Emerald Bars */}
                  <div style={{ flex: 1, display: 'flex', gap: '3px' }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: '14px', background: '#10B981', borderRadius: '2px' }}></div>
                    ))}
                  </div>
                </div>

                {/* Legend Pill */}
                <div style={{ display: 'flex', gap: '14px', fontSize: '0.72rem', color: '#64748B' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06B6D4' }}></span> RBI T-Bills</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }}></span> AAA Corp Paper</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></span> NIFTY Alpha</span>
                </div>
              </div>

              {/* Bottom Search Bar / Badge */}
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: '10px',
                  padding: '0.45rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.74rem'
                }}
              >
                <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🔍 Compliance search
                </span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  87% <span style={{ color: '#94A3B8', fontWeight: 500 }}>(10 Indian Risk Assets)</span>
                </span>
              </div>
            </div>

            {/* Right: Live Data Streams Table */}
            <div 
              className="clean-card"
              style={{
                padding: '1.2rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Live Indian Data Streams</h3>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>AUTO NSE / RBI</span>
              </div>

              {/* Table header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, borderBottom: '1px solid #F1F5F9', paddingBottom: '0.4rem' }}>
                <span style={{ width: '35%' }}>Channel / Stream</span>
                <span style={{ width: '22%' }}>Time</span>
                <span style={{ width: '20%' }}>Latency</span>
                <span style={{ width: '18%', textAlign: 'right' }}>Status</span>
              </div>

              {/* Table Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {[
                  { name: 'NSE Equity Feed', time: 'Just now', latency: '4ms', status: 'Live', statusColor: '#10B981', statusBg: 'rgba(16, 185, 129, 0.1)' },
                  { name: 'RBI Repo Clearing', time: '2 min ago', latency: '12ms', status: 'Active', statusColor: '#06B6D4', statusBg: 'rgba(6, 182, 212, 0.1)' },
                  { name: 'BSE Order Router', time: '4 min ago', latency: '8ms', status: 'Live', statusColor: '#10B981', statusBg: 'rgba(16, 185, 129, 0.1)' },
                  { name: 'G-Sec Yield Stream', time: '8 min ago', latency: '15ms', status: 'Live', statusColor: '#10B981', statusBg: 'rgba(16, 185, 129, 0.1)' },
                ].map((row, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.76rem',
                      padding: '0.35rem 0',
                      borderBottom: idx < 3 ? '1px solid #F8FAFC' : 'none'
                    }}
                  >
                    <span style={{ width: '35%', fontWeight: 700, color: '#0F172A' }}>{row.name}</span>
                    <span style={{ width: '22%', color: '#64748B' }}>{row.time}</span>
                    <span style={{ width: '20%', color: '#64748B', fontFamily: 'var(--font-mono)' }}>{row.latency}</span>
                    <span style={{ width: '18%', textAlign: 'right' }}>
                      <span 
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          color: row.statusColor,
                          background: row.statusBg
                        }}
                      >
                        {row.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .flux-top-grid, .flux-bottom-grid {
            grid-template-columns: 1fr !important;
          }
          .flux-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .flux-metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
