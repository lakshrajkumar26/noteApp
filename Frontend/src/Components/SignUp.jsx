import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/Background.jpg'

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    email: '',
    otp: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Add OTP validation + API call here
    console.log(form);
    navigate('/dashboard');
  };

  return (
    <>
 <div className="signup-container">
  <div className="left-section">
    <div className="logo">Icon HD</div>
    <form className="form-wrapper" onSubmit={handleSignup}>
      <h2>Sign up</h2>
      <p className="subtitle">Sign up to enjoy the feature of HD</p>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="dob"
        placeholder="Date of Birth"
        value={form.dob}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

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

      <button type="submit">Sign up</button>

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
