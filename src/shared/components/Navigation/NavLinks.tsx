import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">
          <span>All users</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">
          <span>My place</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/places/new">
          <span>Add place</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth">
          <span>Authenticate</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
