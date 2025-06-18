"use client";
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/app/data/locations';

// Interface for the Icon prototype
interface IconDefaultPrototype extends L.Icon.Default {
    _getIconUrl?: () => string;
}

interface MapContainerProps {
    locations: Location[];
    activeLocation: number | null;
    setActiveLocation: (id: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ locations, activeLocation, setActiveLocation }) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<{ [key: number]: L.Marker }>({});

    useEffect(() => {
        // Fix Leaflet icon issues with webpack
        delete (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: '/images/marker-icon-2x.png',
            iconUrl: '/images/marker-icon.png',
            shadowUrl: '/images/marker-shadow.png',
        });

        // Initialize the map if it doesn't exist
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [24.0, 45.0], // Center of Saudi Arabia
                zoom: 6,
                zoomControl: true,
                scrollWheelZoom: false
            });

            // Add OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            // Add markers for each location
            locations.forEach(location => {
                const customIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                        <div style="background-color: #7D5A42; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white" width="16" height="16">
                                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                            </svg>
                            ${location.id === activeLocation ? `<div style="position: absolute; top: -40px; right: -50px; background-color: #7D5A42; color: white; padding: 8px 12px; border-radius: 4px; min-width: 100px; text-align: center;">${location.name}</div>` : ''}
                        </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                });

                const marker = L.marker(location.coordinates, { icon: customIcon })
                    .addTo(mapRef.current!)
                    .on('click', () => {
                        setActiveLocation(location.id);
                        mapRef.current?.panTo(location.coordinates);
                    });

                // Store marker reference for later use
                markersRef.current[location.id] = marker;
            });
        }

        // Update markers when activeLocation changes
        if (activeLocation !== null) {
            const activeLocationData = locations.find(l => l.id === activeLocation);
            if (activeLocationData) {
                // Pan to the active location
                mapRef.current?.panTo(activeLocationData.coordinates);

                // Update all markers to reflect the active state
                Object.keys(markersRef.current).forEach(key => {
                    const id = parseInt(key);
                    const marker = markersRef.current[id];

                    const customIcon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `
                            <div style="background-color: #7D5A42; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; position: relative;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white" width="16" height="16">
                                    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                                </svg>
                                ${id === activeLocation ? `<div style="position: absolute; top: -40px; right: -50px; background-color: #7D5A42; color: white; padding: 8px 12px; border-radius: 4px; min-width: 100px; text-align: center;">${locations.find(l => l.id === id)?.name}</div>` : ''}
                            </div>
                        `,
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                    });

                    marker.setIcon(customIcon);
                });
            }
        }

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [locations, activeLocation, setActiveLocation]);

    return <div id="map" className="h-full w-full"></div>;
};

export default MapContainer;