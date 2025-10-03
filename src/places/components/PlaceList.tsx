import React from "react";

import Card from "../../shared/components/UI/Card";
import PlaceItem from "./PlaceItem";

import type { Place } from "../../types";

import './PlaceList.css'

interface PlaceListProps {
    items: Place[];
}

const PlaceList: React.FC<PlaceListProps> = ({ items}) => {

    if (!items.length) {
        return (
            <div className="place-lits center">
                <Card>
                    <h2>No places found</h2>
                    <button>Share place</button>
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
    )
}

export default PlaceList;