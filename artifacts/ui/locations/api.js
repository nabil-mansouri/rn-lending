var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "./models";
import Geocoder from 'react-native-geocoder';
import Permissions from 'react-native-permissions';
export class LocationService {
    toAddress(add) {
        let l = {
            position: {
                lat: add.latitude,
                lng: add.longitude
            },
            formattedAddress: add.name
        };
        return l;
    }
    toLocation(add) {
        let l = new model.Location;
        l.latitude = add.position && add.position.lat;
        l.longitude = add.position && add.position.lng;
        l.name = add.formattedAddress;
        return l;
    }
    toLocationFromString(add) {
        let l = new model.Location;
        l.name = add;
        return l;
    }
    search(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Geocoder.geocodeAddress(criteria);
            return res;
        });
    }
    geolocalize() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield Geocoder.geocodePosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    resolve(res);
                }
                catch (e) {
                    reject(e);
                }
            }), (error) => reject(error), { enableHighAccuracy: true, timeout: 2000, maximumAge: 20000 });
        });
    }
    hasPermission() {
        return Permissions.check("location").then(response => {
            return response == "authorized";
        });
    }
    requestPermission() {
        return Permissions.request('location').then(response => {
            return response == "authorized";
        });
    }
}
export const loService = new LocationService();
//# sourceMappingURL=api.js.map