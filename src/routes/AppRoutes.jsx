import React, { useState, useEffect } from 'react';
import { Navbar, Main, Cabinet, Register } from '../components/';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.id) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) return null; // или <Loading />

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
      <div
        className={`routes__container ${!sidebarOpen || isMobile ? 'sidebar-closed' : ''}`}
        style={{ padding: location.pathname === "/cabinet" ? "0px" : "10px" }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/cabinet"
            element={isAuthenticated ? <Cabinet /> : <Navigate to="/register" />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/cabinet" /> : <Register />}
          />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
