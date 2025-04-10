import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Navbar, Main, Cabinet, Register, Ranks, Missions,Target } from '../components/';
import { gsap } from 'gsap';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Military color palette
const colors = {
  armyGreen: '#4B5320',
  camouflage: '#78866B',
  khaki: '#BDB76B',
  black: '#1A1A1A',
  militaryGray: '#5A5A5A',
  accent: '#8B0000',
  white: '#F5F5F5',
};

const CamouflageBackground = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  opacity: 0.05,
  backgroundImage: `
    repeating-linear-gradient(
      45deg,
      ${colors.armyGreen} 0%,
      ${colors.armyGreen} 10%,
      ${colors.camouflage} 10%,
      ${colors.camouflage} 20%,
      ${colors.black} 20%,
      ${colors.black} 30%,
      ${colors.militaryGray} 30%,
      ${colors.militaryGray} 40%
    )
  `,
  backgroundSize: '500px 500px',
});

const MilitaryGrid = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  opacity: 0.05,
  backgroundImage: `
    linear-gradient(${colors.white} 1px, transparent 1px),
    linear-gradient(to right, ${colors.white} 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
});

const AppContainer = styled(Box)(({ isSidebarOpen, isMobile }) => ({
  marginLeft: isSidebarOpen && !isMobile ? '280px' : '0',
  transition: 'margin-left 0.3s ease',
  padding: '20px',
  minHeight: '100vh',
  position: 'relative',
  backgroundAttachment: 'fixed',
  color: colors.white,
}));

const AnimatedDecorations = () => {
  const decorationsRef = useRef(null);

  useEffect(() => {
    if (!decorationsRef.current) return;

    const createElements = () => {
      while (decorationsRef.current.firstChild) {
        decorationsRef.current.removeChild(decorationsRef.current.firstChild);
      }

      // Crosshair (прицелы)
      for (let i = 0; i < 3; i++) {
        const crosshair = document.createElement('div');
        crosshair.className = 'crosshair';
        decorationsRef.current.appendChild(crosshair);
      }

      // Radar blips (точки радара)
      for (let i = 0; i < 5; i++) {
        const blip = document.createElement('div');
        blip.className = 'radar-blip';
        decorationsRef.current.appendChild(blip);
      }

      // Weapon silhouettes (силуэты оружия)
      const weapons = [
        'M16.5 20h-9c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2zM9.5 8v8M14.5 8v8',
        'M2 6h18v4H2zM6 10v8M14 10v8M2 10l4 8M20 10l-4 8',
        'M7 8h10M5 12h14M12 4v16',
      ];

      for (let i = 0; i < weapons.length; i++) {
        const weapon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        weapon.setAttribute('viewBox', '0 0 24 24');
        weapon.setAttribute('width', '40');
        weapon.setAttribute('height', '40');
        weapon.setAttribute('class', 'weapon-silhouette');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', weapons[i]);
        path.setAttribute('stroke', colors.khaki);
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('fill', 'none');

        weapon.appendChild(path);
        decorationsRef.current.appendChild(weapon);
      }
    };

    createElements();

    // Анимации для остальных элементов
    gsap.to('.crosshair', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'linear',
      stagger: 5,
    });

    gsap.to('.radar-blip', {
      scale: 0,
      opacity: 0,
      duration: 2,
      stagger: 0.7,
      repeat: -1,
      ease: 'power3.out',
    });

    gsap.to('.weapon-silhouette', {
      y: -10,
      opacity: 0.7,
      duration: 3,
      stagger: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Очистка анимаций при размонтировании
    return () => {
      gsap.killTweensOf('.crosshair');
      gsap.killTweensOf('.radar-blip');
      gsap.killTweensOf('.weapon-silhouette');
    };
  }, []);

  return <Box ref={decorationsRef} sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: -1 }} />;
};

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const routeRef = useRef(null);

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
      else setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    window.addEventListener('storage', checkAuthentication);
    return () => window.removeEventListener('storage', checkAuthentication);
  }, []);

  useEffect(() => {
    if (routeRef.current) {
      gsap.fromTo(
        routeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to bottom, ${colors.black} 0%, ${colors.armyGreen} 100%)`,
          color: colors.white,
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        <div className="loading-container">
          <div className="loading-text">LOADING</div>
          <div className="loading-bar"></div>
        </div>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');
          
          .loading-container {
            display: 'flex',
            flex-direction: 'column',
            align-items: 'center';
          }
          
          .loading-text {
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 3px;
            margin-bottom: 15px;
          }
          
          .loading-bar {
            width: 200px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid ${colors.khaki};
            position: 'relative',
            overflow: 'hidden';
          }
          
          .loading-bar:before {
            content: '';
            position: 'absolute';
            left: -50%;
            width: 50%;
            height: 100%;
            background: ${colors.khaki};
            animation: 'loading 1.5s infinite linear';
          }
          
          @keyframes loading {
            0% { left: -50%; }
            100% { left: 100%; }
          }
        `}</style>
      </Box>
    );
  }

  return (
    <>
      <CamouflageBackground />
      <MilitaryGrid />
      <AnimatedDecorations />
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />

      <AppContainer
        ref={routeRef}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
        sx={{
          padding: location.pathname === '/cabinet' ? '0px' : '20px',
        }}
        className="app-container"
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
          <Route path="/ranks" element={<Ranks />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/target" element={<Target />} />
        </Routes>
      </AppContainer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=Rajdhani:wght@400;600;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Rajdhani', sans-serif;
          background-color: ${colors.black};
          color: ${colors.white};
          overflow-x: hidden;
        }
        
        .crosshair {
          position: 'absolute';
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 1px solid ${colors.khaki};
          opacity: 0.1;
        }
        
        .crosshair:before, .crosshair:after {
          content: '';
          position: 'absolute';
          background: ${colors.khaki};
        }
        
        .crosshair:before {
          width: 100%;
          height: 1px;
          top: 50%;
          left: 0;
        }
        
        .crosshair:after {
          width: 1px;
          height: 100%;
          left: 50%;
          top: 0;
        }
        
        .crosshair:nth-child(1) { top: 10%; right: 15%; }
        .crosshair:nth-child(2) { bottom: 20%; left: 10%; }
        .crosshair:nth-child(3) { top: 60%; right: 20%; }
        
        .radar-blip {
          position: 'absolute';
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid ${colors.accent};
          opacity: 0.3;
        } 
        
        .radar-blip:nth-child(4) { top: 30%; left: 20%; }
        .radar-blip:nth-child(5) { top: 50%; right: 30%; }
        .radar-blip:nth-child(6) { top: 70%; left: 40%; }
        .radar-blip:nth-child(7) { top: 20%; right: 10%; }
        .radar-blip:nth-child(8) { top: 80%; right: 25%; }
        
        .weapon-silhouette {
          position: 'absolute';
          opacity: 0.3;
        }
        
        .weapon-silhouette:nth-child(9) { top: 20%; right: 5%; }
        .weapon-silhouette:nth-child(10) { top: 70%; left: 5%; }
        .weapon-silhouette:nth-child(11) { top: 40%; right: 40%; }

        *::-webkit-scrollbar-thumb:hover {
          background: ${colors.camouflage};
        }

        /* Медиа-запрос для мобильного режима */
        @media (max-width: 768px) {
          .app-container {
            padding-bottom: 80px; /* Отступ снизу для мобильного режима */
          }
        }
      `}</style>
    </>
  );
};

export default AppRoutes;