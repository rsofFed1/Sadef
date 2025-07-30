import { content } from "@/components/language/home";

export type Location = {
    id: number;
    name: string;
    coordinates: [number, number];
    description?: string;
};

export const locationsEn: Location[] = [
    {
        id: 1,
        name: content.en.interactiveMap.locationName,
        coordinates: [24.7136, 46.6753],
        description: content.en.interactiveMap.locationDescription
    },
    {
        id: 2,
        name: content.en.interactiveMap.locationName2,
        coordinates: [21.5433, 39.1728],
        description: content.en.interactiveMap.locationDescription2
    },
    {
        id: 3,
        name: content.en.interactiveMap.locationName3,
        coordinates: [26.4207, 50.0888],
        description: content.en.interactiveMap.locationDescription3
    }
];

export const locationsAr: Location[] = [
    {
        id: 1,
        name: content.ar.interactiveMap.locationName,
        coordinates: [24.7136, 46.6753],
        description: content.ar.interactiveMap.locationDescription
    },
    {
        id: 2,
        name: content.ar.interactiveMap.locationName2,
        coordinates: [21.5433, 39.1728],
        description: content.ar.interactiveMap.locationDescription2
    },
    {
        id: 3,
        name: content.ar.interactiveMap.locationName3,
        coordinates: [26.4207, 50.0888],
        description: content.ar.interactiveMap.locationDescription3
    }
];

// Default export for backward compatibility
export const locations = locationsEn;
