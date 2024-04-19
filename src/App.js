
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Navbar from './Component/Navbar';
import Job from './Pages/Job/Job';
import CVUpload from './Pages/CVUpload/CVUpload';
import ChatBot from './Pages/Chatbot/Chatbot';
import Footer from './Component/Footer';
import CreateAccount from './Pages/Registration/CreateAccount';
import Profile from './Pages/Profile/Profile';
import CompanyRegistration from './Pages/ComRegistration/CreateAccount';
import ComLogin from './Pages/ComLogin/ComLogin';
import ComProfile from './Pages/ComProfile/ComProfile';
import Postjob from './Pages/ComProfile/Postjob';
import Candidates from './Pages/ComProfile/Canditade';





function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    {/* Place Login component in the middle of the page */}
                    <Route
                        path="/login"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Login />
                            </div>
                        }
                    />
                    <Route
                        path="/Reg"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <CreateAccount/>
                            </div>
                        }
                    />
                      <Route
                        path="/post-job"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <CompanyRegistration/>
                            </div>
                        }
                    />
                    <Route
                        path="/com-login"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <ComLogin/>
                            </div>
                        }
                    />
        
                    {/* Include navbar and footer on all other pages */}
                    <Route
                        path="/*"
                        element={
                            <>
                                <Navbar/>
                                <div style={{ flex: '1' }}>
                                    <Routes>
                                        <Route path="/" element={<Job />} />
                                        <Route path="/profile" element={<Profile/>} />
                                        <Route path="/com-profile" element={<ComProfile/>} />
                                        <Route path="/candidates" element={<Candidates/>} />
                                        <Route path="/CVUpload/:jobTitle" element={<CVUpload />} />
                                        <Route path="/chatbot" element={<ChatBot />} />
                                        <Route path="/postjob" element={<Postjob />} />
                                    </Routes>
                                </div>
                                <Footer/>
                            </>
                        }
                    />
                    
                </Routes>
            </div>
        </Router>
    );

}

export default App;
