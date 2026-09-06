import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  Package,
  Activity,
  Component,
  ScrollText,
  ShieldCheck,
  Mail,
  User,
  LogOut,
  Sparkles,
  Search,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  X,
  Check,
  Settings,
  Sliders,
  Bell,
  Lock
} from 'lucide-react';
import { Dock, DockItem, DockIcon, DockLabel } from '../core/dock';
import { getCurrentUser, logoutUser } from '../../services/authService';

// Bento Dashboard Icon matching reference design
function DashboardBentoIcon({ size = 20, className = '', color = 'currentColor', strokeWidth = 2.2 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Top Left: Horizontal rounded rectangle */}
      <rect 
        x="2.5" 
        y="2.5" 
        width="8" 
        height="5.75" 
        rx="2.8" 
        stroke={color} 
        strokeWidth={strokeWidth} 
      />
      {/* Top Right: Vertical rounded rectangle */}
      <rect 
        x="13.5" 
        y="2.5" 
        width="8" 
        height="10.5" 
        rx="3.5" 
        stroke={color} 
        strokeWidth={strokeWidth} 
      />
      {/* Bottom Left: Vertical rounded rectangle */}
      <rect 
        x="2.5" 
        y="11" 
        width="8" 
        height="10.5" 
        rx="3.5" 
        stroke={color} 
        strokeWidth={strokeWidth} 
      />
      {/* Bottom Right: Horizontal rounded rectangle */}
      <rect 
        x="13.5" 
        y="15.75" 
        width="8" 
        height="5.75" 
        rx="2.8" 
        stroke={color} 
        strokeWidth={strokeWidth} 
      />
    </svg>
  );
}

// Portfolio Briefcase Avatar Icon matching user reference design
function PortfolioBriefcaseIcon({ size = 20, className = '', color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Top Handle */}
      <path 
        d="M9 4.5V2.8C9 2.35786 9.35786 2 9.8 2H14.2C14.6421 2 15 2.35786 15 2.8V4.5" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Outer Briefcase Body */}
      <rect 
        x="3" 
        y="4.5" 
        width="18" 
        height="16.5" 
        rx="2.5" 
        stroke={color} 
        strokeWidth={strokeWidth} 
      />

      {/* Briefcase Flap Side Lines */}
      <path 
        d="M3 13.5H5.5" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
      />
      <path 
        d="M18.5 13.5H21" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
      />

      {/* User Head Profile */}
      <circle 
        cx="12" 
        cy="9.8" 
        r="2.8" 
        stroke={color} 
        strokeWidth={strokeWidth} 
      />

      {/* User Shoulders Silhouette */}
      <path 
        d="M6.5 16.2C6.8 14.3 8.4 13.3 10.8 13.3H13.2C15.6 13.3 17.2 14.3 17.5 16.2C17.6 16.9 17 17.5 16.3 17.5H7.7C7 17.5 6.4 16.9 6.5 16.2Z" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

