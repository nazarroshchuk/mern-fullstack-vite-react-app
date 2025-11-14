import type { PlaceType } from '../types/data-types';
import { Axios } from './axios-service';

export const placeServices = {
  getPlaces: () => {
    return Axios().get('/places');
  },
  getPlaceById: (placeId: string) => {
    return Axios().get(`/places/${placeId}`);
  },
  createPlace: (placeData: Omit<PlaceType, 'image' | 'id'>) => {
    return Axios().post('/places', placeData);
  },
  updatePlace: (
    placeId: string,
    placeData: { title?: string; description?: string; address?: string }
  ) => {
    return Axios().patch(`/places/${placeId}`, placeData);
  },
  deletePlace: (placeId: string) => {
    return Axios().delete(`/places/${placeId}`);
  },
};
