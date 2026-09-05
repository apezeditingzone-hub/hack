import React from 'react';
import LeftBranding from '../components/login/LeftBranding';
import LoginForm from '../components/login/LoginForm';
import '../styles/login.css';

export default function LoginPage() {
  return (
    <main className="login-container">
      <div className="login-wrapper">
        <LeftBranding />
        <section className="form-section" aria-label="Sign in section">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
