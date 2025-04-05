import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import './navbar.css';

const Navbar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const location = useLocation(); // To get the current path and highlight active link

  // Effect for handling clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('.navbar');
        const menuButton = document.querySelector('.menu-button');
        const clickedSidebar = sidebar && sidebar.contains(event.target);
        const clickedMenuButton = menuButton && menuButton.contains(event.target);
        if (!clickedSidebar && !clickedMenuButton) {
          setSidebarOpen(false);
        }
      }
    };

    // Add event listener only if in mobile mode and sidebar is open
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
        <button className="menu-button" onClick={() => setSidebarOpen(true)}>
          <MenuIcon />
        </button>
      )}
      <nav className={`navbar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="navbar__container">
          <div className="navbar__logo">
            <span className="navbar__logo-text">GameHub</span>
          </div>
          <div className="navbar__items">
            <Link
              to="/"
              className={`navbar__item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <HomeFilledIcon className="navbar__icon" />
              <span className="navbar__text">Главная</span>
            </Link>
            <Link
              to="/cabinet"
              className={`navbar__item ${location.pathname === '/cabinet' ? 'active' : ''}`}
            >
              <AccountBoxIcon className="navbar__icon" />
              <span className="navbar__text">Кабинет</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
