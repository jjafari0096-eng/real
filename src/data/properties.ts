import { Property } from '../types/property';

export const properties: Property[] = [
  {
    id: "1",
    slug: "mediterranean-villa-marbella",
    title: "Mediterranean Villa",
    type: "villa",
    status: "for-sale",
    price: 2450000,
    currency: "EUR",
    location: { city: "Marbella", region: "Andalusia", lat: 36.5097, lng: -4.8860 },
    specs: { bedrooms: 5, bathrooms: 6, areaM2: 680, plotM2: 2800, yearBuilt: 2008 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200", alt: "Modern villa with pool" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200", alt: "Villa exterior" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200", alt: "Living room" }
    ],
    description: "Stunning Mediterranean-style villa nestled in the exclusive Sierra Blanca area of Marbella. This architectural masterpiece offers panoramic sea views and features high-end finishes throughout. The property boasts a infinity pool, lush landscaped gardens, and a private tennis court.",
    amenities: ["Infinity Pool", "Home Cinema", "Wine Cellar", "Gym", "Guest House", "Smart Home System"],
    featured: true
  },
  {
    id: "2",
    slug: "sky-penthouse-barcelona",
    title: "Skyline Penthouse",
    type: "penthouse",
    status: "for-sale",
    price: 3200000,
    currency: "EUR",
    location: { city: "Barcelona", region: "Catalonia", lat: 41.3851, lng: 2.1734 },
    specs: { bedrooms: 4, bathrooms: 5, areaM2: 450, yearBuilt: 2021 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200", alt: "Luxury penthouse terrace" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200", alt: "Modern interior" }
    ],
    description: "Breathtaking penthouse in the heart of Barcelona's Eixample district. This two-level property offers unparalleled city views from its expansive rooftop terrace with plunge pool. The interior features floor-to-ceiling windows, premium materials, and the latest smart home technology.",
    amenities: ["Rooftop Pool", "Concierge Service", "Parking Garage", "Terrace", "Smart Home", "Home Office"],
    featured: true
  },
  {
    id: "3",
    slug: "beachfront-apartment-ibiza",
    title: "Beachfront Apartment",
    type: "apartment",
    status: "for-rent",
    price: 8500,
    currency: "EUR",
    location: { city: "Ibiza Town", region: "Balearic Islands", lat: 38.9068, lng: 1.4206 },
    specs: { bedrooms: 2, bathrooms: 2, areaM2: 145, yearBuilt: 2019 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200", alt: "Coastal apartment" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200", alt: "Modern bedroom" }
    ],
    description: "Stunning beachfront apartment in Talamanca, just minutes from Ibiza's famous Marina Botafoch. Step from your private terrace onto the golden sands. Furnished to the highest standards with Scandinavian design pieces.",
    amenities: ["Beach Access", "Building Pool", "Gym", "Parking", "Air Conditioning"],
    featured: true
  },
  {
    id: "4",
    slug: "historic-townhouse-lisbon",
    title: "Historic Townhouse",
    type: "villa",
    status: "for-sale",
    price: 1850000,
    currency: "EUR",
    location: { city: "Lisbon", region: "Portugal", lat: 38.7223, lng: -9.1393 },
    specs: { bedrooms: 4, bathrooms: 3, areaM2: 320, plotM2: 180, yearBuilt: 1890 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200", alt: "Portuguese townhouse" },
      { url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200", alt: "Renovated interior" }
    ],
    description: "Beautifully restored 19th-century townhouse in Lisbon's historic Alfama district. This property seamlessly blends original architectural features with modern luxury amenities. Features include a private courtyard and rooftop terrace with city views.",
    amenities: ["Rooftop Terrace", "Courtyard Garden", "Original Tiles", "Central Location", "Fully Renovated"],
    featured: false
  },
  {
    id: "5",
    slug: "commercial-office-spaces-milan",
    title: "Design District Offices",
    type: "commercial",
    status: "for-rent",
    price: 15000,
    currency: "EUR",
    location: { city: "Milan", region: "Italy", lat: 45.4642, lng: 9.1900 },
    specs: { bedrooms: 0, bathrooms: 4, areaM2: 850, yearBuilt: 2018 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200", alt: "Modern office space" },
      { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200", alt: "Open plan workspace" }
    ],
    description: "Premium office space in Milan's Brera design district. This contemporary workspace features flexible open-plan areas, private meeting rooms, a rooftop terrace, and 24/7 building access. Perfect for creative agencies or tech startups.",
    amenities: ["24/7 Access", "Meeting Rooms", "Reception", "Rooftop Terrace", "Kitchen/Lounge"],
    featured: false
  },
  {
    id: "6",
    slug: "chalet-alps-courchevel",
    title: "Alpine Chalet",
    type: "villa",
    status: "for-sale",
    price: 5800000,
    currency: "EUR",
    location: { city: "Courchevel", region: "French Alps", lat: 45.4139, lng: 6.6336 },
    specs: { bedrooms: 7, bathrooms: 8, areaM2: 780, plotM2: 3500, yearBuilt: 2020 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200", alt: "Luxury ski chalet" },
      { url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200", alt: "Chalet interior" }
    ],
    description: "Exceptional ski-in/ski-out chalet in the world-famous Three Valleys. This state-of-the-art alpine residence offers direct access to the slopes, indoor swimming pool, spa area, home cinema, and staff accommodation. Unparalleled luxury in the heart of the French Alps.",
    amenities: ["Ski-in/Ski-out", "Indoor Pool", "Spa & Wellness", "Home Cinema", "Wine Cellar", "Staff Quarters"],
    featured: true
  },
  {
    id: "7",
    slug: "harbor-loft-amsterdam",
    title: "Harbor Loft",
    type: "apartment",
    status: "for-sale",
    price: 1650000,
    currency: "EUR",
    location: { city: "Amsterdam", region: "Netherlands", lat: 52.3676, lng: 4.9041 },
    specs: { bedrooms: 3, bathrooms: 2, areaM2: 210, yearBuilt: 2017 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200", alt: "Modern loft apartment" },
      { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200", alt: "Canal views" }
    ],
    description: "Stunning harbor loft in Amsterdam's vibrant Eastern Docklands. This industrial-chic residence features exposed brickwork, high ceilings, and expansive waterfront views. The open-plan design creates a spacious, light-filled living environment.",
    amenities: ["Waterfront Views", "Parking Garage", "Building Gym", "Floor-to-Ceiling Windows", "Private Storage"],
    featured: false
  },
  {
    id: "8",
    slug: "ocean-penthouse-monaco",
    title: "Carre d'Or Penthouse",
    type: "penthouse",
    status: "for-sale",
    price: 38500000,
    currency: "EUR",
    location: { city: "Monaco", region: "Monaco", lat: 43.7333, lng: 7.4167 },
    specs: { bedrooms: 6, bathrooms: 7, areaM2: 920, yearBuilt: 2022 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebc4?w=1200", alt: "Ultra-luxury penthouse" },
      { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200", alt: "Mediterranean views" }
    ],
    description: "One of Monaco's most exclusive penthouses in the prestigious Carre d'Or district. This ultra-luxury residence spans an entire floor with panoramic views of the Mediterranean. Features include a private rooftop infinity pool, wine cellar, and dedicated staff quarters.",
    amenities: ["Infinity Pool", "Concierge", "Helipad Access", "Wine Cellar", "Security System", "Staff Accommodation"],
    featured: true
  },
  {
    id: "9",
    slug: "art-deco-apartment-paris",
    title: "Art Deco Apartment",
    type: "apartment",
    status: "for-sale",
    price: 2100000,
    currency: "EUR",
    location: { city: "Paris", region: "France", lat: 48.8566, lng: 2.3522 },
    specs: { bedrooms: 3, bathrooms: 2, areaM2: 195, yearBuilt: 1932 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200", alt: "Elegant Parisian apartment" },
      { url: "https://images.unsplash.com/photo-1560448075-bb485b067938?w=1200", alt: "Classic interior" }
    ],
    description: "Magnificent Art Deco apartment located on Avenue Montaigne in Paris's 8th arrondissement. Meticulously restored, this property retains all its original architectural features while incorporating modern comforts. Eiffel Tower views from the main terrace.",
    amenities: ["Eiffel Tower Views", "Original Features", "Doorman Building", "Central Location", "High Ceilings"],
    featured: false
  },
  {
    id: "10",
    slug: "cliffside-villa-santorini",
    title: "Caldera View Villa",
    type: "villa",
    status: "for-rent",
    price: 12000,
    currency: "EUR",
    location: { city: "Oia", region: "Santorini", lat: 36.4618, lng: 25.3760 },
    specs: { bedrooms: 4, bathrooms: 4, areaM2: 280, plotM2: 1200, yearBuilt: 2015 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200", alt: "Santorini villa" },
      { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200", alt: "Caldera views" }
    ],
    description: "Spectacular cliffside villa perched above Santorini's iconic caldera. This stunning property features an infinity pool blending into the Aegean Sea, cave-style bedrooms, and uninterrupted sunset views. The ultimate Greek island retreat available for seasonal rental.",
    amenities: ["Infinity Pool", "Caldera Views", "Chef Services", "Daily Housekeeping", "Private Yacht Access"],
    featured: true
  },
  {
    id: "11",
    slug: "garden-apartment-berlin",
    title: "Prenzlauer Berg Garden",
    type: "apartment",
    status: "for-sale",
    price: 795000,
    currency: "EUR",
    location: { city: "Berlin", region: "Germany", lat: 52.5200, lng: 13.4050 },
    specs: { bedrooms: 2, bathrooms: 1, areaM2: 110, yearBuilt: 1908 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", alt: "Berlin apartment garden" },
      { url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200", alt: "Bright interior" }
    ],
    description: "Charming ground-floor apartment with private garden in Berlin's desirable Prenzlauer Berg. This beautifully maintained property features original hardwood floors, a modern kitchen, and direct access to a peaceful south-facing garden. Excellent access to public transit.",
    amenities: ["Private Garden", "Original Floors", "Pet Friendly", "Great Transit", "Bike Storage"],
    featured: false
  },
  {
    id: "12",
    slug: "lakefront-retreat-lake-como",
    title: "Lake Como Villa",
    type: "villa",
    status: "for-sale",
    price: 8500000,
    currency: "EUR",
    location: { city: "Bellagio", region: "Lake Como", lat: 45.9931, lng: 9.2575 },
    specs: { bedrooms: 6, bathrooms: 7, areaM2: 820, plotM2: 5000, yearBuilt: 1925 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200", alt: "Lake Como villa" },
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200", alt: "Lakefront property" }
    ],
    description: "Exquisite historic villa on the shores of Lake Como near Bellagio. This grand Italian residence features original frescoes, marble fireplaces, and a private boat dock. The property has been meticulously restored while preserving its timeless elegance.",
    amenities: ["Lake Access", "Boat Dock", "Wine Cellar", "Guest Apartment", "Tennis Court", "Botanical Gardens"],
    featured: true
  },
  {
    id: "13",
    slug: "city-center-stockholm",
    title: "Östermalm Apartment",
    type: "apartment",
    status: "for-sale",
    price: 1450000,
    currency: "SEK",
    location: { city: "Stockholm", region: "Sweden", lat: 59.3293, lng: 18.0686 },
    specs: { bedrooms: 3, bathrooms: 2, areaM2: 165, yearBuilt: 2020 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1560185127-0ed50172a474?w=1200", alt: "Scandinavian design apartment" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200", alt: "Minimalist interior" }
    ],
    description: "Contemporary luxury apartment in Stockholm's most prestigious district. This Scandinavian-designed home features premium materials, smart home integration, and breathtaking views over the city's waterways. Walking distance to shops, restaurants, and parks.",
    amenities: ["Water Views", "Building Spa", "Concierge", "Parking", "Smart Home"],
    featured: false
  },
  {
    id: "14",
    slug: "waterfront-loft-toronto",
    title: "King West Loft",
    type: "commercial",
    status: "for-rent",
    price: 9800,
    currency: "CAD",
    location: { city: "Toronto", region: "Canada", lat: 43.6532, lng: -79.3832 },
    specs: { bedrooms: 0, bathrooms: 2, areaM2: 480, yearBuilt: 2016 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200", alt: "Creative office loft" },
      { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200", alt: "Open office design" }
    ],
    description: "Premium creative office space in Toronto's vibrant King West neighborhood. This open-concept loft features exposed brick, 14-foot ceilings, and large south-facing windows flooding the space with natural light. Perfect for design firms or tech companies.",
    amenities: ["Exposed Brick", "High Ceilings", "Building Rooftop", "24/7 Access", "Loading Dock"],
    featured: false
  },
  {
    id: "15",
    slug: "penthouse-dubai-marina",
    title: "Marina Sky Penthouse",
    type: "penthouse",
    status: "for-sale",
    price: 18500000,
    currency: "AED",
    location: { city: "Dubai", region: "UAE", lat: 25.0657, lng: 55.1713 },
    specs: { bedrooms: 5, bathrooms: 6, areaM2: 750, yearBuilt: 2023 },
    gallery: [
      { url: "https://images.unsplash.com/photo-1582407958949-b93f678e45aa?w=1200", alt: "Dubai penthouse" },
      { url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200", alt: "Skyline views" }
    ],
    description: "Architecturally stunning penthouse in Dubai Marina's most exclusive tower. This ultra-modern residence offers panoramic views of the Arabian Gulf and city skyline. Features include a private infinity pool, smart home automation, and access to the building's world-class amenities.",
    amenities: ["Infinity Pool", "Private Elevator", "Building Spa", "Beach Access", "Chef's Kitchen"],
    featured: false
  }
];