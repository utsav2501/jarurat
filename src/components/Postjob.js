// src/components/PostJob.js
import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  // Retrieve the token

    if (!token) {
      alert('Please sign in to post a job.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/jobs/', formData, {
        headers: {
          Authorization: `Bearer ${token}`  // Include the token in the headers
        }
      });
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Budget</label>
          <input type="number" className="form-control" name="budget" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" name="location" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
