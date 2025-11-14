import * as React from 'react';

import { Link } from 'react-router-dom';

import type { UserType } from '../../types';
import Avatar from '../UI/Avatar';
import Card from '../UI/Card';
import './UserItem.css';

interface UserItemProps {
  item: UserType;
}

const UserItem: React.FC<UserItemProps> = ({ item }) => {
  const { image, name, places } = item;

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${item.id}/place`}>
          <div className="user-item__image">
            <Avatar image={image ?? ''} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {places.length} {places.length === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
          <div className="user-item__hover-content">
            <h2>Card Component</h2>
            <p>This is a reusable card component.</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
