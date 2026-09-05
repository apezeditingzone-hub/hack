import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Layers, 
  Sliders,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useRiskSafeguard } from '../context/RiskSafeguardContext';

const TRADABLE_ASSETS = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 128.45, type: 'Growth Equity', riskTier: 'High', yieldEst: '14.2% Return' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 224.20, type: 'Large-Cap Tech', riskTier: 'Medium', yieldEst: '10.5% Return' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 448.90, type: 'Large-Cap Tech', riskTier: 'Medium', yieldEst: '11.2% Return' },
  { symbol: 'SPY', name: 'SPDR S&P 500 Index ETF', price: 552.30, type: 'Broad Market ETF', riskTier: 'Low-Medium', yieldEst: '9.8% Return' },
  { symbol: 'QQQ', name: 'Invesco Nasdaq 100 ETF', price: 480.15, type: 'Tech Benchmark ETF', riskTier: 'Medium', yieldEst: '12.0% Return' },
  { symbol: 'US03M', name: '3-Month US Treasury Bill', price: 100.00, type: 'Sovereign Cash Reserve', riskTier: 'Zero Risk', yieldEst: '5.25% APY' },
  { symbol: 'US10Y', name: '10-Year US Treasury Bond', price: 98.50, type: 'Sovereign Fixed Income', riskTier: 'Low Risk', yieldEst: '4.28% APY' },
  { symbol: 'JPM_CORP', name: 'JPMorgan IG Corporate Note', price: 102.10, type: 'Corporate Debt A/AAA', riskTier: 'Low Risk', yieldEst: '6.15% APY' },
];

