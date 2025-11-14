import React from 'react';

import type { Place } from '../../types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

interface PlaceListProps {
  items: Place[];
}

const PlaceList: React.FC<PlaceListProps> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="place-lits center">
        <Card>
          <h2>No places found</h2>
          <Button to="/places/new">Share place</Button>
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
