import { useState } from 'react';

import Backdrop from '../UI/Backdrop';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  return (
    <>
      <Backdrop onClick={toggleDrawer} show={isDrawerOpen} />
      <SideDrawer show={isDrawerOpen} onClose={toggleDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={toggleDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">Your Places</h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