export default function PurchaseStocksPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAUM, assets, addIncidentLog } = useRiskSafeguard();

  const [selectedAsset, setSelectedAsset] = useState(() => {
    const passed = location.state?.symbol;
    return TRADABLE_ASSETS.find(a => a.symbol === passed) || TRADABLE_ASSETS[0];
  });

  const [orderSide, setOrderSide] = useState('buy'); // 'buy' | 'sell'
  const [orderType, setOrderType] = useState('market'); // 'market' | 'limit'
  const [shares, setShares] = useState(100);
  const [limitPrice, setLimitPrice] = useState(selectedAsset.price);
  const [isExecuting, setIsExecuting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [orderHistory, setOrderHistory] = useState([
    { id: 'ORD-9841', timestamp: 'Today, 11:20 AM', symbol: 'US03M', side: 'BUY', shares: 50000, price: 100.00, total: 5000000, status: 'FILLED' },
    { id: 'ORD-9838', timestamp: 'Yesterday, 03:45 PM', symbol: 'SPY', side: 'BUY', shares: 2000, price: 549.80, total: 1099600, status: 'FILLED' },
    { id: 'ORD-9812', timestamp: 'Aug 28, 09:15 AM', symbol: 'NVDA', side: 'SELL', shares: 1500, price: 125.10, total: 187650, status: 'FILLED' },
  ]);

  const effectivePrice = orderType === 'limit' ? (limitPrice || selectedAsset.price) : selectedAsset.price;
  const totalOrderValue = shares * effectivePrice;
  const estimatedCashReserve = 35000000;

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setLimitPrice(asset.price);
    setOrderSuccess(null);
  };

  const handleExecuteTrade = (e) => {
    e.preventDefault();
    if (shares <= 0) return;

    setIsExecuting(true);
    setOrderSuccess(null);

    setTimeout(() => {
      setIsExecuting(false);
      const newOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: 'Just now',
        symbol: selectedAsset.symbol,
        side: orderSide.toUpperCase(),
        shares: parseInt(shares),
        price: effectivePrice,
        total: totalOrderValue,
        status: 'FILLED',
      };

      setOrderHistory(prev => [newOrder, ...prev]);
      setOrderSuccess(newOrder);

      addIncidentLog({
        severity: 'safe',
        title: `Institutional Order Executed: ${newOrder.side} ${newOrder.shares} ${newOrder.symbol}`,
        asset: selectedAsset.name,
        message: `Settled $${newOrder.total.toLocaleString()} via Automated Treasury Execution Channel.`,
        actionTaken: 'Portfolio liquidity and holdings updated immediately.',
        status: 'verified',
        riskScoreAtTrigger: 26.4,
      });
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 91, 55, 0.1)', color: '#FF5B37', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <Zap size={13} />
              <span>Institutional Execution Terminal</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Purchase Stocks & Treasury Assets
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Direct market access, automated algorithmic routing, and real-time settlement.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Available Buying Power</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10B981' }}>
              ${(estimatedCashReserve / 1000000).toFixed(2)}M Cash
            </div>
          </div>
        </div>

        {/* Trade Terminal Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
          
          {/* Left: Asset Selection & Details Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
                1. Select Asset / Security
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                Choose an equity, ETF, or sovereign fixed income security to trade
              </p>
            </div>

            {/* Asset List Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
              {TRADABLE_ASSETS.map((asset) => {
                const isSelected = selectedAsset.symbol === asset.symbol;
                return (
                  <div
                    key={asset.symbol}
                    onClick={() => handleAssetSelect(asset)}
                    style={{
                      background: isSelected ? 'rgba(255, 91, 55, 0.06)' : '#F8FAFC',
                      border: `1px solid ${isSelected ? '#FF5B37' : '#E2E8F0'}`,
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 900, color: '#0F172A', fontSize: '0.95rem' }}>{asset.symbol}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>• {asset.type}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#334155', marginTop: '2px' }}>
                        {asset.name}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                        ${asset.price.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>
                        {asset.yieldEst}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order Configuration & Execution Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  2. Configure Order Parameters
                </h2>
                
                {/* Buy / Sell Tabs */}
                <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '2px' }}>
                  <button
                    type="button"
                    onClick={() => setOrderSide('buy')}
                    style={{
                      background: orderSide === 'buy' ? '#10B981' : 'transparent',
                      color: orderSide === 'buy' ? '#FFFFFF' : '#64748B',
                      border: 'none',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    BUY / ACCUMULATE
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderSide('sell')}
                    style={{
                      background: orderSide === 'sell' ? '#EF4444' : 'transparent',
                      color: orderSide === 'sell' ? '#FFFFFF' : '#64748B',
                      border: 'none',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    SELL / LIQUIDATE
                  </button>
                </div>
              </div>

              {/* Order Success Card */}
              {orderSuccess && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={22} color="#10B981" />
                  <div>
                    <div style={{ fontWeight: 800, color: '#065F46', fontSize: '0.88rem' }}>
                      Order Executed: {orderSuccess.id}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                      {orderSuccess.side} {orderSuccess.shares.toLocaleString()} {orderSuccess.symbol} @ ${orderSuccess.price.toFixed(2)} (Total: ${orderSuccess.total.toLocaleString()})
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleExecuteTrade} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Order Type Toggle */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setOrderType('market')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: `1px solid ${orderType === 'market' ? '#FF5B37' : '#E2E8F0'}`,
                      background: orderType === 'market' ? 'rgba(255, 91, 55, 0.08)' : '#F8FAFC',
                      color: orderType === 'market' ? '#FF5B37' : '#64748B',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Market Order (Instant)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('limit')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: `1px solid ${orderType === 'limit' ? '#FF5B37' : '#E2E8F0'}`,
                      background: orderType === 'limit' ? 'rgba(255, 91, 55, 0.08)' : '#F8FAFC',
                      color: orderType === 'limit' ? '#FF5B37' : '#64748B',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Limit Order
                  </button>
                </div>

                {/* Shares Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Number of Shares / Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={shares}
                    onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '1rem',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Limit Price Input if Limit Order */}
                {orderType === 'limit' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Limit Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '1rem',
                        fontWeight: 700,
                        outline: 'none',
                      }}
                    />
                  </div>
                )}

                {/* Order Summary Box */}
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Estimated Unit Price:</span>
                    <strong style={{ color: '#0F172A' }}>${effectivePrice.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Estimated Total Value:</span>
                    <strong style={{ color: '#0F172A', fontSize: '1.05rem', fontWeight: 900 }}>${totalOrderValue.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Estimated Settlement Fee:</span>
                    <strong style={{ color: '#10B981' }}>$0.00 (Institutional Zero Fee)</strong>
                  </div>
                </div>

                {/* Execute Button */}
                <button
                  type="submit"
                  disabled={isExecuting}
                  style={{
                    width: '100%',
                    background: orderSide === 'buy' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Zap size={16} />
                  <span>
                    {isExecuting
                      ? 'Routing Order through Clearing...'
                      : `Execute ${orderSide.toUpperCase()} Order for ${shares} ${selectedAsset.symbol}`}
                  </span>
                </button>

              </form>
            </div>

          </div>

        </div>

        {/* Recent Execution History */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0' }}>
            Recent Trade Execution Ledger
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Order ID</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Time</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Symbol</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Action</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Quantity</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Execution Price</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Total Settled</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Clearing Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((ord, idx) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFCFF' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#0F172A' }}>{ord.id}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#64748B' }}>{ord.timestamp}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>{ord.symbol}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{ color: ord.side === 'BUY' ? '#10B981' : '#EF4444', fontWeight: 800 }}>
                        {ord.side}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{ord.shares.toLocaleString()}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>${ord.price.toFixed(2)}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>${ord.total.toLocaleString()}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{ background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                        {ord.status}
                      </span>
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
