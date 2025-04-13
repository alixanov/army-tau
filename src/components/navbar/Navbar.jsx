import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GamepadIcon from '@mui/icons-material/Gamepad';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

// Army color scheme
const colors = {
  background: 'linear-gradient(90deg, #A32929, #A8A14E)',
  accent: '#A32929',
  khaki: '#A8A14E',
};

// Styled components
const NavbarContainer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 250,
    height: '100vh',
    background: '#1a1a1a',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

const FooterContainer = styled(Box)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  background: '#1a1a1a',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 1300,
});

const LogoContainer = styled(Box)({
  padding: 20,
  textAlign: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const LogoText = styled(Typography)({
  color: 'white',
  fontSize: 18,
  fontFamily: "'Russo One', sans-serif",
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  marginBottom: 8,
});

const Subtitle = styled(Typography)({
  color: '#ccc',
  fontSize: 12,
  fontStyle: 'italic',
  lineHeight: 1.4,
  textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
});

const NavItems = styled(Box)(({ isMobile }) => ({
  display: 'flex',
  flexDirection: isMobile ? 'row' : 'column',
  gap: isMobile ? 0 : 10,
  padding: isMobile ? 0 : 20,
  justifyContent: 'space-around',
  width: '100%',
}));

const NavItem = styled(Link)(({ theme, active, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexDirection: isMobile ? 'column' : 'row',
  textDecoration: 'none',
  color: active ? colors.accent : '#ffffff',
  padding: isMobile ? '5px 0' : '10px 15px',
  borderRadius: 6,
  fontSize: 12,
  fontWeight: active ? 600 : 400,
  transition: theme.transitions.create(['background', 'transform', 'color'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    background: isMobile ? 'none' : 'rgba(255, 255, 255, 0.1)',
    color: colors.khaki,
    transform: isMobile ? 'none' : 'translateX(5px)',
  },
  '&:active': {
    transform: isMobile ? 'scale(0.95)' : 'translateX(2px)',
  },
  ...(active &&
    !isMobile && {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateX(3px)',
  }),
}));

const GradientIcon = styled('div')(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: active ? colors.background : 'transparent',
  WebkitBackgroundClip: active ? 'text' : 'initial',
  WebkitTextFillColor: active ? 'transparent' : '#ffffff',
  transition: 'all 0.2s ease-in-out',
}));

const Navbar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('.MuiDrawer-paper');
        const clickedSidebar = sidebar && sidebar.contains(event.target);
        if (!clickedSidebar) {
          setSidebarOpen(false);
        }
      }
    };

    if (isMobile && sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  const isCabinetRoute =
    location.pathname.startsWith('/cabinet') || location.pathname === '/register';
  const isRanksRoute = location.pathname === '/ranks';
  const isTargetRoute = location.pathname === '/target'; // Добавляем проверку для /target

  const isAuthenticated = !!localStorage.getItem('userData');
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const username = userData.username || 'JOIN THE RANKS';

  const links = isAuthenticated
    ? [
      {
        to: '/',
        label: 'BASE CAMP',
        icon: MilitaryTechIcon,
        active: location.pathname === '/',
      },

      
      {
        to: '/cabinet',
        label: username.toUpperCase(),
        icon: PersonIcon,
        active: isCabinetRoute,
      },
      {
        to: '/ranks',
        label: 'RANKS',
        icon: PersonIcon,
        active: isRanksRoute,
      },
      {
        to: '/missions',
        label: 'MISSIONS',
        icon: GamepadIcon,
        active: location.pathname === '/missions',
      },
      {
        to: '/target',
        label: 'TARGET',
        icon: CloseIcon,
        active: isTargetRoute, // Используем отдельную переменную для /target
      },
    ]
    : [
      {
        to: '/',
        label: 'BASE CAMP',
        icon: MilitaryTechIcon,
        active: location.pathname === '/',
      },
      {
        to: '/register',
        label: 'REGISTER',
        icon: PersonIcon,
        active: isCabinetRoute,
      },
      {
        to: '/ranks',
        label: 'RANKS',
        icon: PersonIcon,
        active: isRanksRoute,
      },
      {
        to: '/missions',
        label: 'MISSIONS',
        icon: GamepadIcon,
        active: location.pathname === '/missions',
      },
      {
        to: 'https://x.com/trenchdeploy',
        label: 'TARGET',
        icon: CloseIcon,
        active: isTargetRoute, // Добавляем /target и для неавторизованных
      },
    ];



  const renderLink = ({ to, label, icon: Icon, active }) => (
    <NavItem to={to} active={active ? 1 : 0} isMobile={isMobile} key={to}>
      <GradientIcon active={active}>
        <Icon sx={{ fontSize: 24 }} />
      </GradientIcon>
      <Typography
        sx={{
          background: active ? colors.background : 'none',
          WebkitBackgroundClip: active ? 'text' : 'none',
          WebkitTextFillColor: active ? 'transparent' : '#ffffff',
          fontSize: 12,
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {label}
      </Typography>
    </NavItem>
  );

  if (isMobile) {
    return (
      <FooterContainer>
        <NavItems isMobile={true}>{links.map(renderLink)}</NavItems>
      </FooterContainer>
    );
  }

  return (
    <NavbarContainer variant="permanent" open={true}>
      <LogoContainer>
        <LogoText>Trench Deployment</LogoText>
        <Subtitle>Enlist. Get Ranked. Survive the Market.</Subtitle>
      </LogoContainer>
      <NavItems>{links.map(renderLink)}</NavItems>
    </NavbarContainer>
  );
};

export default Navbar;