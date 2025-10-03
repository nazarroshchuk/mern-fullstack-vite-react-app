import React, {useState} from "react";

import type {Place} from "../../types";

import Card from "../../shared/components/UI/Card";
import Button from "../../shared/components/UI/Button";
import Modal from "../../shared/components/UI/Modal";
import Map from "../../shared/components/UI/Map";

import './PlaceItem.css'

interface PlaceItemProps {
    place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
    const [showMap, setShowMap] = useState(false)

    const toggleMapHandler = () => setShowMap(state => !state)

    return (
        <>
            <Modal
                isOpen={showMap}
                onClose={toggleMapHandler}
                header={place.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={toggleMapHandler}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={place.location} zoom={16}/>
                </div>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={place.imageUrl} alt={place.title}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{place.title}</h2>
                        <h3>{place.address}</h3>
                        <p>{place.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={toggleMapHandler}>
                            View on Map
                        </Button>
                        <Button to={`/places/${place.id}`}>
                            Edit
                        </Button>
                        <Button>
                            Delete
                        </Button>
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem;