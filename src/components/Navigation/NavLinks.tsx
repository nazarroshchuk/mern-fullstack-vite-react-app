import { useContext } from 'react';

import { NavLink } from 'react-router-dom';

import AppContext from '../../context/app-context';
import { getNavLinks } from '../../utils/routing-helpers';
import Button from '../UI/Button';
import './NavLinks.css';

const NavLinks = () => {
  const context = useContext(AppContext);
  const navLinks = getNavLinks(context.authentication.isLoggedIn);

  return (
    <ul className="nav-links">
      {navLinks.map((link, index) => (
        <li key={link.path || index}>
          <NavLink to={link.navLink as string} end>
            <span>{link.title}</span>
          </NavLink>
        </li>
      ))}
      {context.authentication.isLoggedIn && (
        <li>
          <Button inverse onClick={context.authentication.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
