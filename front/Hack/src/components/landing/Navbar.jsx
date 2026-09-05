import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  DollarSign,
  BarChart2
} from 'lucide-react';
import { getCurrentUser, logoutUser } from '../../services/authService';

export default function Navbar({ onOpenDemo, onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { label: 'Live Market', path: '/live-market', icon: TrendingUp },
    { label: 'Purchase Stocks', path: '/purchase-stocks', icon: DollarSign },
    { label: 'Analytics', path: '/analytics', icon: BarChart2 },
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: scrolled ? 'rgba(240, 243, 248, 0.95)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2E8F0',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Brand Logo matching clean pill emblem */}
        <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
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

        {/* Center 5 Options Navigation Pill */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem',
            background: '#FFFFFF',
            padding: '0.35rem 0.6rem',
            borderRadius: '9999px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === '/dashboard' && (location.pathname === '/landing' || location.pathname === '/home'));
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{
                  background: isActive ? '#09101D' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(9, 16, 29, 0.2)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FF5B37';
                    e.currentTarget.style.background = 'rgba(255, 91, 55, 0.06)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon size={15} color={isActive ? '#FF5B37' : 'currentColor'} />
                <span>{item.label}</span>
              </button>
            );
          })}
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
            onClick={() => navigate('/safeguards')}
            className="btn-coral"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={16} />
            <span>Safeguards</span>
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
            gap: '0.85rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(item.path);
                }}
                style={{
                  background: isActive ? '#09101D' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#0F172A',
                  border: '1px solid #E2E8F0',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Icon size={18} color={isActive ? '#FF5B37' : '#64748B'} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/safeguards'); }}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'rgba(255, 91, 55, 0.1)',
                border: '1px solid #FF5B37',
                fontWeight: 800,
                color: '#FF5B37',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={18} />
              <span>Risk Controls & Safeguards</span>
            </button>

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
          </div>
        </div>
      )}

      {/* Responsive media style injection */}
      <style>{`
        @media (max-width: 980px) {
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
