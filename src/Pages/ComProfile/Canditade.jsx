import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ComProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Candidates() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [candidateCvs, setCandidateCvs] = useState([]); // State to store candidate CVs
  const [companyJobs, setCompanyJobs] = useState([]); // State to store company jobs

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      axios
        .get(`http://localhost:8080/company/${username}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

      // Fetch candidate CVs for the logged-in company
      axios
        .get(`http://localhost:8080/company/${username}/candidates`)
        .then((response) => {
          setCandidateCvs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching candidate CVs:', error);
        });

      // Fetch company jobs for the logged-in company
      axios
        .get(`http://localhost:8080/company/${username}/jobs`)
        .then((response) => {
          setCompanyJobs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching company jobs:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/com-login');
  };

  const getCvJobTitle = (cvJobTitle) => {
    const companyJob = companyJobs.find(job => job.title === cvJobTitle);
    return companyJob ? companyJob.title : "Unknown";
  };

  return (
    <div>
      <div className="title">
        <h2>
          {user && (
            <div>
              <h2>Candidate Details, {user.companyName}</h2>
            </div>
          )}
        </h2>
      </div>

      <div className="sidenav">
        <div className='buttons'>
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
            <Link to="/com-profile">
              <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Profile</button><br />
            </Link>
            <Link to="/postjob">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false">Post a Job</button><br />
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false">Jobs</button>
            </Link>
            <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false">Candidates</button>
            </Link>
          </div>
        </div>
        <hr align="center" />
        <center>
          <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
        </center>
      </div>

      <br /><br /><br />

      <div className="main" id='home'>
        <h2>{user.companyName}</h2>
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Job Title</th>
                  <th scope="col">Candidate Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Description</th>
                  <th scope="col">CV</th>
                </tr>
              </thead>
              <tbody>
                {candidateCvs.map((cv) => (
                  <tr key={cv.id}>
                    <td>{getCvJobTitle(cv.jobTitle)}</td>
                    <td>{cv.candidateName}</td>
                    <td>{cv.email}</td>
                    <td>{cv.description}</td>
                    <td>
                      <a href={`http://localhost:8080/cv/${cv.id}`} className="btn btn-outline-primary" download>Download CV</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidates;
