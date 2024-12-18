import React from 'react';
import ScrollToTop from './ScrollToTop';

const NavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 p-4">
      <ScrollToTop />
    </nav>
  );
};

export default NavBar;