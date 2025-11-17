import Authenticate from '../pages/Authenticate';
import NewPlace from '../pages/NewPlace';
import UpdatePlace from '../pages/UpdatePlace';
import UserPlaces from '../pages/UserPlaces';
import Users from '../pages/Users';

export const ROUTE_CONFIG = [
  {
    path: '/',
    element: <Users />,
    title: 'All users',
    navLink: '/',
    requiresAuth: false,
    showInNav: true,
  },
  {
    path: '/:userId/place',
    element: <UserPlaces />,
    title: 'All users',
    requiresAuth: false,
    showInNav: true,
  },
  {
    path: 'user/:userId/places/',
    getPathWithUserId: (userId: string) => `user/${userId}/places/`,
    navLink: '/places',
    element: <UserPlaces />,
    title: 'My places',
    requiresAuth: true,
  },
  {
    path: '/places/:placeId',
    element: <UpdatePlace />,
    title: 'Update place',
    requiresAuth: true,
  },
  {
    path: '/places/new',
    navLink: '/places/new',
    element: <NewPlace />,
    title: 'Add place',
    requiresAuth: true,
  },
  {
    path: '/auth',
    navLink: '/auth',
    element: <Authenticate />,
    title: 'Authenticate',
    requiresAuth: false,
    showOnlyWhenLoggedOut: true,
  },
];
