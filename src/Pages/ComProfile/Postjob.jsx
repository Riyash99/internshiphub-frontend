import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ComProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Postjob() {
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/job/post", {
        company: company,
        industry: industry,
        title: title,
        description: description,
        skills: skills,
        location: location
      });
      console.log(response.data);
      alert("Job posted successfully");
      // Reset form fields after successful posting
      setCompany("");
      setIndustry("");
      setTitle("");
      setDescription("");
      setSkills("");
      setLocation("");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting job");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('username');

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
      
       {/* Sidebar navigation */}
      <div className="sidenav">
        <div className='buttons'>
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" >
          <Link to="/com-profile" >
            <button class="btn btn-outline-secondary b" id="v-pills-home-tab" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Profile</button><br />
            </Link>
            <Link to="/postjob" >
            <button class="btn btn-outline-secondary b" id="v-pills-postJob-tab" data-bs-target="#postJob" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Post a Job</button><br /></Link>
            <Link to="/" >
              <button class="btn btn-outline-secondary b" id="v-pills-jobs-tab" data-bs-target="#jobs" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Jobs</button></Link>
              <Link to="/candidates">
              <button className="btn btn-outline-secondary b" data-bs-target="#candidates" type="button" role="tab" aria-controls="v-pills-jobs" aria-selected="false" onClick={scrollToSection}>Candidates</button>
            </Link>
            {/* Other buttons */}

          </div>
        </div>



        <hr align="center" />

        <center>
          <button onClick={handleLogout} type="button" class="btn btn-outline-danger">
            Logout
          </button>
        </center>

      </div>

      <br /><br /><br />

      <div className="main" id='postJob'>

        <h2>Create New Job</h2>
        <div class="card">
          <div class="card-body">
          
          <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="companyInput" class="form-label">Company Name</label>
                <input type="text" class="form-control cl" id="companyInput" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="titleInput" class="form-label">Job Title</label>
                <input type="text" class="form-control cl" id="titleInput" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="industrySelect" class="form-label">Industry</label>
                <select class="form-select cl" id="industrySelect" aria-label="Select Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required>
                  <option selected >Choose the Industry</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Description</label>
                <textarea class="form-control cl" id="descriptionInput" placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="skillsInput" class="form-label">Skills Required</label>
                <input type="text" class="form-control cl" id="skillsInput" placeholder="Skills Required" value={skills} onChange={(e) => setSkills(e.target.value)} required />
              </div>
              <div class="mb-3">
                <label for="locationInput" class="form-label">Location</label>
                <input type="text" class="form-control cl" id="locationInput" placeholder="Job Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
              <button type="submit" class="btn btn-primary">Post Job</button>
            </form>

            
          </div>
        </div>


      
      </div>
    </div>


  );
}

export default Postjob;
