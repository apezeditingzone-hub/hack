import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight, 
  BarChart2, 
  PieChart as PieIcon,
  Sparkles,
  Zap
} from 'lucide-react';
import { useRiskSafeguard } from '../context/RiskSafeguardContext';

const MONTE_CARLO_DATA = [
  { confidence: '99.9% Worst Case', returnPct: -2.8, varAmount: '-$4.0M' },
  { confidence: '99.0% VaR', returnPct: -1.9, varAmount: '-$2.7M' },
  { confidence: '95.0% Baseline Risk', returnPct: -0.8, varAmount: '-$1.1M' },
  { confidence: '50.0% Median Expected', returnPct: +6.4, varAmount: '+$9.1M' },
  { confidence: '90.0% Bull Case', returnPct: +11.2, varAmount: '+$16.0M' },
  { confidence: '99.0% Max Upside', returnPct: +15.8, varAmount: '+$22.5M' },
];

const YIELD_CURVE_DATA = [
  { term: '1M', current: 5.30, projectedCut: 4.80, hawkishSpike: 5.80 },
  { term: '3M', current: 5.25, projectedCut: 4.70, hawkishSpike: 5.75 },
  { term: '6M', current: 5.10, projectedCut: 4.50, hawkishSpike: 5.60 },
  { term: '1Y', current: 4.85, projectedCut: 4.20, hawkishSpike: 5.40 },
  { term: '2Y', current: 4.45, projectedCut: 3.90, hawkishSpike: 5.10 },
  { term: '5Y', current: 4.15, projectedCut: 3.75, hawkishSpike: 4.90 },
  { term: '10Y', current: 4.28, projectedCut: 3.85, hawkishSpike: 5.05 },
  { term: '30Y', current: 4.55, projectedCut: 4.10, hawkishSpike: 5.25 },
];

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { totalAUM, currentRiskScore, currentLiquidity } = useRiskSafeguard();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <BarChart2 size={13} />
              <span>Quantitative Risk & Predictive Intelligence</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Institutional Analytics & Modeling
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Multi-scenario Monte Carlo simulations, yield curve forecasts, and factor attribution.
            </p>
          </div>

          <button
            onClick={() => navigate('/safeguards')}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldCheck size={16} color="#10B981" />
            <span>Open Risk Controls</span>
          </button>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>PORTFOLIO SHARPE RATIO</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10B981', marginTop: '4px' }}>2.84</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>Top 5% Institutional Efficiency</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>SORTINO RATIO (DOWNSIDE)</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#3B82F6', marginTop: '4px' }}>3.42</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>Minimal Downside Volatility</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>PORTFOLIO BETA (vs S&P 500)</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>0.38</div>
            <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>62% Lower Volatility</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>ANNUALIZED ALPHA</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FF5B37', marginTop: '4px' }}>+4.82%</div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>Excess AI Yield Attribution</div>
          </div>

        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
          
          {/* Chart 1: Multi-Scenario Yield Curve Forecast */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  US Sovereign Yield Curve Scenario Forecast
                </h2>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                  Forward yield shift projections under 3 macro interest rate scenarios
                </p>
              </div>
            </div>

            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={YIELD_CURVE_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="term" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[3, 7]} unit="%" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <Tooltip
                    contentStyle={{ background: '#0F172A', borderRadius: '10px', color: '#FFFFFF', fontSize: '0.8rem' }}
                    formatter={(val) => [`${val}%`, 'Yield']}
                  />
                  <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={3} name="Current Curve" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="projectedCut" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" name="-50bps Rate Cut" />
                  <Line type="monotone" dataKey="hawkishSpike" stroke="#EF4444" strokeWidth={2} strokeDasharray="3 3" name="+50bps Hawkish Shock" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '10px', fontSize: '0.78rem', fontWeight: 700 }}>
              <span style={{ color: '#3B82F6' }}>● Current Curve</span>
              <span style={{ color: '#10B981' }}>- - Rate Cut Scenario</span>
              <span style={{ color: '#EF4444' }}>- - Hawkish Shock</span>
            </div>
          </div>

          {/* Chart 2: Monte Carlo Return Distribution */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Monte Carlo 10,000-Run Probability Distribution
                </h2>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                  Projected 1-year treasury return and downside value-at-risk distribution
                </p>
              </div>
            </div>

            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTE_CARLO_DATA} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis type="number" unit="%" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis dataKey="confidence" type="category" tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }} />
                  <Tooltip
                    contentStyle={{ background: '#0F172A', borderRadius: '10px', color: '#FFFFFF', fontSize: '0.8rem' }}
                    formatter={(val, name, item) => [`${val}% (${item.payload.varAmount})`, 'Estimated Return']}
                  />
                  <Bar dataKey="returnPct" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
