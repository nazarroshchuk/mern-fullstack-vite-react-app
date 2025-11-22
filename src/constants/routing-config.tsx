import React from 'react';

const Authenticate = React.lazy(() => import('../pages/Authenticate'));
const NewPlace = React.lazy(() => import('../pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('../pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('../pages/UserPlaces'));
const Users = React.lazy(() => import('../pages/Users'));

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
