import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  User,
  LogOut
} from 'lucide-react';
import { getCurrentUser, logoutUser } from '../../services/authService';

export default function Navbar({ onOpenDemo, onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getCurrentUser();
    if (session?.user) {
      setCurrentUser(session.user);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoToLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      navigate('/');
    }
  };

  const handleSignOut = () => {
    logoutUser();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: scrolled ? 'rgba(240, 243, 248, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Brand Logo matching clean pill emblem */}
        <a href="/landing" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF5B37 0%, #09132E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 91, 55, 0.25)'
            }}
          >
            <ShieldCheck size={22} color="#FFFFFF" strokeWidth={2.4} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#09101D', display: 'flex', alignItems: 'center' }}>
              Capital<span style={{ color: '#FF5B37' }}>X</span>
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginTop: '-3px' }}>
              Autonomous Treasury
            </span>
          </div>
        </a>

        {/* Center Search / Navigation Pill */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem',
            background: '#FFFFFF',
            padding: '0.45rem 1.4rem',
            borderRadius: '9999px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
          }}
          className="desktop-nav"
        >
          <a href="#overview" style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FF5B37'} onMouseLeave={e => e.target.style.color = '#475569'}>Platform</a>
          <a href="#features" style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FF5B37'} onMouseLeave={e => e.target.style.color = '#475569'}>Features</a>
          <button 
            onClick={() => navigate('/safeguards')}
            style={{
              background: 'rgba(255, 91, 55, 0.08)',
              border: '1px solid rgba(255, 91, 55, 0.25)',
              color: '#FF5B37',
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FF5B37'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 91, 55, 0.08)'; e.currentTarget.style.color = '#FF5B37'; }}
          >
            <ShieldCheck size={14} />
            <span>Risk Controls & Safeguards</span>
          </button>
          <a href="#visualization" style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FF5B37'} onMouseLeave={e => e.target.style.color = '#475569'}>Analytics</a>
          <a href="#security" style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#FF5B37'} onMouseLeave={e => e.target.style.color = '#475569'}>Enterprise</a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-actions">
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  padding: '0.45rem 0.9rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                <span>{currentUser.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#64748B',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#EF4444';
                  e.currentTarget.style.borderColor = '#FCA5A5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleGoToLogin}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#09101D',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0.55rem 1.1rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.background = '#F8FAFD';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              <User size={15} color="#FF5B37" />
              <span>Sign In / Portal</span>
            </button>
          )}
          
          <button 
            onClick={onOpenDemo}
            className="btn-coral"
            style={{ padding: '0.6rem 1.35rem', fontSize: '0.88rem' }}
          >
            <Sparkles size={15} />
            <span>Schedule Demo +</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '8px',
            color: '#0F172A',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            padding: '1.5rem',
            background: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}
        >
          <a onClick={() => setMobileMenuOpen(false)} href="#overview" style={{ color: '#0F172A', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>Platform</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#features" style={{ color: '#0F172A', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>Features</a>
          <button
            onClick={() => { setMobileMenuOpen(false); navigate('/safeguards'); }}
            style={{
              background: 'rgba(255, 91, 55, 0.1)',
              border: '1px solid #FF5B37',
              color: '#FF5B37',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldCheck size={16} />
            <span>Risk Controls & Safeguards</span>
          </button>
          <a onClick={() => setMobileMenuOpen(false)} href="#visualization" style={{ color: '#0F172A', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>Live Visualization</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#security" style={{ color: '#0F172A', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>Enterprise Security</a>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {currentUser ? (
              <button 
                onClick={() => { setMobileMenuOpen(false); handleSignOut(); }} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  background: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  fontWeight: 700,
                  color: '#DC2626',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <LogOut size={16} />
                <span>Sign Out ({currentUser.name})</span>
              </button>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); handleGoToLogin(); }} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  background: '#F8FAFD',
                  border: '1px solid #CBD5E1',
                  fontWeight: 700,
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                Sign In / Client Portal
              </button>
            )}
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }} 
              className="btn-coral"
              style={{ width: '100%' }}
            >
              Schedule Demo +
            </button>
          </div>
        </div>
      )}

      {/* Responsive media style injection */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
