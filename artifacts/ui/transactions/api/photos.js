import * as model from "../models";
const ImagePicker = require('react-native-image-picker');
import Permissions from 'react-native-permissions';
export class PhotoService {
    toPicture(res) {
        let picture = new model.Picture();
        picture.uri = res.uri;
        return picture;
    }
    pick(fromLib) {
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
        };
        return new Promise((resolve, reject) => {
            if (fromLib) {
                ImagePicker.launchImageLibrary(commons, (res) => {
                    if (res.error) {
                        reject(res.error);
                    }
                    let picture = this.toPicture(res);
                    resolve(picture.uri ? [picture] : []);
                });
            }
            else {
                ImagePicker.launchCamera(Object.assign({}, commons, { cameraType: "back" }), (res) => {
                    if (res.error) {
                        reject(res.error);
                    }
                    let picture = this.toPicture(res);
                    resolve(picture.uri ? [picture] : []);
                });
            }
        });
    }
    hasPermission() {
        return Permissions.check("photo").then(response => {
            return response == "authorized";
        });
    }
    requestPermission() {
        return Permissions.request('photo').then(response => {
            return response == "authorized";
        });
    }
}
//# sourceMappingURL=photos.js.map