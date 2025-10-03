export interface UserType {
    id: string;
    name: string;
    email?: string;
    imageUrl?: string;
    placeCount: number;
}

export interface Place {
    id: string;
    address: string;
    description: string;
    creatorId: string;
    title: string;
    location: { lat: number, lng: number }
    imageUrl?: string;
}

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