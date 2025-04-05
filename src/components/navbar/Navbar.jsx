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
    background: '#000000', // Черный фон
    borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Тонкая белая граница
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    [theme.breakpoints.down('sm')]: {
      width: 220,
    },
  },
}));

const LogoContainer = styled(Box)({
  padding: 20,
  textAlign: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Тонкая белая граница снизу
});

const LogoText = styled(Typography)({
  color: '#ffffff', // Белый текст
  fontSize: 24,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.5px',
});

const NavItems = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10, // Уменьшенный отступ для минимализма
  padding: 20,
});

const NavItem = styled(Link)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  textDecoration: 'none',
  color: '#ffffff', // Белый текст
  padding: '10px 15px',
  borderRadius: 6,
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)', // Легкий белый фон при наведении
    transform: 'translateX(3px)', // Уменьшенный сдвиг для минимализма
  },
  ...(active && {
    background: 'rgba(255, 255, 255, 0.1)', // Более заметный фон для активного пункта
    color: '#ffffff',
    fontWeight: 600,
    transform: 'translateX(3px)',
  }),
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  left: 20,
  backgroundColor: '#000000', // Черный фон кнопки
  color: '#ffffff', // Белая иконка
  zIndex: 1100,
  width: 44,
  height: 44,
  border: '1px solid rgba(255, 255, 255, 0.2)', // Тонкая белая граница
  transition: theme.transitions.create(['background-color', 'border'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Легкий белый фон при наведении
    border: '1px solid rgba(255, 255, 255, 0.4)', // Более яркая граница
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

  return (
    <>
      {isMobile && !sidebarOpen && (
        <MenuButton className="menu-button" onClick={() => setSidebarOpen(true)}>
          <MenuIcon />
        </MenuButton>
      )}
      <NavbarContainer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={sidebarOpen}
        onClose={() => isMobile && setSidebarOpen(false)}
      >
        <LogoContainer>
          <LogoText>GameHub</LogoText>
        </LogoContainer>
        <NavItems>
          <NavItem to="/" active={location.pathname === '/' ? 1 : 0}>
            <HomeFilledIcon sx={{ fontSize: 22, color: '#ffffff' }} />
            <Typography sx={{ color: '#ffffff' }}>Главная</Typography>
          </NavItem>
          <NavItem to="/register" active={location.pathname === '/register' ? 1 : 0}>
            <AccountBoxIcon sx={{ fontSize: 22, color: '#ffffff' }} />
            <Typography sx={{ color: '#ffffff' }}>Кабинет</Typography>
          </NavItem>
        </NavItems>
      </NavbarContainer>
    </>
  );
};

export default Navbar;