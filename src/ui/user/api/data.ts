import * as model from "../models";
import firebase, { RNFirebase } from "react-native-firebase";
import { IDataManagementService } from "./interfaces";

let compiled = /^[1-9][0-9]{8}$/.compile();
export class USDataManagementService implements IDataManagementService {
    async createAccount(phoneNumber: string) {
        let valid = compiled.test(phoneNumber);
        if (!valid) {
            throw "Should have a valid french phone number";
        }
        return await firebase.auth().signInWithPhoneNumber("+33" + valid);
    }
    async confirmPhone(confirm: RNFirebase.ConfirmationResult, code: string) {
        let user = await confirm.confirm(code);
        if (user == null) {
            return null;
        }
        return this.toModelUser(user);
    }
    isAuthenticated() {
        return !!firebase.auth().currentUser;
    }
    getCurrentUUID() {
        if (this.isAuthenticated()) {
            return firebase.auth().currentUser.uid;
        }
        throw "User is not authenticated";
    }
    toModelUser(fUser: RNFirebase.User) {
        let user = new model.User;
        user.picture.uri = fUser.photoURL;
        user.fullname = fUser.displayName;
        user.phone = fUser.phoneNumber;
        user.email = fUser.email;
        user._id = fUser.uid;
        return user;
    }
    getCurrentUserModel(): model.User {
        if (this.isAuthenticated()) {
            let fUser = firebase.auth().currentUser;
            return this.toModelUser(fUser);
        }
        throw "User is not authenticated";
    }
    //TODO save extra fields: notification...
    update(user: model.User) {
        return firebase.auth().currentUser.updateProfile({
            displayName: user.fullname,
            photoURL: user.picture.uri
        })
    }
}