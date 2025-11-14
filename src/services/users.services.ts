import { Axios } from './axios-service';

export const userServices = {
  getUser: () => {
    return Axios().get('/users');
  },
};
