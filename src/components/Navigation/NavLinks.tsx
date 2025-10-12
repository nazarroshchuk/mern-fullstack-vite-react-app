import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Button from '../UI/Button';
import { getNavLinks } from '../../utils/routing-helpers';

const NavLinks = () => {
  const context = useContext(AuthContext);
  const navLinks = getNavLinks(context.isLoggedIn);

  return (
    <ul className="nav-links">
      {navLinks.map((link, index) => (
        <li key={link.path || index}>
          <NavLink to={link.navLink as string}>
            <span>{link.title}</span>
          </NavLink>
        </li>
      ))}
      {context.isLoggedIn && (
        <li>
          <Button inverse onClick={context.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
