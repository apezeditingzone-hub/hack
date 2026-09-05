import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import InputField from '../common/InputField';
import { loginUser, registerUser, requestPasswordReset } from '../../services/authService';

export default function LoginForm() {
  const navigate = useNavigate();

  // Mode: 'login' | 'signup' | 'forgot'
  const [mode, setMode] = useState('login');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetFormState = () => {
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
  };

  const handleSwitchMode = (newMode) => {
    resetFormState();
    setMode(newMode);
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'signup') {
      if (!name.trim()) {
        newErrors.name = 'Full name is required.';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (mode !== 'forgot') {
      if (!password) {
        newErrors.password = 'Password is required.';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }

      if (mode === 'signup') {
        if (!confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password.';
        } else if (password !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match.';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFormState();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        await loginUser(email, password);
        navigate('/dashboard');
      } else if (mode === 'signup') {
        await registerUser({ name, email, password });
        navigate('/dashboard');
      } else if (mode === 'forgot') {
        const res = await requestPasswordReset(email);
        setSuccessMessage(res.message);
      }
    } catch (err) {
      setGeneralError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      {/* Auth Tabs */}
      {mode !== 'forgot' && (
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('login')}
            role="tab"
            aria-selected={mode === 'login'}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => handleSwitchMode('signup')}
            role="tab"
            aria-selected={mode === 'signup'}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Header Titles */}
      <div className="card-header">
        {mode === 'login' && (
          <>
            <h2>Welcome Back</h2>
            <p>Sign in to your FinOpt dashboard</p>
          </>
        )}
        {mode === 'signup' && (
          <>
            <h2>Create Account</h2>
            <p>Get started with intelligent capital management</p>
          </>
        )}
        {mode === 'forgot' && (
          <>
            <h2>Reset Password</h2>
            <p>Enter your email address to receive password reset instructions</p>
          </>
        )}
      </div>

      {/* General Error Alert */}
      {generalError && (
        <div className="alert-box alert-error" role="alert">
          <AlertCircle className="alert-icon" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div className="alert-box alert-success" role="alert">
          <CheckCircle2 className="alert-icon" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name field (Sign Up mode) */}
        {mode === 'signup' && (
          <InputField
            id="name-input"
            name="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="Enter your full name"
            icon={User}
            error={errors.name}
            autoComplete="name"
            required
          />
        )}

        {/* Email field */}
        <InputField
          id="email-input"
          name="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          placeholder="Enter your email"
          icon={Mail}
          error={errors.email}
          autoComplete="email"
          required
        />

        {/* Password field */}
        {mode !== 'forgot' && (
          <InputField
            id="password-input"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            placeholder="Enter your password"
            icon={Lock}
            error={errors.password}
            isPasswordToggleable
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            required
          />
        )}

        {/* Confirm Password field (Sign Up mode) */}
        {mode === 'signup' && (
          <InputField
            id="confirm-password-input"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            placeholder="Confirm your password"
            icon={Lock}
            error={errors.confirmPassword}
            isPasswordToggleable
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            autoComplete="new-password"
            required
          />
        )}

        {/* Remember me & Forgot Password link */}
        {mode === 'login' && (
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-link-btn"
              onClick={() => handleSwitchMode('forgot')}
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
          aria-busy={isLoading}
          style={{ marginTop: mode === 'signup' ? '0.5rem' : '0' }}
        >
          {isLoading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>
                {mode === 'login'
                  ? 'Signing In...'
                  : mode === 'signup'
                  ? 'Creating Account...'
                  : 'Sending...'}
              </span>
            </>
          ) : (
            <span>
              {mode === 'login'
                ? 'Sign In'
                : mode === 'signup'
                ? 'Create Account'
                : 'Send Reset Link'}
            </span>
          )}
        </button>
      </form>

      {/* Mode Navigation Footers */}
      <div className="switch-mode-box">
        {mode === 'login' && (
          <p>
            Don't have an account?
            <button
              type="button"
              className="switch-mode-btn"
              onClick={() => handleSwitchMode('signup')}
            >
              Sign Up
            </button>
          </p>
        )}

        {mode === 'signup' && (
          <p>
            Already have an account?
            <button
              type="button"
              className="switch-mode-btn"
              onClick={() => handleSwitchMode('login')}
            >
              Sign In
            </button>
          </p>
        )}

        {mode === 'forgot' && (
          <button
            type="button"
            className="switch-mode-btn"
            onClick={() => handleSwitchMode('login')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
