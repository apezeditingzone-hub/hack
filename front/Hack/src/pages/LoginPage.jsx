import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LeftBranding from '../components/login/LeftBranding';
import LoginForm from '../components/login/LoginForm';
import '../styles/login.css';

export default function LoginPage({ onBackToHome }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate('/');
    }
  };

  return (
    <main className="login-container" style={{ position: 'relative' }}>
      {/* Top back button */}
      <button 
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#0F172A',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          zIndex: 10
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to CapitalX</span>
      </button>

      <div className="login-wrapper">
        <LeftBranding />
        <section className="form-section" aria-label="Sign in section">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
