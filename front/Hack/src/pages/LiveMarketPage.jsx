import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  Search, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  Shield,
  Zap,
  Layers
} from 'lucide-react';

export const MARKET_ASSETS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 128.45, change: +3.82, volume: '48.2M', marketCap: '$3.15T', type: 'Equity / Tech' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 224.20, change: +1.15, volume: '32.1M', marketCap: '$3.42T', type: 'Equity / Tech' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 448.90, change: +0.94, volume: '18.4M', marketCap: '$3.34T', type: 'Equity / Tech' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 552.30, change: +0.72, volume: '62.0M', marketCap: '$580B', type: 'ETF / Index' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 480.15, change: +1.45, volume: '38.9M', marketCap: '$290B', type: 'ETF / Tech' },
  { symbol: 'US10Y', name: '10-Year US Treasury Yield', price: 4.28, change: -0.04, volume: '$120B', marketCap: 'Sovereign', type: 'Fixed Income' },
  { symbol: 'US03M', name: '3-Month US Treasury Bill', price: 5.25, change: +0.01, volume: '$240B', marketCap: 'Sovereign', type: 'Cash Reserve' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 186.50, change: -0.45, volume: '24.5M', marketCap: '$1.94T', type: 'Equity / Consumer' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 214.80, change: -2.30, volume: '54.2M', marketCap: '$685B', type: 'Equity / Auto' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 218.60, change: +1.08, volume: '12.3M', marketCap: '$620B', type: 'Financial / Banking' },
];

export default function LiveMarketPage() {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState(MARKET_ASSETS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated live ticker fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.48) * (item.price > 50 ? 0.35 : 0.02);
          const newPrice = Math.max(1, Math.round((item.price + delta) * 100) / 100);
          const newChange = Math.round((item.change + (delta / item.price) * 100) * 100) / 100;
          return { ...item, price: newPrice, change: newChange };
        })
      );
      setLastUpdated(new Date());
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const filteredAssets = marketData.filter((item) => {
    const matchesSearch = item.symbol.toLowerCase().includes(search.toLowerCase()) ||
                          item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || item.type.includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <span>Real-Time NYSE / NASDAQ / Treasury Ticker</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Live Market & Institutional Liquidity
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Streaming live market telemetry, sovereign yield curves, and corporate equity indices.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
              Last Tick: {lastUpdated.toLocaleTimeString()}
            </span>
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
              <Zap size={16} />
              <span>Purchase Stocks</span>
            </button>
          </div>
        </div>

        {/* Major Market Indices Marquee */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>S&P 500 (SPX)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>5,548.20</div>
            <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+0.74% (+40.8 pts)</span>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>NASDAQ 100 (NDX)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>19,420.60</div>
            <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={13} />
              <span>+1.32% (+253.1 pts)</span>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>US 10Y SOVEREIGN YIELD</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3B82F6', marginTop: '2px' }}>4.284%</div>
            <div style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>
              -2.1 bps Yield Shift
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>VIX VOLATILITY INDEX</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981', marginTop: '2px' }}>14.85</div>
            <div style={{ color: '#10B981', fontSize: '0.78rem', fontWeight: 700 }}>
              Low Market Stress (Optimal)
            </div>
          </div>

        </div>

        {/* Live Market Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Live Asset Quotes & Liquidity Depth
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                Instant trade execution eligible across institutional routing channels
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search symbol (e.g. NVDA, AAPL, SPY)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: '0.45rem 0.75rem 0.45rem 2rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.82rem',
                    outline: 'none',
                    width: '100%',
                  }}
                />
              </div>

              <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '2px' }}>
                {['all', 'Equity', 'ETF', 'Fixed Income'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    style={{
                      background: filterType === type ? '#FFFFFF' : 'transparent',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: filterType === type ? 800 : 600,
                      color: filterType === type ? '#0F172A' : '#64748B',
                      cursor: 'pointer',
                    }}
                  >
                    {type === 'all' ? 'All Assets' : type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Symbol</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Asset Name</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Asset Class</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Live Price</th>
                  <th style={{ padding: '0.85rem 1rem' }}>24h Change</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Volume</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Market Cap / Size</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Trade Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset, idx) => {
                  const isPositive = asset.change >= 0;
                  return (
                    <tr key={asset.symbol} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF' }}>
                      <td style={{ padding: '1rem', fontWeight: 900, color: '#0F172A' }}>
                        <span style={{ background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px' }}>
                          {asset.symbol}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: '#334155' }}>
                        {asset.name}
                      </td>
                      <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.8rem' }}>
                        {asset.type}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                        {asset.symbol.startsWith('US') ? `${asset.price}%` : `$${asset.price.toFixed(2)}`}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: isPositive ? '#10B981' : '#EF4444' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          <span>{isPositive ? `+${asset.change}%` : `${asset.change}%`}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748B' }}>
                        {asset.volume}
                      </td>
                      <td style={{ padding: '1rem', color: '#64748B', fontWeight: 600 }}>
                        {asset.marketCap}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => navigate('/purchase-stocks', { state: { symbol: asset.symbol, price: asset.price } })}
                          style={{
                            background: '#FF5B37',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.45rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 6px rgba(255, 91, 55, 0.2)',
                          }}
                        >
                          <DollarSign size={13} />
                          <span>Buy / Trade</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
}
