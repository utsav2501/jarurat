import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageComponent from './Messages';
import SubscriptionPlans from './SubscriptionPlan';
import BoostJobComponent from './BoostJob';
import Loader from "./Loader";


const WorkerList = ({workerId, userId}) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch workers from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/workers/")
      .then((response) => {
        setWorkers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load workers. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <>
    
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Workers</h2>

      {/* Error Handling */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading State */}
      {loading ? (
        // <div className="text-center">
        //   <div className="spinner-border text-primary" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        // </div>
        <Loader/>
      ) : (
        <div className="row">
          {workers.map((worker) => (
            <div className="col-md-4 mb-4" key={worker.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{worker.name}</h5>
                  <p className="card-text">
                    <strong>Skills:</strong> {worker.skills}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {worker.location}
                  </p>
                  <button className="btn btn-primary btn-sm">
                    Contact Worker
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default WorkerList;
