import React, { useRef, useEffect } from "react";

import './Map.css';

interface MapProps {
    className?: string;
    center?: { lat: number; lng: number };
    zoom?: number;
}

const Map: React.FC<MapProps> = ({ className, center, zoom = 10 }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.google || !mapRef.current) {
            console.warn('Google Maps not loaded or map container not ready');
            return;
        }

        // Initialize the map
        const map = new window.google.maps.Map(mapRef.current, {
            center: center || { lat: 40.7128, lng: -74.0060 }, // Default to NYC
            zoom,
        });

        // Add marker if center is provided
        if (center) {
            new window.google.maps.Marker({
                position: center,
                map,
            });
        }
    }, [center, zoom]);

    return <div ref={mapRef} className={`map ${className || ''}`}></div>;
};

export default Map;