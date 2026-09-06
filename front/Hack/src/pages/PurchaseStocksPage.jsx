import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { 
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
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 3025.40, type: 'Large-Cap Energy & Tech', riskTier: 'Medium Risk', yieldEst: '15.4% Expected Return', exchange: 'NSE' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4520.10, type: 'Tier-1 IT Bluechip', riskTier: 'Low-Med Risk', yieldEst: '12.8% Expected Return', exchange: 'NSE' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1668.50, type: 'Top Banking Giant', riskTier: 'Low-Med Risk', yieldEst: '13.5% Expected Return', exchange: 'NSE' },
  { symbol: 'INFY', name: 'Infosys Ltd.', price: 1945.30, type: 'IT Services & Cloud', riskTier: 'Medium Risk', yieldEst: '14.2% Expected Return', exchange: 'NSE' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', price: 1234.80, type: 'Private Sector Banking', riskTier: 'Medium Risk', yieldEst: '16.0% Expected Return', exchange: 'NSE' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.', price: 1092.40, type: 'Automotive & EV Alpha', riskTier: 'High Risk', yieldEst: '18.5% Expected Return', exchange: 'NSE' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 826.90, type: 'PSU Sovereign Banking', riskTier: 'Low-Med Risk', yieldEst: '11.8% Expected Return', exchange: 'NSE' },
  { symbol: 'IN91D', name: 'RBI 91-Day Sovereign T-Bill', price: 98.35, type: 'RBI Sovereign Cash Reserve', riskTier: 'Zero Risk (Sovereign)', yieldEst: '6.74% Sovereign Yield', exchange: 'RBI Repo' },
  { symbol: 'IN10Y', name: 'India 10-Yr Government Bond (G-Sec)', price: 101.20, type: 'GoI Sovereign Fixed Income', riskTier: 'Zero Risk (Sovereign)', yieldEst: '6.86% Annual Coupon', exchange: 'RBI G-Sec' },
];

export default function PurchaseStocksPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAUM, assets, executeLiveOrder } = useRiskSafeguard();

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
    { id: 'ORD-9841', timestamp: 'Today, 11:20 AM', symbol: 'IN91D', side: 'BUY', shares: 50000, price: 98.35, total: 4917500, status: 'FILLED' },
    { id: 'ORD-9838', timestamp: 'Yesterday, 03:45 PM', symbol: 'RELIANCE', side: 'BUY', shares: 500, price: 3012.50, total: 1506250, status: 'FILLED' },
    { id: 'ORD-9812', timestamp: 'Aug 28, 09:15 AM', symbol: 'TCS', side: 'BUY', shares: 200, price: 4490.00, total: 898000, status: 'FILLED' },
  ]);

  const effectivePrice = orderType === 'limit' ? (limitPrice || selectedAsset.price) : selectedAsset.price;
  const totalOrderValue = shares * effectivePrice;
  const estimatedCashReserve = 350000000; // ₹35 Cr

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
      executeLiveOrder(newOrder);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '6.85rem 1.5rem 4rem 1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 91, 55, 0.1)', color: '#FF5B37', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <Zap size={13} />
              <span>Institutional NSE / BSE Execution Terminal (₹ INR)</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Purchase Indian Stocks & Sovereign G-Sec
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Direct market access to National Stock Exchange (NSE), BSE, and Reserve Bank of India Sovereign bonds.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Available Buying Power</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10B981' }}>
              ₹{(estimatedCashReserve / 10000000).toFixed(2)} Cr Cash
            </div>
          </div>
        </div>

        {/* Trade Terminal Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
          
          {/* Left: Asset Selection & Details Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
                1. Select Indian Asset / Stock
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                Choose an NSE equity, index benchmark, or RBI sovereign bond to trade
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
                        <span style={{ fontSize: '0.72rem', background: '#E2E8F0', padding: '2px 5px', borderRadius: '4px', color: '#475569', fontWeight: 700 }}>{asset.exchange}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>• {asset.type}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#334155', marginTop: '2px' }}>
                        {asset.name}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                        ₹{asset.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                      {orderSuccess.side} {orderSuccess.shares.toLocaleString('en-IN')} {orderSuccess.symbol} @ ₹{orderSuccess.price.toFixed(2)} (Total: ₹{orderSuccess.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })})
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
                      Limit Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.05"
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
                    <strong style={{ color: '#0F172A' }}>₹{effectivePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Estimated Total Value:</span>
                    <strong style={{ color: '#0F172A', fontSize: '1.05rem', fontWeight: 900 }}>₹{totalOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Exchange Clearing & Brokerage:</span>
                    <strong style={{ color: '#10B981' }}>₹0.00 (Institutional Zero Fee)</strong>
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
                      ? 'Routing Order through NSE Clearing...'
                      : `Execute ${orderSide.toUpperCase()} Order for ${shares.toLocaleString('en-IN')} ${selectedAsset.symbol}`}
                  </span>
                </button>

              </form>
            </div>

          </div>

        </div>

        {/* Recent Execution History */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0' }}>
            Recent Trade Execution Ledger (₹ INR)
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
                  <th style={{ padding: '0.85rem 1rem' }}>Total Settled (₹)</th>
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
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{ord.shares.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>₹{ord.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>₹{ord.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
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
