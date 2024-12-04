import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // Custom CSS for styling

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/signup/', formData);
      toast.success('Signup successful! Please sign in.');
      console.log('signup successfully');
      navigate('/signin');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    axios.post('http://localhost:8000/api/google-login/', { token: credentialResponse.credential })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch(error => console.error('Google login failed:', error));
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/signin" className='text-decoration-none'>Login</a></p>
      <GoogleOAuthProvider clientId="756444366733-qpto08a8r9cpd0gf1vvhsdr6droka55a.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Login Failed')} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Signup;
