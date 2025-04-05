import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';

const NavbarContainer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 250,
    height: '100vh',
    background: '#000000',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  background: '#000000',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 1300,
}));

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
  color: '#ffffff',
  padding: isMobile ? '5px 0' : '10px 15px',
  borderRadius: 6,
  fontSize: 12,
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    background: isMobile ? 'none' : 'rgba(255, 255, 255, 0.05)',
    transform: isMobile ? 'none' : 'translateX(3px)',
  },
  ...(active && {
    background: isMobile ? 'none' : 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontWeight: 600,
    transform: isMobile ? 'none' : 'translateX(3px)',
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

  if (isMobile) {
    return (
      <FooterContainer>
        <NavItems isMobile={true}>
          <NavItem to="/" active={location.pathname === '/' ? 1 : 0} isMobile={true}>
            <HomeFilledIcon sx={{ fontSize: 22, color: '#ffffff' }} />
            <Typography sx={{ color: '#ffffff', fontSize: 12 }}>Главная</Typography>
          </NavItem>
          <NavItem to="/cabinet" active={location.pathname === '/cabinet' ? 1 : 0} isMobile={true}>
            <AccountBoxIcon sx={{ fontSize: 22, color: '#ffffff' }} />
            <Typography sx={{ color: '#ffffff', fontSize: 12 }}>Кабинет</Typography>
          </NavItem>
        </NavItems>
      </FooterContainer>
    );
  }

  return (
    <>
      <NavbarContainer variant="permanent" open={true}>
        <LogoContainer>
          <LogoText>GameHub</LogoText>
        </LogoContainer>
        <NavItems>
          <NavItem to="/" active={location.pathname === '/' ? 1 : 0}>
            <HomeFilledIcon sx={{ fontSize: 22, color: '#ffffff' }} />
            <Typography sx={{ color: '#ffffff' }}>Главная</Typography>
          </NavItem>
          <NavItem to="/cabinet" active={location.pathname === '/cabinet' ? 1 : 0}>
            <AccountBoxIcon sx={{ fontSize: 22, color: '#ffffff' }} />
            <Typography sx={{ color: '#ffffff' }}>Кабинет</Typography>
          </NavItem>
        </NavItems>
      </NavbarContainer>
    </>
  );
};

export default Navbar;