import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiEye, FiEyeOff, FiShield, FiAlertCircle } from 'react-icons/fi';
import { mockAuthService } from '../../config/api';
import './AdminPanel.css';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/admin/dashboard';
  const queryParams = new URLSearchParams(location.search);
  const isExpired = queryParams.get('expired') === 'true';

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await mockAuthService.login(data.passcode, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <style>{`
        .login-page-container {
          min-height: 100vh;
          width: 100vw;
          background: radial-gradient(circle at top right, #091024, #050a17);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: var(--font-body);
        }
        .login-card {
          width: 100%;
          max-width: 440px;
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: 40px;
          background: rgba(13, 24, 49, 0.45);
          backdrop-filter: blur(16px);
          box-shadow: var(--shadow-premium), var(--shadow-gold);
          position: relative;
          overflow: hidden;
        }
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gold-gradient);
        }
        .logo-section {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo-icon {
          font-size: 3rem;
          color: var(--primary-gold);
          filter: drop-shadow(0 0 10px rgba(207, 168, 68, 0.4));
          margin-bottom: 12px;
        }
        .logo-title {
          font-family: var(--font-heading);
          color: var(--white);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .logo-subtitle {
          color: var(--text-secondary);
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .form-group {
          margin-bottom: 20px;
          position: relative;
        }
        .form-label {
          display: block;
          color: var(--text-primary);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          color: var(--text-muted);
          font-size: 1.1rem;
        }
        .login-input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: rgba(5, 10, 23, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: var(--white);
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }
        .login-input:focus {
          outline: none;
          border-color: var(--primary-gold);
          background: rgba(5, 10, 23, 0.9);
          box-shadow: 0 0 10px rgba(207, 168, 68, 0.15);
        }
        .eye-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .eye-toggle:hover {
          color: var(--white);
        }
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ef4444;
          font-size: 0.82rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .expired-message {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary-gold);
          font-size: 0.82rem;
          background: rgba(207, 168, 68, 0.08);
          border: 1px solid rgba(207, 168, 68, 0.2);
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
          }
        }
      `}</style>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo-section">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <FiShield className="logo-icon" />
          </motion.div>
          <h2 className="logo-title">SECURE GATEWAY</h2>
          <p className="logo-subtitle">Advisor Control Panel</p>
        </div>

        {isExpired && (
          <div className="expired-message">
            <FiAlertCircle size={16} />
            <span>Session expired. Please log in again.</span>
          </div>
        )}

        {errorMsg && (
          <div className="error-message">
            <FiAlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">Admin Passcode</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Enter passcode (1234)"
                className="login-input"
                {...register('passcode', { 
                  required: 'Passcode is required',
                  minLength: { value: 4, message: 'Passcode must be 4 digits' }
                })}
              />
            </div>
            {errors.passcode && <span className="field-error">{errors.passcode.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password Override</label>
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Or enter password (admin)"
                className="login-input"
                {...register('password')}
              />
              <button 
                type="button" 
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </div>

          <button type="submit" disabled={isLoading} className="admin-btn admin-btn-primary" style={{ width: '100%' }}>
            {isLoading ? 'Authenticating...' : 'Sign In To Panel'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
