import { useAuth0 } from '@auth0/auth0-react';
import background from '../assets/Background.jpg';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Login.css';
import authApi from '../api/authApi';

const Signin = () => {
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    otp: '',
    remember: false
  });
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!form.email) {
      setMessage('Please enter your email');
      return;
    }

    try {
      const response = await authApi.resendOtp(form.email);
      setMessage(response.data.message);
      setShowOtp(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showOtp) {
      handleSendOtp(e);
      return;
    }

    try {
      const response = await authApi.login(form.email, form.otp);
      
      setMessage(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await authApi.resendOtp(form.email);
      
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="signin-fullscreen">
      <div className="signin-left">
        <div className="signin-content">
          <h2>Sign in</h2>
          <p className="subtitle">Please login to continue to your account.</p>

          {message && <p style={{color: message.includes('Success') || message.includes('success') ? 'green' : 'red'}}>{message}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={showOtp}
            />

            {!showOtp && (
              <button type="submit" className="signin-btn">Send OTP</button>
            )}

            {showOtp && (
              <>
                <div className="otp-wrapper">
                  <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={form.otp}
                    onChange={handleChange}
                    required
                  />
                  <span className="eye-icon">👁️</span>
                </div>

                <div className="resend-row">
                  <a href="#" onClick={handleResendOtp}>Resend OTP</a>
                </div>

                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember">Keep me logged in</label>
                </div>

                <button type="submit" className="signin-btn">Sign in</button>
              </>
            )}

            <div className="bottom-text">
              <p>Need an account? <a href="/signup">Create one</a></p>

              {/* Conditionally show Google login only if not already authenticated */}
              {!isAuthenticated && (
                <div className="google-login">
                  <button onClick={() => loginWithRedirect()}>
                    Login with Google
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="signin-right">
        <img src={background} alt="Design" />
      </div>
    </div>
  );
};

export default Signin;
