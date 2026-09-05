import React from 'react';
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Lock, 
  Building2, 
  Sparkles,
  ChevronRight,
  Activity
} from 'lucide-react';

export default function Hero({ onGetStarted, onViewDemo }) {
  return (
    <section id="overview" style={{ position: 'relative', paddingTop: '3rem', paddingBottom: '3.5rem', overflow: 'hidden' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Top Innovation Pill matching reference badge style */}
        <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div 
            className="badge-clean"
            style={{
              padding: '0.4rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)'
            }}
          >
            <span className="pulse-dot" style={{ backgroundColor: '#FF5B37' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em', color: '#09132E', textTransform: 'uppercase' }}>
              CapitalX Autonomous Engine 3.2
            </span>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Enterprise Treasury AI <ChevronRight size={14} />
            </span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <h1 
          style={{ 
            fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)', 
            lineHeight: 1.12, 
            fontWeight: 800, 
            letterSpacing: '-0.035em',
            maxWidth: '980px',
            margin: '0 auto 1.5rem auto',
            color: '#09101D'
          }}
        >
          Optimize Your Capital.{' '}
          <span className="gradient-text-coral">
            Control Your Risk.
          </span>
        </h1>

        {/* Hero Description */}
        <p 
          style={{ 
            fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)', 
            color: '#64748B', 
            maxWidth: '740px', 
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}
        >
          CapitalX uses predictive AI to continuously optimize company asset allocation and cash yields while strictly enforcing enterprise risk limits and liquidity mandates.
        </p>

        {/* Call to Actions with pill buttons */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}
        >
          <button 
            onClick={onGetStarted}
            className="btn-coral"
            style={{ 
              padding: '0.95rem 2.2rem', 
              fontSize: '1.02rem', 
              fontWeight: 700
            }}
          >
            <span>Get Started</span>
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={onViewDemo}
            className="btn-secondary"
            style={{ 
              padding: '0.95rem 2rem', 
              fontSize: '1.02rem', 
              fontWeight: 600
            }}
          >
            <Play size={15} fill="#0F172A" />
            <span>View Demo</span>
          </button>
        </div>

        {/* Live Top Quick Stat Pill Widgets matching the reference header metrics */}
        <div 
          className="clean-card"
          style={{
            maxWidth: '1020px',
            margin: '0 auto',
            padding: '1.25rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center',
            background: '#FFFFFF'
          }}
        >
          <div style={{ textAlign: 'left', borderRight: '1px solid #E8EDF5', paddingRight: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Managed Capital
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#09101D' }}>$18.4B</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                +38% YoY
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'left', borderRight: '1px solid #E8EDF5', paddingRight: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Average Yield Alpha
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FF5B37' }}>+265 bps</span>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>over cash</span>
            </div>
          </div>

          <div style={{ textAlign: 'left', borderRight: '1px solid #E8EDF5', paddingRight: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Risk Breach Rate
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10B981' }}>0.00%</span>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>Zero Incidents</span>
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              AI Rebalance Time
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#09132E' }}>&lt; 350ms</span>
              <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700, background: 'rgba(37, 99, 235, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                Autonomous
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
