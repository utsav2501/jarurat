import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';




const Signin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signin/', formData);
      localStorage.setItem('token', response.data.token);
      toast('Signin successful! Welcome back.');
      console.log('login successfully');
      navigate('/'); 
      
      
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    axios.post('http://localhost:8000/api/google-login/', { token: credentialResponse.credential })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch(error => console.error('Google login failed:', error));
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/signup" className='text-decoration-none'>Create Now</a></p>
      <GoogleOAuthProvider clientId="756444366733-qpto08a8r9cpd0gf1vvhsdr6droka55a.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Login Failed')} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Signin;
