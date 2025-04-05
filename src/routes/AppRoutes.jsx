import React, { useState, useEffect } from 'react';
import { Navbar, Main, Cabinet, Register } from '../components/';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  // Функция для проверки и установки состояния аутентификации
  const checkAuthentication = () => {
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
  };

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
    checkAuthentication();
  }, []);

  // Обновляем состояние при изменении localStorage (опционально)
  useEffect(() => {
    window.addEventListener('storage', checkAuthentication);
    return () => window.removeEventListener('storage', checkAuthentication);
  }, []);

  if (isAuthenticated === null) return <div>Загрузка...</div>; // Показываем индикатор загрузки

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
      <div
        className={`routes__container ${!sidebarOpen || isMobile ? 'sidebar-closed' : ''}`}
        style={{ padding: location.pathname === '/cabinet' ? '0px' : '10px' }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/cabinet"
            element={
              isAuthenticated ? (
                <Cabinet setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/cabinet" />
              ) : (
                <Register setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;