import React, { useContext, useState } from 'react';

import AppContext from '../../context/app-context';
import { useQueryMutateHook } from '../../hooks/useQueryMutateHook';
import { placeServices } from '../../services/place-services';
import { QUERY_KEYS, queryClient } from '../../services/react-query';
import type { PlaceType } from '../../types/data-types';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Map from '../UI/Map';
import Modal from '../UI/Modal';
import './PlaceItem.css';

interface PlaceItemProps {
  place: PlaceType;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { authentication } = useContext(AppContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { mutate: deletePlace, isPending: isDeletingPlace } =
    useQueryMutateHook(placeServices.deletePlace);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    deletePlace(place.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.places, `${place.creator}`],
        });
      },
    });
    setShowConfirmModal(false);
  };

  const isAllowedToChange =
    authentication.isLoggedIn && authentication.userId === place.creator;

  const toggleMapHandler = () => setShowMap(state => !state);

  return (
    <>
      <Modal
        isOpen={showMap}
        onClose={toggleMapHandler}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footerContent={<Button onClick={toggleMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={place.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        isOpen={showConfirmModal}
        onClose={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footerContent={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button
              danger
              onClick={confirmDeleteHandler}
              disabled={isDeletingPlace}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please notice that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={place.image} alt={place.title} />
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
            {isAllowedToChange && (
              <Button to={`/places/${place.id}`}>Edit</Button>
            )}
            {isAllowedToChange && (
              <Button onClick={showDeleteWarningHandler}>Delete</Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
