
export class Location {
    name: string;
    latitude: number;
    longitude: number;
    altitude: number;
}

export interface Address {
    position: { lat, lng },
    formattedAddress: string, // the full address 
    feature: string | null, // ex Yosemite Park, Eiffel Tower 
    streetNumber: string | null,
    streetName: string | null,
    postalCode: string | null,
    locality: string | null, // city name 
    country: string,
    countryCode: string
    adminArea: string | null
    subAdminArea: string | null,
    subLocality: string | null
}