import { IPhotoService } from "./interfaces";
import * as model from "../models";
const ImagePicker = require('react-native-image-picker');
import Permissions from 'react-native-permissions'

interface PhotoResult {
    didCancel: boolean
    error: string
    customButton: string
    data: string
    uri: string
    origURL: string
    isVertical: boolean
    width: number
    height: number
    fileSize: number
    type: string
    fileName: string
    path: string
    latitude: number
    longitude: number
    timestamp: number
    originalRotation: number
}

export class PhotoService implements IPhotoService {

    toPicture(res: PhotoResult) {
        let picture = new model.Picture();
        picture.uri = res.uri;
        return picture;
    }
    pick(fromLib: boolean): Promise<model.Picture[]> {
        const commons = {
            noData: true,
            mediaType: "photo",
            title: fromLib ? "Mes photos" : "Appareil photo",
            cancelButtonTitle: "Annuler",
            takePhotoButtonTitle: "Prendre Photo",
            chooseFromLibraryButtonTitle: "Mes photos",
            permissionDenied: {
                title: "Acès aux photos",
                text: "Autorisez l'accès à votre appareil afin d'associer des photos à votre transaction",
                okTitle: "Autoriser",
                reTryTitle: "Autoriser"
            }
        }
        return new Promise((resolve, reject) => {
            if (fromLib) {
                ImagePicker.launchImageLibrary(commons, (res: PhotoResult) => {
                    if (res.error) {
                        reject(res.error)
                    }
                    let picture = this.toPicture(res);
                    resolve(picture.uri ? [picture] : []);
                });
            } else {
                ImagePicker.launchCamera({ ...commons, cameraType: "back" }, (res: PhotoResult) => {
                    if (res.error) {
                        reject(res.error)
                    }
                    let picture = this.toPicture(res);
                    resolve(picture.uri ? [picture] : []);
                });
            }
        })
    }
    hasPermission(): Promise<boolean> {
        return Permissions.check("photo").then(response => {
            return response == "authorized";
        });
    }
    requestPermission(): Promise<boolean> {
        return Permissions.request('photo').then(response => {
            return response == "authorized";
        });
    }
}