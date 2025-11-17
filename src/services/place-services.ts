import type { PlaceType } from '../types/data-types';
import { Axios } from './axios-service';

export const placeServices = {
  getPlaceById: (placeId: string) => {
    return Axios().get(`/places/${placeId}`);
  },
  getPlaceByUserId: (userId: string) => {
    return Axios().get(`/places/user/${userId}`);
  },
  createPlace: (placeData: Omit<PlaceType, 'image' | 'id' | 'location'>) => {
    return Axios().post('/places', placeData);
  },
  updatePlace: (placeData: {
    id: string;
    title: string;
    description: string;
  }) => {
    return Axios().patch(`/places/${placeData.id}`, placeData);
  },
  deletePlace: (placeId: string) => {
    return Axios().delete(`/places/${placeId}`);
  },
};
