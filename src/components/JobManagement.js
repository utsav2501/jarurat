import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({ title: '', description: '', budget: '', location: '' });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jobs/');
            setJobs(response.data);
        } catch (error) {
            console.error('Failed to load jobs', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    const createJob = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/jobs/', newJob, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchJobs();
        } catch (error) {
            console.error('Failed to create job', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Job Management</h2>
            
            <div className="card mb-4">
                <div className="card-header">Create Job</div>
                <div className="card-body">
                    <div className="form-group mb-3">
                        <input type="text" name="title" className="form-control" placeholder="Title" onChange={handleInputChange} />
                    </div>
                    <div className="form-group mb-3">
                        <textarea name="description" className="form-control" placeholder="Description" onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <input type="number" name="budget" className="form-control" placeholder="Budget" onChange={handleInputChange} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="location" className="form-control" placeholder="Location" onChange={handleInputChange} />
                    </div>
                    <button className="btn btn-primary" onClick={createJob}>Create Job</button>
                </div>
            </div>
            
            <div>
                <h3>Available Jobs</h3>
                {jobs.length === 0 ? (
                    <p>No jobs available</p>
                ) : (
                    <div className="row">
                        {jobs.map(job => (
                            <div key={job.id} className="col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">{job.title}</h4>
                                        <p className="card-text">{job.description}</p>
                                        <p><strong>Budget:</strong> ${job.budget}</p>
                                        <p><strong>Location:</strong> {job.location}</p>
                                        <p><strong>Status:</strong> <span className={`badge bg-${getBadgeClass(job.status)}`}>{job.status}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Function to set badge class based on job status
const getBadgeClass = (status) => {
    switch (status) {
        case 'open':
            return 'success';
        case 'in_progress':
            return 'warning';
        case 'completed':
            return 'secondary';
        default:
            return 'primary';
    }
};

export default JobManagement;
