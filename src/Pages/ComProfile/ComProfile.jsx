import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ComProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ComProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null); // State to store company details

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

      axios
        .get(`http://localhost:8080/student/username/${username}/jobs`)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
        });

      // Fetch company details for the logged-in user
      axios
        .get(`http://localhost:8080/company/${username}`)
        .then((response) => {
          setCompany(response.data);
        })
        .catch((error) => {
          console.error('Error fetching company details:', error);
        });

    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/com-login');
  };

  const scrollToSection = (e) => {
    const targetId = e.target.dataset.bsTarget;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="title">
        <h2>
          {user && (
            <div>
              <h2>Welcome, {user.companyName}</h2>
            </div>
          )}
        </h2>
      </div>


      <div className="sidenav">
        <div className='buttons'>
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
          <Link to="/com-profile" >
            <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Profile</button><br />
            </Link>
            <Link to="/postjob" >
            <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Post a Job</button><br />
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary b" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button>
            </Link>
            <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Candidates</button>
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
        <h2>Personal Details</h2>
        <div className="card">
          <div className="card-body">
          <table>
            <tbody>
              <tr>
                <td><b>First Name</b></td>
                <td><b>:</b></td>
                <td>
                  {user && (
                    <div>
                      {user.firstName}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Last Name</b></td>
                <td><b>:</b></td>
                <td>
                  {user && (
                    <div>
                      {user.lastName}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Email</b></td>
                <td><b>:</b></td>
                <td>
                  {user && (
                    <div>
                      {user.email}
                    </div>
                  )}
                </td>
              </tr>
              {/* Add other user details here */}
            </tbody>
          </table>
          </div>
        </div>

        <h2>COMPANY DETAILS</h2>
        <div className="card">
          <div className="card-body">
          <table>
  <tbody>
    {company && (
      <React.Fragment>
        <tr>
          <td><b>Company Name</b></td>
          <td><b>:</b></td>
          <td>{company.companyName}</td>
        </tr>
        <tr>
          <td><b>Industry</b></td>
          <td><b>:</b></td>
          <td>{company.industry}</td>
        </tr>
        <tr>
          <td><b>Website</b></td>
          <td><b>:</b></td>
          <td>{company.website}</td>
        </tr>
        <tr>
          <td><b>Phone Number</b></td>
          <td><b>:</b></td>
          <td>{company.phoneNumber}</td>
        </tr>
        <tr>
          <td><b>Description</b></td>
          <td><b>:</b></td>
          <td>{company.description}</td>
        </tr>
        {/* Render other company details in a similar manner */}
      </React.Fragment>
    )}
  </tbody>
</table>

          </div>
        </div>

        {/* Jobs section remains the same */}
      </div>
    </div>
  );
}

export default ComProfile;
