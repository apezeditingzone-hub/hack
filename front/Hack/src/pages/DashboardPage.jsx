import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, LogOut, TrendingUp, ShieldAlert, DollarSign, Activity } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../services/authService';

export default function DashboardPage() {
  const navigate = useNavigate();
  const session = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-nav-brand">
          <div className="brand-icon-box" style={{ width: 34, height: 34 }}>
            <Layers size={20} color="#FFFFFF" />
          </div>
          <span>FinOpt Dashboard</span>
        </div>

        <button className="logout-btn" onClick={handleLogout} display="flex">
          <LogOut size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Sign Out
        </button>
      </header>

      <main className="dashboard-content">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Welcome back, {session?.user?.name || 'Administrator'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Logged in as <code style={{ color: 'var(--text-accent)' }}>{session?.user?.email || 'admin@finopt.com'}</code> ({session?.user?.role || 'Portfolio Manager'})
          </p>
        </div>

        <div className="dash-grid">
          <div className="dash-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Assets Under Management</span>
              <DollarSign size={20} color="#60A5FA" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>$142,850,000</div>
            <div style={{ color: '#10B981', fontSize: '0.875rem', marginTop: '0.5rem' }}>+4.2% vs last month</div>
          </div>

          <div className="dash-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Portfolio Sharpe Ratio</span>
              <TrendingUp size={20} color="#10B981" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>2.84</div>
            <div style={{ color: '#10B981', fontSize: '0.875rem', marginTop: '0.5rem' }}>Optimal Risk Efficiency</div>
          </div>

          <div className="dash-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Active Risk Score</span>
              <ShieldAlert size={20} color="#F59E0B" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>Low (14%)</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Within safety thresholds</div>
          </div>

          <div className="dash-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Stress Tests Executed</span>
              <Activity size={20} color="#A855F7" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>1,240</div>
            <div style={{ color: '#60A5FA', fontSize: '0.875rem', marginTop: '0.5rem' }}>Automated daily simulations</div>
          </div>
        </div>
      </main>
    </div>
  );
}
