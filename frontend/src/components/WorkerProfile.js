// src/components/PostJob.js
import React, { useState } from 'react';
import axios from 'axios';

const WorkerProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    location: '',
    profile_picture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  // Retrieve the token

    if (!token) {
      alert('Please sign in to create a profile.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/workers/', formData, {
        headers: {
          Authorization: `Bearer ${token}`  // Include the token in the headers
        }
      });
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error creating a job:', error);
      alert('Failed to create a job.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a profile for worker</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input className="form-control" name="skills" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" name="location" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Profile picture</label>
          <input type="text" className="form-control" name="profile_picture" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>
    </div>
  );
};

export default WorkerProfile;
