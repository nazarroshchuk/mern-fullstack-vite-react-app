import * as React from 'react';

import UserItem from './UserItem';
import Card from '../UI/Card';
import type { UserType } from '../../types';

import './UsersList.css';

interface UsersListProps {
  items: UserType[];
}

const UsersList: React.FC<UsersListProps> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="user-list">
      {items.map((user: UserType) => (
        <UserItem key={user.id} item={user} />
      ))}
    </ul>
  );
};

export default UsersList;
