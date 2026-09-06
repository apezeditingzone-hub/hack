import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  Droplet, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { useRiskSafeguard } from '../../context/RiskSafeguardContext';

export default function RiskDashboardCharts() {
  const {
    riskHistory,
    limits,
    assets,
    totalAUM,
    currentLiquidity,
    currentRiskScore,
  } = useRiskSafeguard();

  // Pie chart data
  const pieData = assets.map((a) => ({
    name: a.name,
    value: a.amount,
    percentage: a.percentage,
    color: a.color,
    isSafe: a.isSafe,
  }));

  // Risk Vectors Data
  const riskVectors = [
    { category: 'Liquidity', current: Math.min(100, Math.round((100 - currentLiquidity) * 1.1)), threshold: 100 - limits.minLiquidityPercent },
    { category: 'Concentration', current: Math.min(100, Math.round(Math.max(...assets.map(a => a.percentage)) * 1.5)), threshold: limits.maxSingleAssetExposure },
    { category: 'Market Vol.', current: Math.min(100, Math.round(currentRiskScore * 1.05)), threshold: limits.criticalRiskScoreThreshold },
    { category: 'Credit Duration', current: Math.min(100, Math.round((currentRiskScore * 0.85) + 12)), threshold: 65 },
    { category: 'Counterparty', current: Math.min(100, Math.round((currentRiskScore * 0.6) + 8)), threshold: 60 },
  ];

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${Number(val).toLocaleString('en-IN')}`;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.5rem' }}>
      
      {/* Chart 1: Real-Time Risk Score vs Risk Limit Trend */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255, 91, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} color="#FF5B37" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Live Risk Trajectory vs. Policy Limit
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Streaming telemetry (Red dashed line = Critical Threshold)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FF5B37' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5B37' }}></span>
              Live Risk Score
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444' }}>
              <span style={{ width: 12, height: 2, background: '#EF4444' }}></span>
              Limit ({limits.criticalRiskScoreThreshold})
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5B37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF5B37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Tooltip
                contentStyle={{ background: '#0F172A', borderRadius: '10px', border: 'none', color: '#FFFFFF', fontSize: '0.8rem' }}
                formatter={(val) => [`${val} / 100`, 'Risk Score']}
              />
              <ReferenceLine y={limits.criticalRiskScoreThreshold} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={2} label={{ value: 'CRITICAL LIMIT', fill: '#EF4444', fontSize: 10, position: 'top' }} />
              <ReferenceLine y={limits.warningRiskScoreThreshold} stroke="#F59E0B" strokeDasharray="3 3" strokeWidth={1.5} label={{ value: 'WARNING', fill: '#F59E0B', fontSize: 10, position: 'top' }} />
              <Area type="monotone" dataKey="riskScore" stroke="#FF5B37" strokeWidth={3} fillOpacity={1} fill="url(#riskGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Asset Allocation Breakdown & Limits */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PieIcon size={18} color="#3B82F6" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Asset Allocation & Concentration Ceilings
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Total Portfolio AUM: <strong style={{ color: '#0F172A' }}>{formatCurrency(totalAUM)}</strong> (Max Limit: {limits.maxSingleAssetExposure}%)
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Donut */}
          <div style={{ width: '170px', height: '180px', flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${formatCurrency(val)} (${((val / totalAUM) * 100).toFixed(1)}%)`, name]}
                  contentStyle={{ background: '#0F172A', borderRadius: '10px', border: 'none', color: '#FFFFFF', fontSize: '0.75rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Asset List & Exposure Meters */}
          <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {assets.map((asset) => {
              const isOver = asset.percentage > limits.maxSingleAssetExposure;
              return (
                <div key={asset.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0F172A' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '2px', background: asset.color }} />
                      {asset.name}
                    </span>
                    <span style={{ color: isOver ? '#EF4444' : '#64748B', fontWeight: isOver ? 800 : 600 }}>
                      {asset.percentage.toFixed(1)}% {isOver && '⚠️ EXCEEDS'}
                    </span>
                  </div>
                  <div style={{ height: '5px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, asset.percentage * 2)}%`, height: '100%', background: isOver ? '#EF4444' : asset.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart 3: Liquidity vs Minimum Floor */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplet size={18} color="#10B981" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Instant Liquidity Buffer Health
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Instant settlement capacity vs. Minimum Required Floor ({limits.minLiquidityPercent}%)
              </p>
            </div>
          </div>

          <div
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: currentLiquidity < limits.minLiquidityPercent ? '#EF4444' : '#10B981',
              background: currentLiquidity < limits.minLiquidityPercent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              padding: '2px 10px',
              borderRadius: '9999px',
            }}
          >
            {currentLiquidity}% Liquidity
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
              <span>Liquidity Reserve Floor: {limits.minLiquidityPercent}%</span>
              <span>Available Runway: {(currentLiquidity * 1.8).toFixed(0)} Days</span>
            </div>
            <div style={{ height: '14px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
              {/* Floor marker */}
              <div style={{ position: 'absolute', left: `${limits.minLiquidityPercent}%`, top: 0, bottom: 0, width: '2px', background: '#DC2626', zIndex: 2 }} title="Required Floor" />
              <div
                style={{
                  width: `${Math.min(100, currentLiquidity)}%`,
                  height: '100%',
                  background: currentLiquidity < limits.minLiquidityPercent ? '#EF4444' : 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ color: '#64748B', fontSize: '0.72rem', fontWeight: 700 }}>SOVEREIGN CASH & T-BILLS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                {formatCurrency(assets.filter(a => a.isSafe).reduce((sum, a) => sum + a.amount, 0))}
              </div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ color: '#64748B', fontSize: '0.72rem', fontWeight: 700 }}>LIQUIDITY STATUS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: currentLiquidity < limits.minLiquidityPercent ? '#EF4444' : '#10B981', marginTop: '2px' }}>
                {currentLiquidity < limits.minLiquidityPercent ? 'DEFICIT ALERT' : 'OPTIMAL'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 4: Multi-Vector Risk Radar / Bar Comparison */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} color="#6366F1" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Institutional Risk Vectors Analysis
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                Multi-dimensional risk exposure vs. authorized tolerance boundaries
              </p>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '210px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskVectors} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }} />
              <Tooltip
                contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFFFFF', fontSize: '0.75rem' }}
                formatter={(val, name) => [`${val} / 100`, name === 'current' ? 'Current Risk Level' : 'Policy Ceiling']}
              />
              <Bar dataKey="current" fill="#FF5B37" radius={[0, 4, 4, 0]} barSize={12} name="Current Level" />
              <Bar dataKey="threshold" fill="#E2E8F0" radius={[0, 4, 4, 0]} barSize={12} name="Policy Limit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
