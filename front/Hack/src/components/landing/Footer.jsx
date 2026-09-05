import React from 'react';
import { 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';

export default function Footer({ onOpenDemo }) {
  return (
    <footer 
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem',
        color: '#64748B'
      }}
    >
      <div className="container">
        
        {/* Top CTA Banner styled as Deep Navy Hero Card */}
        <div 
          className="navy-hero-card"
          style={{
            padding: '2.5rem 3rem',
            borderRadius: '24px',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
              <span className="badge-coral-subtle" style={{ background: 'rgba(255, 91, 55, 0.2)', color: '#FF7A5C' }}>
                Enterprise Ready
              </span>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
              Upgrade Your Corporate Treasury to Autonomous AI
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '6px 0 0 0' }}>
              Book an enterprise architecture review with our quantitative risk specialists.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={onOpenDemo}
              className="btn-coral"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
            >
              <span>Request Platform Access</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
          className="footer-nav-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF5B37 0%, #09132E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShieldCheck size={20} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09101D' }}>
                Capital<span style={{ color: '#FF5B37' }}>X</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '320px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              The institutional standard for autonomous corporate treasury, predictive capital allocation, and continuous algorithmic risk containment.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
              <span className="pulse-dot"></span>
              <span>All Systems Operational (Tier IV Custody)</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 style={{ color: '#09101D', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.2rem' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, fontSize: '0.88rem' }}>
              <li><a href="#overview" style={{ color: '#64748B', textDecoration: 'none' }}>AI Optimization</a></li>
              <li><a href="#features" style={{ color: '#64748B', textDecoration: 'none' }}>Automated Risk Engine</a></li>
              <li><a href="#visualization" style={{ color: '#64748B', textDecoration: 'none' }}>Real-Time Portfolio</a></li>
              <li><a href="#risk-engine" style={{ color: '#64748B', textDecoration: 'none' }}>Stress-Testing Sandbox</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Liquidity Routing</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 style={{ color: '#09101D', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.2rem' }}>
              Solutions
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, fontSize: '0.88rem' }}>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Enterprise Treasuries</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Private Credit Funds</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Sovereign Wealth</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Fintech Platforms</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Multi-Family Offices</a></li>
            </ul>
          </div>

          {/* Column 3: Security & Governance */}
          <div>
            <h4 style={{ color: '#09101D', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.2rem' }}>
              Security
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, fontSize: '0.88rem' }}>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>SOC-2 Type II Report</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Multi-Sig Architecture</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Custody Isolation</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Basel III Compliance</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Audited Smart Sweeps</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 style={{ color: '#09101D', fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.2rem' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, fontSize: '0.88rem' }}>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>About CapitalX</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Quantitative Research</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Careers <span style={{ fontSize: '0.7rem', color: '#FF5B37', background: 'rgba(255, 91, 55, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>Hiring</span></a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Press & Media</a></li>
              <li><a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Contact Advisory</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div 
          style={{
            borderTop: '1px solid #E8EDF5',
            paddingTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#94A3B8'
          }}
        >
          <div>
            © {new Date().getFullYear()} CapitalX Technologies, Inc. All rights reserved. Registered SEC Institutional Platform.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Security Disclosure</a>
            <a href="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>System Status</a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-nav-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-nav-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
