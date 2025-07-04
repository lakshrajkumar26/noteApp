import { useAuth0 } from '@auth0/auth0-react';
import background from '../assets/Background.jpg';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Login.css';

const Signin = () => {
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    otp: '',
    remember: false
  });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can verify OTP (via backend) and then:
    // If success:
    console.log('Form login success → Redirecting...');
    navigate('/dashboard');
  };

  return (
    <div className="signin-fullscreen">
      <div className="signin-left">
        <div className="signin-content">
          <h2>Sign in</h2>
          <p className="subtitle">Please login to continue to your account.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

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
              <a href="#">Resend OTP</a>
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
