import React, { useState } from 'react';
import './worker-recommend.css';

const WorkerRecommendation = () => {
    const [filters, setFilters] = useState({
        location: '',
        skill: '',
        budget: '',
        availability: true,
    });
    const [workers, setWorkers] = useState([]);

    const fetchWorkers = async () => {
        const queryParams = new URLSearchParams({
            location: filters.location,
            skill: filters.skill,
            budget: filters.budget,
            availability: filters.availability ? 'true' : 'false',
        });

        try {
            const response = await fetch(`/api/recommend-workers/?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch workers');
            }
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error(error);
            alert('Error fetching workers. Please try again.');
        }
    };

    return (
        <div>
            <h2>Find Recommended Workers</h2>
            <div>
                <label>
                    Location:
                    <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    />
                </label>
                <label>
                    Skill:
                    <input
                        type="text"
                        value={filters.skill}
                        onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                    />
                </label>
                <label>
                    Budget:
                    <input
                        type="number"
                        value={filters.budget}
                        onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                    />
                </label>
                <label>
                    Availability:
                    <input
                        type="checkbox"
                        checked={filters.availability}
                        onChange={(e) => setFilters({ ...filters, availability: e.target.checked })}
                    />
                </label>
                <button onClick={fetchWorkers}>Search</button>
            </div>
            <div>
                <h3>Recommended Workers:</h3>
                <ul>
                    {workers.map((worker) => (
                        <li key={worker.id}>
                            {worker.name} ({worker.skill}) - ${worker.hourly_rate}/hr, {worker.location}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WorkerRecommendation;
