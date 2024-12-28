import React, { useState } from 'react';
import axios from 'axios';

const BoostJobComponent = ({ jobId }) => {
    const [boosted, setBoosted] = useState(false);

    const handleBoost = () => {
        // Send a request to boost the job listing
        axios.post(`/api/boost-job/${jobId}/`)
            .then(response => {
                setBoosted(true);
                alert('Job has been boosted!');
            })
            .catch(error => {
                console.error('Error boosting the job', error);
                alert('Failed to boost job');
            });
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <button 
                className={`btn ${boosted ? 'btn-success' : 'btn-warning'} btn-lg`} 
                onClick={handleBoost} 
                disabled={boosted}
            >
                {boosted ? 'Job Boosted' : 'Boost Job'}
            </button>
        </div>
    );
};

export default BoostJobComponent;
