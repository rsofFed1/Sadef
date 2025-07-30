"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { locationsEn, locationsAr } from '@/app/data/locations';
import { ScrollAnimation } from './animations/ScrollAnimation';
import { Content } from '@/types/content';

type Props = {
    currentContent: {
        interactiveMap: Content["en"]["interactiveMap"] | Content["ar"]["interactiveMap"]
    }
    language?: "en" | "ar"
  }
// Dynamic import of Leaflet with no SSR
const MapComponent = dynamic(() => import('@/components/MapContainer'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-bg-light flex items-center justify-center">
        <div className="animate-pulse text-secondary">Loading map...</div>
    </div>
});

const InteractiveMap = ({ currentContent, language = "en" }: Props) => {
    const [activeLocation, setActiveLocation] = useState<number | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    const locations = language === "ar" ? locationsAr : locationsEn;
    const locationNames = locations.map(loc => loc.name);

    // Set the correct "All" text based on language
    const allText = currentContent.interactiveMap.all || (language === "ar" ? "الكل" : "All");
    
    // Initialize selectedFilter with the correct "All" text
    React.useEffect(() => {
      setSelectedFilter(allText);
    }, [allText]);

    console.log('InteractiveMap Debug:', {
      language,
      locations,
      locationNames,
      selectedFilter,
      currentContent: currentContent.interactiveMap
    });

    // Filter locations based on selected filter
    const filteredLocations = selectedFilter === allText
        ? locations
        : locations.filter(location => location.name === selectedFilter);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        if (filter !== allText) {
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
                <div className="text-center mb-16">
                    <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.interactiveMap.title}</h2>
                    <p className="text-primaryText text-generalText">{currentContent.interactiveMap.subtitle}</p>
                </div>
                <div className="bg-bg-main rounded-lg shadow-sm overflow-hidden">
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
                        <ScrollAnimation delay={0.2} direction='down' className="w-full md:w-1/3 bg-bg-light p-6">
                            {/* Map Filters */}
                            <div className="flex flex-wrap justify-start border-b p-4 gap-2">
                                {[allText, ...locationNames].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => handleFilterChange(filter)}
                                        className={`px-4 py-2 rounded-md font-tajawal ${selectedFilter === filter
                                            ? "bg-secondary text-bg-main"
                                            : "bg-bg-light text-generalText hover:bg-bg-main"
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <h3 className="text-h3 font-bold mb-4 font-tajawal text-secondary">{currentContent.interactiveMap.cardTitle}</h3>

                            <div className="space-y-4">
                                {filteredLocations.map((location) => (
                                    <div
                                        key={location.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${activeLocation === location.id
                                            ? "bg-secondary text-bg-main"
                                            : "bg-bg-main hover:bg-bg-light"
                                            }`}
                                        onClick={() => setActiveLocation(location.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className={`${activeLocation === location.id ? "text-bg-main" : "text-secondary"}`} />
                                            <h4 className="font-bold font-tajawal">{location.name}</h4>
                                        </div>

                                        {location.description && (
                                            <p className={`mt-2 text-helper ${activeLocation === location.id ? "text-bg-main/90" : "text-generalText"}`}>
                                                {location.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <p className="text-generalText font-tajawal">
                                    {currentContent.interactiveMap.description}
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
