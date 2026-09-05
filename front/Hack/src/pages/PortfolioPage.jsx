import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  ArrowUpRight, 
  RefreshCw, 
  Filter, 
  Layers,
  Sparkles,
  ArrowDownRight
} from 'lucide-react';
import { useRiskSafeguard } from '../context/RiskSafeguardContext';

export default function PortfolioPage() {
  const navigate = useNavigate();
  const { assets, totalAUM, currentLiquidity, executeFlightToSafety, executeConcentrationTrim } = useRiskSafeguard();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Sovereign Cash', 'Money Market', 'Fixed Income', 'Alternative Yield', 'High Beta Alpha'];

  const filteredAssets = selectedCategory === 'all'
    ? assets
    : assets.filter(a => a.category === selectedCategory);

  const formatCurrency = (val) => `$${(val / 1000000).toFixed(2)}M`;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        
        {/* Header Title & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 91, 55, 0.1)', color: '#FF5B37', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <Briefcase size={13} />
              <span>Multi-Asset Custody</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Treasury Portfolio Management
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Real-time asset distribution, institutional yield optimization, and liquidity containment.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/purchase-stocks')}
              style={{
                background: 'linear-gradient(135deg, #FF5B37 0%, #E04826 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.65rem 1.35rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(255, 91, 55, 0.25)',
              }}
            >
              <DollarSign size={16} />
              <span>Purchase Assets / Trade</span>
            </button>

            <button
              onClick={() => navigate('/safeguards')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ShieldCheck size={16} color="#10B981" />
              <span>Risk Controls</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>TOTAL PORTFOLIO AUM</span>
              <DollarSign size={18} color="#3B82F6" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginTop: '6px' }}>
              {formatCurrency(totalAUM)}
            </div>
            <div style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={14} />
              <span>+$5.42M (+3.9%) this month</span>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>WEIGHTED BLENDED YIELD</span>
              <TrendingUp size={18} color="#10B981" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10B981', marginTop: '6px' }}>
              6.48% APY
            </div>
            <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>
              +$9.25M estimated annual yield
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>INSTANT LIQUIDITY</span>
              <ShieldCheck size={18} color="#6366F1" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginTop: '6px' }}>
              {currentLiquidity}%
            </div>
            <div style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 700, marginTop: '4px' }}>
              100% Tier-1 Sovereign Backed
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
              <span>ACTIVE ASSET POSITIONS</span>
              <Layers size={18} color="#FF5B37" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginTop: '6px' }}>
              {assets.length} Classes
            </div>
            <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>
              Daily automated smart rebalance
            </div>
          </div>

        </div>

        {/* Middle Section: Chart & Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          {/* Allocation Donut */}
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0' }}>
              Asset Allocation Composition
            </h2>
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assets}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="amount"
                  >
                    {assets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [formatCurrency(val), 'Allocation']}
                    contentStyle={{ background: '#0F172A', borderRadius: '10px', color: '#FFFFFF', fontSize: '0.8rem' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yield Rates by Asset */}
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0' }}>
              Yield Performance Comparison (APY %)
            </h2>
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assets} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis unit="%" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <Tooltip
                    formatter={(val) => [`${val}% APY`, 'Yield Rate']}
                    contentStyle={{ background: '#0F172A', borderRadius: '10px', color: '#FFFFFF', fontSize: '0.8rem' }}
                  />
                  <Bar dataKey="yieldRate" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Detailed Holdings Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Holdings & Asset Inventory
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                Audited custody positions across sovereign and yield instruments
              </p>
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? '#0F172A' : '#F1F5F9',
                    color: selectedCategory === cat ? '#FFFFFF' : '#64748B',
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {cat === 'all' ? 'All Classes' : cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Asset Name</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Allocation Value</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Portfolio Weight</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Yield (APY)</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Risk Tier</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset, idx) => (
                  <tr key={asset.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF' }}>
                    <td style={{ padding: '1rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '3px', background: asset.color }} />
                      {asset.name}
                    </td>
                    <td style={{ padding: '1rem', color: '#64748B', fontWeight: 600 }}>
                      {asset.category}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: '#0F172A' }}>
                      {formatCurrency(asset.amount)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, width: '42px' }}>{asset.percentage.toFixed(1)}%</span>
                        <div style={{ flex: 1, height: '6px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden', minWidth: '60px' }}>
                          <div style={{ width: `${asset.percentage * 2}%`, height: '100%', background: asset.color }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#10B981', fontWeight: 800 }}>
                      +{asset.yieldRate}%
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          background: asset.isSafe ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: asset.isSafe ? '#059669' : '#D97706',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                        }}
                      >
                        {asset.isSafe ? 'Tier-1 Safe' : 'Growth Risk'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => navigate('/purchase-stocks')}
                        style={{
                          background: '#F1F5F9',
                          border: '1px solid #CBD5E1',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          cursor: 'pointer',
                        }}
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
}
