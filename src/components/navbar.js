import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // State to track whether the user is signed in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle logout logic
  const handleLogout = () => {
    setIsAuthenticated(false); // Set user as logged out
    // Add your logout logic here (clear tokens, etc.)
  };

  // Handle sign-in logic (for demonstration)
  // const handleSignIn = () => {
  //   setIsAuthenticated(true); // Set user as logged in
  //   // Add your actual sign-in logic here
  // };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar bg-light shadow">
      <div className="logo">Jarurat.com</div>
      <div className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
        <a className="item" href="/">Home</a>
        <a href="/service">Services</a>
        <a href="/jobs">Jobs</a>
        <a href="/workers">Workers</a>
        <a href="/workers-profile">Workers Profie</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        
        <div className="auth-button">
          {!isAuthenticated ? (
            // Signup Button if not authenticated
            <a href="/signup">SignUp</a>
          ) : (
            // User icon and dropdown for logout when authenticated
            <div className="user-menu">
              <div className="user-icon" style={{ cursor: 'pointer' }}>
                👤 {/* Replace with an actual user icon if you have an icon library */}
                <div className="dropdown">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
