import React from 'react';

import AppContext from '../../context/app-context';
import type { PlaceType } from '../../types/data-types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

interface PlaceListProps {
  items: PlaceType[];
  userId?: string;
}

const PlaceList: React.FC<PlaceListProps> = ({ items, userId }) => {
  const { authentication } = React.useContext(AppContext);
  if (!items.length) {
    return (
      <div className="place-lits center">
        <Card>
          <h2>No places found</h2>
          {userId === authentication.userId && (
            <Button to="/places/new">Share place</Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map(place => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
};

export default PlaceList;
