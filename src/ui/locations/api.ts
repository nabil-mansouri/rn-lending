import * as model from "./models";
import Geocoder from 'react-native-geocoder';
import Permissions from 'react-native-permissions'

export interface ILocationService {
    toAddress(add: model.Location): model.Address;
    toLocation(add: model.Address): model.Location;
    search(criteria: string): Promise<model.Address[]>
    geolocalize(): Promise<model.Address[]>;
    hasPermission(): Promise<boolean>;
    requestPermission(): Promise<boolean>;
}

export class LocationService implements ILocationService {
    toAddress(add: model.Location): model.Address {
        let l: model.Address = <any>{
            position: {
                lat: add.latitude,
                lng: add.longitude
            },
            formattedAddress: add.name
        };
        return l;
    }
    toLocation(add: model.Address): model.Location {
        let l = new model.Location;
        l.latitude = add.position && add.position.lat;
        l.longitude = add.position && add.position.lng;
        l.name = add.formattedAddress;
        return l;
    }
    toLocationFromString(add: string): model.Location {
        let l = new model.Location;
        l.name = add;
        return l;
    }
    async search(criteria: string): Promise<model.Address[]> {
        const res: model.Address[] = await Geocoder.geocodeAddress(criteria);
        return res;
    }
    geolocalize(): Promise<model.Address[]> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const res: model.Address[] = await Geocoder.geocodePosition({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        resolve(res)
                    } catch (e) {
                        reject(e);
                    }
                },
                (error) => reject(error),
                { enableHighAccuracy: true, timeout: 2000, maximumAge: 20000 },
            );
        })
    }
    hasPermission(): Promise<boolean> {
        return Permissions.check("location").then(response => {
            return response == "authorized";
        });
    }
    requestPermission(): Promise<boolean> {
        return Permissions.request('location').then(response => {
            return response == "authorized";
        });
    }
}
export const loService = new LocationService();
