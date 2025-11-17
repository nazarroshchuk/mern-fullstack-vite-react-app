// Define specific types for Google Maps API
interface GoogleMapOptions {
  center: { lat: number; lng: number };
  zoom: number;
}

interface GoogleMarkerOptions {
  position: { lat: number; lng: number };
  map: unknown;
}

// Properly declare Google Maps API types
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: GoogleMapOptions) => unknown;
        Marker: new (options: GoogleMarkerOptions) => unknown;
      };
    };
  }
}

export const NOTIFICATION_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

export type ShowNotificationFunction = (
  message: string,
  type: NotificationType,
  duration?: number | null
) => void;

export const NOTIFICATION_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
};
