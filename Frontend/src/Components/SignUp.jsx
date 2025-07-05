import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/Background.jpg'
import authApi from '../api/authApi';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    email: '',
    otp: ''
  });
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!showOtp) {
      try {
        const response = await authApi.register({
          name: form.name,
          dob: form.dob,
          email: form.email,
          isVerified: false,
          googleId: "NAN"
        });
        
        setMessage(response.data.message);
        setShowOtp(true);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Registration failed');
      }
    } else {
      try {
        const response = await authApi.verifyOtp(form.email, form.otp);
        
        setMessage(response.data.message);
        navigate('/');
      } catch (error) {
        setMessage(error.response?.data?.message || 'OTP verification failed');
      }
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
    <>
 <div className="signup-container">
  <div className="left-section">
    <div className="logo">Icon HD</div>
    <form className="form-wrapper" onSubmit={handleSignup}>
      <h2>Sign up</h2>
      <p className="subtitle">Sign up to enjoy the feature of HD</p>

      {message && <p style={{color: message.includes('success') ? 'green' : 'red'}}>{message}</p>}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        disabled={showOtp}
      />

      <input
        type="text"
        name="dob"
        placeholder="Date of Birth"
        value={form.dob}
        onChange={handleChange}
        disabled={showOtp}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        disabled={showOtp}
      />

      {showOtp && (
        <>
          <div className="otp-wrapper">
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={form.otp}
              onChange={handleChange}
            />
            <span className="eye-icon">Icon</span>
          </div>
          
          <button type="button" onClick={handleResendOtp} style={{marginBottom: '10px'}}>
            Resend OTP
          </button>
        </>
      )}

      <button type="submit">{showOtp ? 'Verify OTP' : 'Sign up'}</button>

      <p className="bottom-text">
        Already have an account?? <Link to="/">Sign in</Link>
      </p>
    </form>
  </div>

  <div className="right-section" style={{ backgroundImage: `url(${bgImage})` }}></div>
</div>

  </>
  );
};

export default Signup;
