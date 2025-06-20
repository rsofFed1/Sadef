"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { locations } from '@/app/data/locations';
import { ScrollAnimation } from './animations/ScrollAnimation';

// Dynamic import of Leaflet with no SSR
const MapComponent = dynamic(() => import('@/components/MapContainer'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-[#BDA25A]">Loading map...</div>
    </div>
});

const InteractiveMap = () => {
    const [activeLocation, setActiveLocation] = useState<number | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>("All");

    // Filter locations based on selected filter
    const filteredLocations = selectedFilter === "All"
        ? locations
        : locations.filter(location => location.name === selectedFilter);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        if (filter !== "All") {
            const location = locations.find(loc => loc.name === filter);
            if (location) {
                setActiveLocation(location.id);
            }
        } else {
            setActiveLocation(null);
        }
    };

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-tajawal text-[#BDA25A]">Interactive Map</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4 font-tajawal text-lg">
                        Vibrant Residential Complexes
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Map Container */}
                        <ScrollAnimation delay={0.2} direction='up' className="w-full md:w-2/3 relative">
                            <MapComponent
                                locations={locations}
                                activeLocation={activeLocation}
                                setActiveLocation={setActiveLocation}
                            />
                        </ScrollAnimation>

                        {/* Info Panel */}
                        <ScrollAnimation delay={0.2} direction='down' className="w-full md:w-1/3 bg-[#f8f4f0] p-6">
                            {/* Map Filters */}
                            <div className="flex flex-wrap justify-start border-b p-4 gap-2">
                                {["All", "Riyadh", "Jeddah", "Dammam"].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => handleFilterChange(filter)}
                                        className={`px-4 py-2 rounded-md font-tajawal ${selectedFilter === filter
                                            ? "bg-[#BDA25A] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-tajawal text-[#BDA25A]">Sadef Locations</h3>

                            <div className="space-y-4">
                                {filteredLocations.map((location) => (
                                    <div
                                        key={location.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${activeLocation === location.id
                                            ? "bg-[#BDA25A] text-white"
                                            : "bg-white hover:bg-gray-100"
                                            }`}
                                        onClick={() => setActiveLocation(location.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className={`${activeLocation === location.id ? "text-white" : "text-[#BDA25A]"}`} />
                                            <h4 className="font-bold font-tajawal">{location.name}</h4>
                                        </div>

                                        {location.description && (
                                            <p className={`mt-2 text-sm ${activeLocation === location.id ? "text-white/90" : "text-gray-600"}`}>
                                                {location.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <p className="text-gray-600 font-tajawal">
                                    A fully integrated and flourishing lifestyle brimming with diverse social and recreational activities, supporting residents' lives through a comprehensive range of services and facilities including green spaces, children's parks, a library, fitness centers, cafes, and an assortment of other amenities.
                                </p>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
