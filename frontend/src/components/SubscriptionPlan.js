import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionPlans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        // Fetch available subscription plans
        axios.get('/api/subscription-plans/')
            .then(response => setPlans(response.data))
            .catch(error => console.error('Error fetching subscription plans', error));
    }, []);

    const handleSubscribe = (planId) => {
        // Handle subscription to a plan
        axios.post(`/api/subscribe/${planId}/`)
            .then(response => {
                alert('Subscription successful!');
            })
            .catch(error => {
                console.error('Subscription failed', error);
                alert('Subscription failed');
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Available Subscription Plans</h2>
            <div className="row">
                {plans.map((plan) => (
                    <div className="col-md-4 mb-4" key={plan.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{plan.name}</h5>
                                <p className="card-text">{plan.description}</p>
                                <p className="card-text"><strong>Price: ${plan.price}</strong></p>
                                <p className="card-text">Duration: {plan.duration_days} days</p>
                                <button 
                                    className="btn btn-primary w-100" 
                                    onClick={() => handleSubscribe(plan.id)}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPlans;
