import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5); // Adjust to change jobs per page
  const [sortOption, setSortOption] = useState("default"); // Sorting option
  const [bookmarkedJobs, setBookmarkedJobs] = useState(
    JSON.parse(localStorage.getItem("bookmarkedJobs")) || []
  );


  //applyfor job
  const handleApplyJob = async (jobId) => {
    try {
      // Get the token from local storage or context (assuming the user is authenticated)
      const token = localStorage.getItem('token');  

      if (!token) {
        alert("Please sign in to apply for jobs.");
        return;
      }

      // Send a POST request to the backend endpoint to apply for the job
      const response = await axios.post(
        `/api/jobs/${jobId}/apply/`,
        {},  // No body required unless you want to send extra data
        {
          headers: {
            'Authorization': `Bearer ${token}`,  // Include JWT token for authentication
            'Content-Type': 'application/json'
          }
        }
      );

      // Notify the user upon successful application
      alert(response.data.message || 'Successfully applied for the job!');
    } catch (error) {
      // Handle errors (e.g., if the user has already applied or network issues)
      console.error('Error applying for job:', error);
      alert(error.response?.data?.error || 'Failed to apply for the job. Please try again.');
    }
  };

  // Fetch jobs from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jobs/")
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load jobs. Please try again.");
        setLoading(false);
      });
  }, []);

  // Handle search by title or location
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        job.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle sorting
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sortedJobs = [...filteredJobs];

    if (option === "budget-asc") {
      sortedJobs.sort((a, b) => parseFloat(a.budget) - parseFloat(b.budget));
    } else if (option === "budget-desc") {
      sortedJobs.sort((a, b) => parseFloat(b.budget) - parseFloat(a.budget));
    } else if (option === "location") {
      sortedJobs.sort((a, b) => a.location.localeCompare(b.location));
    }

    setFilteredJobs(sortedJobs);
  };

  // Handle bookmarking
  const toggleBookmark = (jobId) => {
    let updatedBookmarks = [...bookmarkedJobs];

    if (updatedBookmarks.includes(jobId)) {
      updatedBookmarks = updatedBookmarks.filter((id) => id !== jobId);
    } else {
      console.log("bookmarked")
      updatedBookmarks.push(jobId);
    }

    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Jobs</h2>

      {/* Error Handling */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search and Sorting */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs by title or location..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={sortOption}
            onChange={handleSort}
          >
            <option value="default">Sort by</option>
            <option value="budget-asc">Budget (Low to High)</option>
            <option value="budget-desc">Budget (High to Low)</option>
            <option value="location">Location</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <Loader/>
      ) : (
        <>
          {/* Job Cards */}
          <div className="row">
            {currentJobs.map((job) => (
              <div className="col-md-6 mb-4" key={job.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      {job.title}{" "}
                      <button
                        className={`btn btn-sm ${
                          bookmarkedJobs.includes(job.id)
                            ? "btn-warning"
                            : "btn-outline-warning"
                        } float-end`}
                        onClick={() => toggleBookmark(job.id)}
                      >
                        <i
                          className={`fa${
                            bookmarkedJobs.includes(job.id) ? "s" : "r"
                          } fa-star`}
                        ></i>
                      </button>
                    </h5>
                    <p className="card-text">
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p className="card-text">
                      <strong>Budget:</strong> ${job.budget}
                    </p>
                    <p className="card-text">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <button className="btn btn-primary btn-sm" onClick={() => handleApplyJob(job.id)}>
                      Apply for Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from(
                { length: Math.ceil(filteredJobs.length / jobsPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default JobList;
