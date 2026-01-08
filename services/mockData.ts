import { Property } from "../types";

export const MOCK_PROPERTIES: Omit<Property, "id" | "ownerId">[] = [
    {
        title: "Luxury 3BHK in Indiranagar",
        description: "Spacious 3BHK apartment with modern interiors, modular kitchen, and power backup. Located near metro station and popular restaurants.",
        price: 45000,
        deposit: 100000,
        location: "Indiranagar, Bangalore",
        type: "Apartment",
        bhk: 3,
        amenities: ["Parking", "Gym", "Power Backup", "Security", "Lift"],
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"],
        availableFrom: new Date().toISOString(),
        furnishing: "Semi Furnished",
        rating: 4.8,
        views: 120
    },
    {
        title: "Cozy 1BHK in Koramangala",
        description: "Perfect for singles or couples. Fully furnished 1BHK with high-speed internet and housekeeping included. Close to Sony World signal.",
        price: 22000,
        deposit: 50000,
        location: "Koramangala, Bangalore",
        type: "Apartment",
        bhk: 1,
        amenities: ["WiFi", "Housekeeping", "Fridge", "Washing Machine"],
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"],
        availableFrom: new Date().toISOString(),
        furnishing: "Fully Furnished",
        rating: 4.5,
        views: 85
    },
    {
        title: "Spacious House in Whitefield",
        description: "4BHK luxury house in a gated community with private garden and clubhouse access. Ideal for families working in ITPL.",
        price: 85000,
        deposit: 300000,
        location: "Whitefield, Bangalore",
        type: "Independent House",
        bhk: 4,
        amenities: ["Swimming Pool", "Garden", "Clubhouse", "24/7 Security", "Solar Heater"],
        images: ["https://images.unsplash.com/photo-1600596542815-60c37c6635c2?auto=format&fit=crop&w=800&q=80"],
        availableFrom: new Date().toISOString(),
        furnishing: "Semi Furnished",
        rating: 4.9,
        views: 210
    },
    {
        title: "Modern 2BHK near HSR Layout",
        description: "Newly constructed 2BHK with balcony and covered parking. quiet neighborhood with easy access to Outer Ring Road.",
        price: 32000,
        deposit: 150000,
        location: "HSR Layout, Bangalore",
        type: "Apartment",
        bhk: 2,
        amenities: ["Parking", "CCTV", "Water Supply"],
        images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"],
        availableFrom: new Date().toISOString(),
        furnishing: "Unfurnished",
        rating: 4.2,
        views: 150
    },
    {
        title: "Premium PG in Electronic City",
        description: "Single occupancy room in a premium PG with food/mess facility. Walkable distance to major tech parks.",
        price: 15000,
        deposit: 30000,
        location: "Electronic City, Bangalore",
        type: "PG/Hostel",
        bhk: 1,
        amenities: ["WiFi", "Food", "Laundry", "TV", "Geyser"],
        images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"],
        availableFrom: new Date().toISOString(),
        furnishing: "Fully Furnished",
        rating: 4.0,
        views: 300
    }
];
