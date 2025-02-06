
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Components
import Navbar from './Components/Navbar';
import AdminLogin from './Components/Login';
import AdminRegister from './Components/SignupAdmin';
import AdminProfile from './Components/Adminprofile.jsx';
import LandingPage from './Components/HomePage';
import AllUsers from './Components/UsersData';
import AllCompanies from './Components/CompaniesData';
import AllJobs from './Components/AllJobs';
import React, { useState } from 'react';

const App = () => {
   const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Admin Authentication */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />

                {/* Admin Features */}
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/users" element={<AllUsers />} />
                <Route path="/admin/companies" element={<AllCompanies />} />
                <Route path="/admin/jobs" element={<AllJobs />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
