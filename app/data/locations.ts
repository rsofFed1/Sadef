export type Location = {
    id: number;
    name: string;
    coordinates: [number, number];
    description?: string;
};

export const locations: Location[] = [
    {
        id: 1,
        name: "Riyadh",
        coordinates: [24.7136, 46.6753],
        description: "Karak Gulwa Main Store in Riyadh - Olaya District"
    },
    {
        id: 2,
        name: "Jeddah",
        coordinates: [21.5433, 39.1728],
        description: "Karak Gulwa Branch in Jeddah - Tahlia Street"
    },
    {
        id: 3,
        name: "Dammam",
        coordinates: [26.4207, 50.0888],
        description: "Karak Gulwa Branch in Dammam - Corniche"
    }
];