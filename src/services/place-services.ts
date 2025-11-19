import { Axios } from './axios-service';

export const placeServices = {
  getPlaceById: (placeId: string) => {
    return Axios().get(`/places/${placeId}`);
  },
  getPlaceByUserId: (userId: string) => {
    return Axios().get(`/places/user/${userId}`);
  },
  createPlace: (placeData: FormData) => {
    return Axios().post('/places', placeData);
  },
  updatePlace: (placeData: FormData) => {
    return Axios().patch(`/places/${placeData.get('id')}`, placeData);
  },
  deletePlace: (placeId: string) => {
    return Axios().delete(`/places/${placeId}`);
  },
};
