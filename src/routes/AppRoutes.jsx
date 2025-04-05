// AppRoutes.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Main, Cabinet,Register } from '../components/';

import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />
      <div className={`routes__container ${!sidebarOpen || isMobile ? 'sidebar-closed' : ''}`}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;