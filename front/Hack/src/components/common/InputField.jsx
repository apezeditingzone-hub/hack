import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  isPasswordToggleable = false,
  showPassword = false,
  onTogglePassword,
  autoComplete,
  required = false,
}) {
  const inputId = id || `input-${name}`;
  const errorId = `${inputId}-error`;

  const inputType = isPasswordToggleable ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>{label}</span>
        </label>
      )}
      <div className="input-container">
        {Icon && <Icon className="input-icon" size={18} aria-hidden="true" />}
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          required={required}
          className={`form-input ${isPasswordToggleable ? 'has-right-btn' : ''} ${
            error ? 'input-error' : ''
          }`}
        />
        {isPasswordToggleable && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <div id={errorId} className="error-hint" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
