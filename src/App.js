import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import EmployerPortal from './pages/EmployerPortal';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';

import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("Roosvelt Recruit");

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student-portal" element={<StudentPortal />} /> 
            <Route path="/employer-portal" element={<EmployerPortal />} /> 
            <Route path="/admin-portal" element={<AdminPortal />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
