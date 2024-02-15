import React from 'react';

import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const location = useLocation();

  // Exclude Navbar and Footer from Register and Login pages
  const excludeNavbarFooter = location.pathname.includes('/signup') || location.pathname.includes('/login');

  // Exclude logout button from being rendered on every page, including logout page
  const excludeLogoutButton = location.pathname === '/logout';

  return (
    <>
      {!excludeNavbarFooter && <NavBar/>}
      {children}
      {!excludeNavbarFooter && !excludeLogoutButton && <Footer />}
    </>
  );
};

export default Layout;