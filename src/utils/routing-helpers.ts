import { ROUTE_CONFIG } from '../constants/routing-config';

export const getNavLinks = (isLoggedIn: boolean) =>
  ROUTE_CONFIG.filter(route => {
    // Only include routes that should show in navigation
    if (!route.navLink) return false;

    // If route has showOnlyWhenLoggedOut flag, only show when not logged in
    if (route.showOnlyWhenLoggedOut) return !isLoggedIn;

    // If route requires auth, only show when logged in
    if (route.requiresAuth) return isLoggedIn;

    // For routes that don't require auth and don't have special flags,
    // show them always (like "All users")
    return true;
  });

export const getRoutes = (isLoggedIn: boolean) =>
  ROUTE_CONFIG.filter(route => {
    // If route requires auth, only include when logged in
    if (route.requiresAuth) return isLoggedIn;

    // If route has showOnlyWhenLoggedOut flag, only include when not logged in
    if (route.showOnlyWhenLoggedOut) return !isLoggedIn;

    // Include all other routes
    return true;
  });
