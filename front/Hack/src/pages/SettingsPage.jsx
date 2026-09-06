import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { 
  Settings, 
  LogOut, 
  User, 
  ShieldCheck, 
  DollarSign, 
  Sliders, 
  Bell, 
  Check, 
  Moon, 
  Sun, 
  Lock, 
  CheckCircle2,
  Zap,
  Globe,
  Save,
  Building,
  Mail,
  Phone,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
  ExternalLink,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { getCurrentUser, logoutUser } from '../services/authService';
import { 
  getMarketApiConfig, 
  saveMarketApiConfig, 
  testMarketApiKey,
  OFFICIAL_PROVIDER_KEYS 
} from '../services/marketApiService';

export default function SettingsPage() {
  const navigate = useNavigate();

  // User Profile Form State
  const [userName, setUserName] = useState('Pratik Sharma');
  const [userEmail, setUserEmail] = useState('pratik.treasury@finopt.in');
  const [userRole, setUserRole] = useState('Chief Risk Officer');
  const [userOrg, setUserOrg] = useState('Apex Institutional Capital & Treasury Desk (NSE Member)');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');

  // Preferences State
  const [currencyStandard, setCurrencyStandard] = useState('INR');
  const [autoFlightToSafety, setAutoFlightToSafety] = useState(true);
  const [telemetryAlerts, setTelemetryAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  // Market API Key Configuration State (Locked to Given Official Verified Options Only)
  const [apiProvider, setApiProvider] = useState('twelvedata');
  const [apiKey, setApiKey] = useState(OFFICIAL_PROVIDER_KEYS.twelvedata.key);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestResult, setApiTestResult] = useState(null);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [isLoggedOutMessage, setIsLoggedOutMessage] = useState(false);

  // Load stored user data & API Key on mount
  useEffect(() => {
    // Check auth session
    const session = getCurrentUser();
    if (session?.user) {
      if (session.user.name) setUserName(session.user.name);
      if (session.user.email) setUserEmail(session.user.email);
      if (session.user.role) setUserRole(session.user.role);
    }

    // Check additional stored settings profile
    try {
      const storedProfile = localStorage.getItem('finopt_user_profile');
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        if (parsed.userName) setUserName(parsed.userName);
        if (parsed.userEmail) setUserEmail(parsed.userEmail);
        if (parsed.userRole) setUserRole(parsed.userRole);
        if (parsed.userOrg) setUserOrg(parsed.userOrg);
        if (parsed.userPhone) setUserPhone(parsed.userPhone);
        if (parsed.autoFlightToSafety !== undefined) setAutoFlightToSafety(parsed.autoFlightToSafety);
        if (parsed.telemetryAlerts !== undefined) setTelemetryAlerts(parsed.telemetryAlerts);
        if (parsed.soundAlerts !== undefined) setSoundAlerts(parsed.soundAlerts);
      }
    } catch (e) {
      // fallback to defaults
    }

    // Load Market API config (locking to given official options)
    const apiCfg = getMarketApiConfig();
    if (apiCfg && OFFICIAL_PROVIDER_KEYS[apiCfg.provider]) {
      setApiProvider(apiCfg.provider);
      setApiKey(OFFICIAL_PROVIDER_KEYS[apiCfg.provider].key);
    } else {
      setApiProvider('twelvedata');
      setApiKey(OFFICIAL_PROVIDER_KEYS.twelvedata.key);
    }
  }, []);

  // When user clicks a given provider option, automatically switch to its verified official key
  const handleSelectProvider = (providerId) => {
    setApiProvider(providerId);
    if (OFFICIAL_PROVIDER_KEYS[providerId]) {
      setApiKey(OFFICIAL_PROVIDER_KEYS[providerId].key);
    }
    setApiTestResult(null);
  };

  // Ping & Test the selected Given Official Market API Option
  const handleTestApiConnection = async () => {
    setIsTestingApi(true);
    setApiTestResult(null);

    const res = await testMarketApiKey(apiProvider);
    setApiTestResult(res);
    setIsTestingApi(false);
  };

  // Save updated profile & API key configuration to localStorage
  const handleSaveProfile = (e) => {
    e.preventDefault();

    const profileData = {
      userName,
      userEmail,
      userRole,
      userOrg,
      userPhone,
      autoFlightToSafety,
      telemetryAlerts,
      soundAlerts,
      updatedAt: new Date().toISOString()
    };

    // Store profile in localStorage
    localStorage.setItem('finopt_user_profile', JSON.stringify(profileData));

    // Store selected Official API Key Provider in localStorage
    saveMarketApiConfig({
      provider: apiProvider,
      enabled: true
    });

    // Also update auth user session
    const existingSession = getCurrentUser() || {};
    const updatedUser = {
      ...(existingSession.user || {}),
      name: userName,
      email: userEmail,
      role: userRole
    };
    localStorage.setItem('capitalx_auth_user', JSON.stringify({ user: updatedUser, authenticated: true }));

    setSaveSuccessMsg(true);
    setTimeout(() => {
      setSaveSuccessMsg(false);
    }, 4000);
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedOutMessage(true);
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '6.85rem 1.5rem 4rem 1.5rem', boxSizing: 'border-box' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 91, 55, 0.1)', color: '#FF5B37', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <Settings size={13} />
              <span>User Profile & Storage Configuration</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              User Profile & System Settings
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
              Manage credentials, official real-time stock market API options, risk limits, and telemetry preferences.
            </p>
          </div>

          {/* Quick Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.65rem 1.35rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out / Logout</span>
          </button>
        </div>

        {/* Save Confirmation Toast */}
        {saveSuccessMsg && (
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#065F46', fontSize: '0.88rem', fontWeight: 700 }}>
            <CheckCircle2 size={22} color="#10B981" />
            <div>
              <div>Profile & Official API Provider Configuration Saved!</div>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 500 }}>The verified institutional real-time telemetry stream is active across your platform.</div>
            </div>
          </div>
        )}

        {/* Logout Toast Banner */}
        {isLoggedOutMessage && (
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#1E40AF', fontSize: '0.88rem', fontWeight: 700 }}>
            <LogOut size={20} color="#2563EB" />
            <span>Signed out successfully. Redirecting to Login screen...</span>
          </div>
        )}

        {/* Settings Form */}
        <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }}>
          
          {/* Card 1: User Profile & Organization Records */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', boxShadow: '0 4px 20px rgba(15,23,42,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    User Profile & Institutional ID
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                    Stored data identity used for institutional clearing & automated risk authorization
                  </p>
                </div>
              </div>

              <span style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800 }}>
                ● LOCAL STORAGE ACTIVE
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name..."
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Official Email (Login Identifier)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter official email..."
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Designation / Role */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Designation / Role
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    outline: 'none',
                    background: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Chief Risk Officer">Chief Risk Officer (CRO)</option>
                  <option value="Chief Treasury Officer">Chief Treasury Officer (CTO)</option>
                  <option value="Institutional Portfolio Manager">Institutional Portfolio Manager</option>
                  <option value="Senior Quantitative Strategist">Senior Quantitative Strategist</option>
                  <option value="Compliance & Audit Lead">Compliance & Audit Lead</option>
                </select>
              </div>

              {/* Phone / Emergency Desk */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Emergency Desk Hotline
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="Enter desk phone..."
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Organization Name */}
            <div style={{ marginTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Institution / Treasury Desk Entity
              </label>
              <div style={{ position: 'relative' }}>
                <Building size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={userOrg}
                  onChange={(e) => setUserOrg(e.target.value)}
                  placeholder="Enter institution name..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Real-Time Stock Market API Key & Provider Configuration (Preserved & Hidden from UI) */}
          <div style={{ display: 'none', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', boxShadow: '0 4px 20px rgba(15,23,42,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Key size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    Real-Time Stock Market API Key Options
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                    Select from verified official institutional market data API gateways (NSE / BSE / RBI Feeds)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={13} color="#10B981" />
                  <span>OFFICIAL VERIFIED GATEWAYS ONLY</span>
                </span>
              </div>
            </div>

            {/* Provider Selector Cards (Given Options Only) */}
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', margin: '1rem 0 0.5rem 0' }}>
              Choose from Given Official API Providers:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              
              {/* Option 1: Twelve Data */}
              <div
                onClick={() => handleSelectProvider('twelvedata')}
                style={{
                  padding: '0.95rem',
                  borderRadius: '12px',
                  border: apiProvider === 'twelvedata' ? '2px solid #10B981' : '1px solid #E2E8F0',
                  background: apiProvider === 'twelvedata' ? 'rgba(16, 185, 129, 0.06)' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: apiProvider === 'twelvedata' ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>Twelve Data</span>
                  <span style={{ background: '#10B981', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>RECOMMENDED</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                  Direct institutional feed for Indian NSE stocks (RELIANCE, TCS, HDFC)
                </div>
                {apiProvider === 'twelvedata' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontSize: '0.7rem', fontWeight: 800, marginTop: '6px' }}>
                    <CheckCircle size={12} />
                    <span>Selected & Active</span>
                  </div>
                )}
              </div>

              {/* Option 2: Alpha Vantage */}
              <div
                onClick={() => handleSelectProvider('alphavantage')}
                style={{
                  padding: '0.95rem',
                  borderRadius: '12px',
                  border: apiProvider === 'alphavantage' ? '2px solid #10B981' : '1px solid #E2E8F0',
                  background: apiProvider === 'alphavantage' ? 'rgba(16, 185, 129, 0.06)' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: apiProvider === 'alphavantage' ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>Alpha Vantage</span>
                  <span style={{ background: '#3B82F6', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>PRO TIER</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                  Global quotes and BSE Indian benchmark data
                </div>
                {apiProvider === 'alphavantage' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontSize: '0.7rem', fontWeight: 800, marginTop: '6px' }}>
                    <CheckCircle size={12} />
                    <span>Selected & Active</span>
                  </div>
                )}
              </div>

              {/* Option 3: Finnhub */}
              <div
                onClick={() => handleSelectProvider('finnhub')}
                style={{
                  padding: '0.95rem',
                  borderRadius: '12px',
                  border: apiProvider === 'finnhub' ? '2px solid #10B981' : '1px solid #E2E8F0',
                  background: apiProvider === 'finnhub' ? 'rgba(16, 185, 129, 0.06)' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: apiProvider === 'finnhub' ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>Finnhub.io</span>
                  <span style={{ background: '#8B5CF6', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>LOW LATENCY</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                  Ultra-low latency institutional trading telemetry stream
                </div>
                {apiProvider === 'finnhub' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontSize: '0.7rem', fontWeight: 800, marginTop: '6px' }}>
                    <CheckCircle size={12} />
                    <span>Selected & Active</span>
                  </div>
                )}
              </div>

              {/* Option 4: NSE Direct Gateway */}
              <div
                onClick={() => handleSelectProvider('nse_direct')}
                style={{
                  padding: '0.95rem',
                  borderRadius: '12px',
                  border: apiProvider === 'nse_direct' ? '2px solid #10B981' : '1px solid #E2E8F0',
                  background: apiProvider === 'nse_direct' ? 'rgba(16, 185, 129, 0.06)' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: apiProvider === 'nse_direct' ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>NSE Direct Gateway</span>
                  <span style={{ background: '#FF5B37', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>HIGH-FREQ</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                  Real-time sovereign debt & live NSE orderbook ticks
                </div>
                {apiProvider === 'nse_direct' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontSize: '0.7rem', fontWeight: 800, marginTop: '6px' }}>
                    <CheckCircle size={12} />
                    <span>Selected & Active</span>
                  </div>
                )}
              </div>

            </div>

            {/* Official Verified API Key Display (Read-Only / Protected) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} color="#16A34A" />
                  <span>Official Verified Institutional API Key (Pre-Configured & Locked)</span>
                </label>
                <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 700, background: '#F0FDF4', padding: '2px 8px', borderRadius: '4px' }}>
                  ● OFFICIAL KEY LOADED
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Key size={15} color="#16A34A" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    title="This official institutional API key is pre-configured and verified for this option."
                    style={{
                      width: '100%',
                      padding: '0.7rem 2.4rem 0.7rem 2.25rem',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      outline: 'none',
                      cursor: 'default',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    title={showApiKey ? 'Hide Key' : 'Reveal Official Key'}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Test Connection Button */}
                <button
                  type="button"
                  onClick={handleTestApiConnection}
                  disabled={isTestingApi}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.7rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: isTestingApi ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    opacity: isTestingApi ? 0.7 : 1,
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)'
                  }}
                >
                  <RefreshCw size={14} className={isTestingApi ? 'spin-anim' : ''} />
                  <span>{isTestingApi ? 'Testing Ping...' : 'Test Connection'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                <span style={{ fontSize: '0.74rem', color: '#15803D', fontWeight: 600 }}>
                  ✓ Official institutional API key is verified and active. Only the given official options can be used.
                </span>
              </div>
            </div>

            {/* Test Connection Result Toast */}
            {apiTestResult && (
              <div
                style={{
                  marginTop: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: apiTestResult.success ? '#F0FDF4' : '#FEF2F2',
                  border: `1px solid ${apiTestResult.success ? '#BBF7D0' : '#FECACA'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: apiTestResult.success ? '#15803D' : '#991B1B',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                {apiTestResult.success ? (
                  <CheckCircle2 size={18} color="#16A34A" />
                ) : (
                  <AlertTriangle size={18} color="#DC2626" />
                )}
                <div style={{ flex: 1 }}>
                  <div>{apiTestResult.message}</div>
                  {apiTestResult.latencyMs > 0 && (
                    <div style={{ fontSize: '0.72rem', opacity: 0.85, marginTop: '2px' }}>
                      Round-trip response latency: {apiTestResult.latencyMs}ms
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Market Currency & Numeration Units */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', boxShadow: '0 4px 20px rgba(15,23,42,0.02)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
              Market Currency & Numeration Standard
            </h2>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.78rem', color: '#64748B' }}>
              Selected standard applies across balance sheets, live NSE feeds, and 5-year compounding models.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {/* Option 1: Indian Rupee (Active) */}
              <div
                onClick={() => setCurrencyStandard('INR')}
                style={{
                  padding: '1.1rem',
                  borderRadius: '14px',
                  border: currencyStandard === 'INR' ? '2px solid #FF5B37' : '1px solid #E2E8F0',
                  background: currencyStandard === 'INR' ? 'rgba(255, 91, 55, 0.05)' : '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#0F172A' }}>₹ INR (Indian Rupee)</span>
                    <span style={{ background: '#FF5B37', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800 }}>PRIMARY</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                    Formatted in Crores (₹ Cr), Lakhs (₹ L), and NSE Rupee values.
                  </div>
                </div>
                {currencyStandard === 'INR' && <Check size={20} color="#FF5B37" strokeWidth={3} />}
              </div>

              {/* Option 2: USD */}
              <div
                style={{
                  padding: '1.1rem',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: 0.65,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>$ USD (US Dollar)</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                    Formatted in Millions ($M) and Billions ($B).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Autonomous Safeguards & Alert Automation */}
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '1.75rem', boxShadow: '0 4px 20px rgba(15,23,42,0.02)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
              Automated Risk Safeguard Preferences
            </h2>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.78rem', color: '#64748B' }}>
              Configure autonomous response triggers for threshold violations and sudden market shocks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Toggle 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>
                    Autonomous Flight-to-Safety Sweep
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    Automatically reallocates 85% of capital into 91-Day RBI T-Bills when Risk Score &gt; 75.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoFlightToSafety}
                  onChange={(e) => setAutoFlightToSafety(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: '#10B981', cursor: 'pointer' }}
                />
              </div>

              {/* Toggle 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>
                    Real-Time Telemetry Breach Banners
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    Show sticky Red Alert Banner whenever single-asset concentration exceeds 40% cap.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={telemetryAlerts}
                  onChange={(e) => setTelemetryAlerts(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: '#FF5B37', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Action Save Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '1.25rem 1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(15,23,42,0.03)' }}>
            <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
              All user profile data and Market API provider options are stored locally in your browser's persistent storage.
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #FF5B37 0%, #E04826 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(255, 91, 55, 0.25)',
              }}
            >
              <Save size={16} />
              <span>Save Profile & API Settings</span>
            </button>
          </div>

        </form>

      </main>
    </div>
  );
}
