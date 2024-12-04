// ApplyForJob.js

import React, { useState } from 'react';
import axios from 'axios';

const ApplyForJob = ({ jobId }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve user token for auth
    try {
      await axios.post(
        `/api/jobs/${jobId}/apply/`,
        { cover_letter: coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Application submitted successfully!');
    } catch (error) {
      setMessage('Error applying for the job. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="apply-job-container">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />
        <button type="submit">Apply</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyForJob;