export default function Navbar({ onOpenDemo, onOpenLogin }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'JA', name: '日本語' },
    { code: 'HI', name: 'हिंदी' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const session = getCurrentUser();
    if (session?.user) {
      setCurrentUser(session.user);
    }
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoToLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = () => {
    logoutUser();
    setCurrentUser(null);
    navigate('/login');
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoRemediateToggle, setAutoRemediateToggle] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  const dockItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardBentoIcon size={20} strokeWidth={2.2} />
    },
    {
      title: 'Portfolio',
      path: '/portfolio',
      icon: <PortfolioBriefcaseIcon size={20} strokeWidth={2} />
    },
    {
      title: 'Live Market',
      path: '/live-market',
      icon: <Activity size={20} strokeWidth={2} />
    },
    {
      title: 'Purchase Stocks',
      path: '/purchase-stocks',
      icon: <Component size={20} strokeWidth={2} />
    },
    {
      title: 'Analytics',
      path: '/analytics',
      icon: <ScrollText size={20} strokeWidth={2} />
    },
    {
      title: 'Safeguards',
      path: '/safeguards',
      icon: <ShieldCheck size={20} strokeWidth={2} />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings size={20} strokeWidth={2} />
    }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '74px',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        boxSizing: 'border-box',
        background: isDarkMode 
          ? (isScrolled ? 'rgba(15, 23, 42, 0.96)' : 'rgba(15, 23, 42, 0.88)') 
          : (isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.88)'),
        backdropFilter: 'blur(28px) saturate(190%)',
        WebkitBackdropFilter: 'blur(28px) saturate(190%)',
        borderBottom: isDarkMode 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : '1px solid rgba(226, 232, 240, 0.85)',
        boxShadow: isScrolled 
          ? '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.02)' 
          : '0 2px 10px rgba(15, 23, 42, 0.03)',
        transition: 'background 0.25s ease, box-shadow 0.25s ease, border-bottom 0.25s ease'
      }}
    >
      {/* 1. Left: RiskBlance Brand Name */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
          userSelect: 'none',
          background: 'transparent',
          pointerEvents: 'auto',
          transition: 'transform 0.15s ease',
          flexShrink: 0
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ 
          fontSize: '2.1rem', 
          fontWeight: 900, 
          color: isDarkMode ? '#F8FAFC' : '#09132E', 
          letterSpacing: '-0.035em',
          lineHeight: 1,
          fontFamily: 'inherit'
        }}>
          Risk
        </span>
        <span style={{ 
          fontSize: '2.1rem', 
          fontWeight: 900, 
          color: '#16A34A', 
          letterSpacing: '-0.035em',
          lineHeight: 1,
          fontFamily: 'inherit'
        }}>
          Blance
        </span>
      </div>

      {/* 2. Middle: Dock Navigation Bar (Centered) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}
      >
        <Dock orientation="horizontal" className="items-center">
          {dockItems.map((item, idx) => {
            const isActive = item.path && (location.pathname === item.path || 
              (item.path === '/dashboard' && (location.pathname === '/landing' || location.pathname === '/home')));

            return (
              <DockItem
                key={idx}
                active={Boolean(isActive)}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            );
          })}
        </Dock>
      </div>

      {/* 3. Right: Utility Controls (Search, Dark Theme, Language) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'auto',
          flexShrink: 0
        }}
      >
        {/* Search Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: isDarkMode ? 'rgba(30, 41, 59, 0.92)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(218, 226, 237, 0.95)',
            borderRadius: '9999px',
            padding: '7px 14px',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            width: isSearchExpanded ? '210px' : '135px'
          }}
        >
          <Search size={15} color={isDarkMode ? '#94A3B8' : '#64748B'} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => !searchQuery && setIsSearchExpanded(false)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.84rem',
              fontWeight: 500,
              color: isDarkMode ? '#F8FAFC' : '#1E293B',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchExpanded(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                color: '#94A3B8'
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Theme Toggle Pill (Dark / Light) */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            background: isDarkMode ? 'rgba(30, 41, 59, 0.92)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(218, 226, 237, 0.95)',
            padding: '7px 16px',
            borderRadius: '9999px',
            cursor: 'pointer',
            color: isDarkMode ? '#F8FAFC' : '#1E293B',
            fontSize: '0.84rem',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            transition: 'all 0.2s ease',
            userSelect: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
          }}
        >
          {isDarkMode ? (
            <>
              <Sun size={15} color="#FBBF24" strokeWidth={2} />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon size={15} color="#1E293B" strokeWidth={2} />
              <span>Dark</span>
            </>
          )}
        </button>

        {/* Language Selector Pill (🌐 EN ⌵) */}
        <div style={{ position: 'relative' }} ref={langDropdownRef}>
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isDarkMode ? 'rgba(30, 41, 59, 0.92)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(218, 226, 237, 0.95)',
              padding: '7px 15px',
              borderRadius: '9999px',
              cursor: 'pointer',
              color: isDarkMode ? '#F8FAFC' : '#1E293B',
              fontSize: '0.84rem',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              transition: 'all 0.2s ease',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
            }}
          >
            <Globe size={16} color="#00A3E0" strokeWidth={2} />
            <span style={{ fontWeight: 600 }}>{selectedLanguage}</span>
            <ChevronDown 
              size={14} 
              color={isDarkMode ? '#94A3B8' : '#1E293B'} 
              strokeWidth={2.2}
              style={{
                transform: isLangDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease'
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {isLangDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: '150px',
                background: isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(16px)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(226, 232, 240, 0.95)',
                borderRadius: '16px',
                padding: '6px',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                zIndex: 200,
                animation: 'fadeIn 0.15s ease'
              }}
            >
              {languages.map((lang) => {
                const isSelected = selectedLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: isSelected 
                        ? (isDarkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(0, 163, 224, 0.08)')
                        : 'transparent',
                      color: isSelected 
                        ? '#00A3E0' 
                        : (isDarkMode ? '#F1F5F9' : '#334155'),
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 600 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(241, 245, 249, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>{lang.name}</span>
                    {isSelected && <Check size={13} color="#00A3E0" strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Global Settings & System Preferences Modal */}
      {isSettingsOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            style={{
              background: isDarkMode ? '#1E293B' : '#FFFFFF',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '560px',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #F1F5F9',
                background: isDarkMode ? '#0F172A' : '#FAFCFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #FF5B37 0%, #F59E0B 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <Settings size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 900, margin: 0 }}>System Settings & Preferences</h2>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>Configure Indian market currency, safeguards, and account</p>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '70vh', overflowY: 'auto' }}>
              
              {/* Section 1: Account / Session Status */}
              <div style={{ background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '16px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3B82F6', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                      {currentUser ? currentUser.email.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>{currentUser ? (currentUser.name || currentUser.email) : 'Institutional Administrator'}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{currentUser ? currentUser.email : 'admin@finopt.com'} • <span style={{ color: '#10B981', fontWeight: 700 }}>Authorized Role</span></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSettingsOpen(false);
                      if (currentUser) {
                        handleSignOut();
                      } else {
                        handleGoToLogin();
                      }
                    }}
                    style={{
                      background: currentUser ? '#FEE2E2' : '#EFF6FF',
                      color: currentUser ? '#EF4444' : '#2563EB',
                      border: 'none',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {currentUser ? 'Sign Out' : 'Sign In'}
                  </button>
                </div>
              </div>

              {/* Section 2: Market Currency & Units */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                  Market Currency & Numeration Units
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '2px solid #FF5B37',
                      background: 'rgba(255, 91, 55, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem' }}>₹ INR (Indian Rupee)</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Crores (Cr) & Lakhs (L)</div>
                    </div>
                    <Check size={16} color="#FF5B37" strokeWidth={2.5} />
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E2E8F0',
                      background: isDarkMode ? 'rgba(15, 23, 42, 0.3)' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: 0.6,
                      cursor: 'not-allowed',
                    }}
                    title="Indian Market standard is active"
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>$ USD (US Dollar)</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Millions ($M) & Billions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Risk Controls & Automation Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
                  Automated Risk Safeguard Preferences
                </label>

                {/* Toggle 1: Auto De-risking */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : '#F8FAFC', borderRadius: '12px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>Autonomous Flight-to-Safety Sweep</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Auto-reallocate 85% to RBI T-Bills on critical shock breach</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoRemediateToggle}
                    onChange={(e) => setAutoRemediateToggle(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#10B981', cursor: 'pointer' }}
                  />
                </div>

                {/* Toggle 2: Audio & Flash Alerts */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : '#F8FAFC', borderRadius: '12px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>Real-Time Telemetry Breach Banners</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Show sticky Red Alert Banner when risk score exceeds threshold</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#FF5B37', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Section 4: Interface Theme Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : '#F8FAFC', borderRadius: '12px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isDarkMode ? <Moon size={16} color="#38BDF8" /> : <Sun size={16} color="#F59E0B" />}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>Appearance Theme</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{isDarkMode ? 'Dark Mode (Flux Cyberpunk)' : 'Light Mode (Frosted Ethereal)'}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  style={{
                    background: isDarkMode ? '#0F172A' : '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: isDarkMode ? '#FFFFFF' : '#0F172A',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Switch to {isDarkMode ? 'Light' : 'Dark'}
                </button>
              </div>

            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #F1F5F9',
                display: 'flex',
                justifyContent: 'flex-end',
                background: isDarkMode ? '#0F172A' : '#FAFCFF',
              }}
            >
              <button
                onClick={() => setIsSettingsOpen(false)}
                style={{
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.55rem 1.35rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                }}
              >
                Done & Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
