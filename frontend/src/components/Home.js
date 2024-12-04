import React from "react";
import { Link } from "react-router-dom";
import CarouselComponent from "./Carousel";
import './home.css';


const Home = () => (
  <>
  
  <div className="container mt-5">
    {/* Hero Section */}
    <div className="text-center py-5 bg-light rounded shadow">
      {/* <h1 className="display-4">Welcome to Jarurat.Com</h1> */}
      <div className="typeheading">
        <div className="typewriter">
          <h1 >Welcome to Jarurat.Com</h1>
        </div>
      </div>
      <p className="lead">
        Connecting skilled workers with those who need them. Find the right fit for your job or showcase your skills to a wide audience.
      </p>
      <Link to="/workers" className="btn btn-primary btn-lg mx-2">
        Find Workers
      </Link>
      <Link to="/postjob" className="btn btn-outline-secondary btn-lg mx-2">
        Post a Job
      </Link>
    </div>
    
    <div className="mt-5 mb-1" >
    <CarouselComponent/>
    </div>
    {/* Features Section */}
    <div className="mt-5">
      <h2 className="text-center mb-4">Why Choose Us?</h2>
      <div className="row">
        <div className="col-md-4 text-center">
          <i className="fas fa-users fa-3x text-primary mb-3"></i>
          <h4>Wide Network</h4>
          <p>Access a large pool of verified and skilled workers.</p>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-handshake fa-3x text-success mb-3"></i>
          <h4>Trustworthy Connections</h4>
          <p>Transparent reviews and ratings for better decisions.</p>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-cogs fa-3x text-warning mb-3"></i>
          <h4>Easy to Use</h4>
          <p>Simple and intuitive platform for seamless job matching.</p>
        </div>
      </div>
    </div>

    {/* Call to Action Section */}
    <div className="text-center py-5 bg-primary text-white mt-5 rounded">
      <h3>Ready to Get Started?</h3>
      <p>Join our platform today and make your life easier.</p>
      <Link to="/signup" className="btn btn-light btn-lg">
        Sign Up Now
      </Link>
      <Link to="/workers-profile" className="btn text-white btn-lg m-3 bg-primary btn-outline-dark">
        Create Profile
      </Link>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
      <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

  </>
);

export default Home;
