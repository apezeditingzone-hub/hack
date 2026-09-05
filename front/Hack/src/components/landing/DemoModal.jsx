import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Sliders, 
  ArrowRight, 
  CheckCircle, 
  Download,
  Building2,
  RefreshCw
} from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [capitalInput, setCapitalInput] = useState(50); // in millions
  const [riskProfile, setRiskProfile] = useState('balanced'); // conservative, balanced, growth
  const [liquidityRequirement, setLiquidityRequirement] = useState(25); // % in cash
  const [isSimulating, setIsSimulating] = useState(false);
  const [demoRequested, setDemoRequested] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  // Dynamic calculations based on user input
  const capitalAmount = capitalInput * 1000000;
  
  const profileMultipliers = {
    conservative: { rate: 0.062, alphaBps: 140, riskScore: 12, var: '0.45%' },
    balanced: { rate: 0.118, alphaBps: 320, riskScore: 24, var: '1.20%' },
    growth: { rate: 0.165, alphaBps: 580, riskScore: 42, var: '2.80%' }
  };

  const currentProfile = profileMultipliers[riskProfile];
  const annualIncome = Math.round(capitalAmount * currentProfile.rate);
  const incrementalAlpha = Math.round(capitalAmount * (currentProfile.alphaBps / 10000));

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const handleSubmitAccess = (e) => {
    e.preventDefault();
    setDemoRequested(true);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(9, 19, 46, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 70px rgba(9, 19, 46, 0.25)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
            <span className="badge-coral-subtle">
              <Sparkles size={12} /> Interactive Simulator
            </span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#09101D', letterSpacing: '-0.02em' }}>
            Simulate Your Company's <span className="gradient-text-coral">Capital Optimization</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Adjust your enterprise parameters below to calculate potential yield alpha and risk-adjusted return under the CapitalX autonomous framework.
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }} className="modal-split">
          
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Capital Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>Corporate Capital Size</label>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FF5B37' }}>${capitalInput} Million USD</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="250" 
                step="5"
                value={capitalInput}
                onChange={(e) => { setCapitalInput(Number(e.target.value)); handleSimulate(); }}
                style={{
                  width: '100%',
                  accentColor: '#FF5B37',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
                <span>$5M</span>
                <span>$100M</span>
                <span>$250M+</span>
              </div>
            </div>

            {/* Risk Strategy Toggle */}
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.6rem' }}>
                Treasury Risk Tolerance
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'conservative', label: 'Fortress', rate: '6.2%' },
                  { id: 'balanced', label: 'Balanced', rate: '11.8%' },
                  { id: 'growth', label: 'Growth', rate: '16.5%' }
                ].map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { setRiskProfile(r.id); handleSimulate(); }}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '10px',
                      background: riskProfile === r.id ? '#09132E' : '#F8FAFD',
                      border: riskProfile === r.id ? '1px solid #09132E' : '1px solid #E2E8F0',
                      color: riskProfile === r.id ? '#FFFFFF' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div>{r.label}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>~{r.rate} APY</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Liquidity Requirement */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>T+0 Liquidity Buffer</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10B981' }}>{liquidityRequirement}% (${(capitalInput * liquidityRequirement / 100).toFixed(1)}M)</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="60" 
                step="5"
                value={liquidityRequirement}
                onChange={(e) => { setLiquidityRequirement(Number(e.target.value)); handleSimulate(); }}
                style={{
                  width: '100%',
                  accentColor: '#10B981',
                  cursor: 'pointer'
                }}
              />
            </div>

          </div>

          {/* Results Output Column (styled as deep navy summary card) */}
          <div 
            className="navy-hero-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '18px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                Projected Annual Net Yield
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 1rem 0' }}>
                ${(annualIncome / 1000000).toFixed(2)}M <span style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: 500 }}>/ year</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94A3B8' }}>Incremental Alpha:</span>
                  <strong style={{ color: '#00D4FF' }}>+${(incrementalAlpha / 1000000).toFixed(2)}M/yr</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94A3B8' }}>Composite Risk Score:</span>
                  <strong style={{ color: '#10B981' }}>{currentProfile.riskScore} / 100 (Safe)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94A3B8' }}>99% Daily VaR:</span>
                  <strong style={{ color: '#FFFFFF' }}>{currentProfile.var}</strong>
                </div>
              </div>
            </div>

            {/* Quick Summary Note */}
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#00D4FF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle size={14} /> AI Recommendation Ready
              </div>
              <p style={{ fontSize: '0.75rem', color: '#CBD5E1', margin: '4px 0 0 0' }}>
                Autonomous reallocation plan satisfies 100% of corporate cash runway requirements.
              </p>
            </div>

          </div>

        </div>

        {/* Lead Capture Form */}
        {!demoRequested ? (
          <form onSubmit={handleSubmitAccess} style={{ borderTop: '1px solid #E8EDF5', paddingTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input 
              type="email" 
              required
              placeholder="Enter corporate work email for custom PDF report..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: '260px',
                padding: '0.85rem 1.25rem',
                borderRadius: '9999px',
                background: '#F8FAFD',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-coral" style={{ padding: '0.85rem 1.85rem' }}>
              <span>Generate Full Report</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div style={{ padding: '1rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '4px' }}>✓ Custom Allocation Strategy Generated</div>
            <div style={{ fontSize: '0.85rem', color: '#334155' }}>Our Institutional Capital Advisory team will deliver your full strategy deck to <strong>{email}</strong> shortly.</div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 720px) {
          .modal-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
