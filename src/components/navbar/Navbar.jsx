import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PersonIcon from '@mui/icons-material/Person';

const colors = {
  background: 'linear-gradient(90deg, #A32929, #A8A14E)',
  accent: '#A32929',
  khaki: '#A8A14E',
};

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
  color: '#ffffff',
  fontSize: 24,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.5px',
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
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  ...(active && !isMobile && {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(3px)',
  }),
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  left: 20,
  backgroundColor: '#000000',
  color: '#ffffff',
  zIndex: 1100,
  width: 44,
  height: 44,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: theme.transitions.create(['background-color', 'border'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
}));

const GradientIcon = styled('div')(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: active ? colors.background : 'transparent',
  WebkitBackgroundClip: active ? 'text' : 'initial',
  WebkitTextFillColor: active ? 'transparent' : '#fff',
}));

const Navbar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('.MuiDrawer-paper');
        const menuButton = document.querySelector('.menu-button');
        const clickedSidebar = sidebar && sidebar.contains(event.target);
        const clickedMenuButton = menuButton && menuButton.contains(event.target);
        if (!clickedSidebar && !clickedMenuButton) {
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

  const isAuthenticated = !!localStorage.getItem('userData');

  const links = isAuthenticated
    ? [
      {
        to: '/',
        label: 'Home',
        icon: MilitaryTechIcon,
        active: location.pathname === '/',
      },
      {
        to: '/cabinet',
        label: 'Cabinet',
        icon: PersonIcon,
        active: isCabinetRoute,
      },
    ]
    : [
      {
        to: '/',
        label: 'Home',
        icon: MilitaryTechIcon,
        active: location.pathname === '/',
      },
      {
        to: '/register',
        label: 'Register',
        icon: PersonIcon,
        active: isCabinetRoute,
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
          WebkitTextFillColor: active ? 'transparent' : '#fff',
          fontSize: 12,
        }}
      >
        {label}
      </Typography>
    </NavItem>
  );

  if (isMobile) {
    return (
      <FooterContainer>
        <NavItems isMobile={true}>
          {links.map(renderLink)}
        </NavItems>
      </FooterContainer>
    );
  }

  return (
    <NavbarContainer variant="permanent" open={true}>
      <LogoContainer>
        <LogoText>ARMY HUB</LogoText>
      </LogoContainer>
      <NavItems>{links.map(renderLink)}</NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
