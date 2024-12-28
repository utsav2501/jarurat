import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WorkerList from './components/WorkerList';
import JobList from './components/JobList';
import WorkerRecommendation from './components/WorkerRecommendation';
import MessageComponent from './components/Messages';
import VideoCallComponent from './components/videoCallComponent';
import JobManagement from './components/JobManagement';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import Navbar from './components/navbar';
import Service from './components/Service';
import Signup from './components/SignUp';
import Signin from './components/Signin';
import Logout from './components/Logout';
import PostJob from './components/Postjob';
import WorkerProfile from './components/WorkerProfile';
import ApplyForJob from './components/ApplyForJob';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<WorkerList />} />
        <Route path="/workers-profile" element={<WorkerProfile />} />
        <Route path='/service' element={<Service/>}/>
        <Route path="/jobs" element={<JobList />} />
        <Route path="/workers-recommend" element={<WorkerRecommendation />} />
        <Route path="/message" element={<MessageComponent />} />
        <Route path="/videocall" element={<VideoCallComponent />} />
        <Route path="/job-management" element={<JobManagement />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/applyjob" element={<ApplyForJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
