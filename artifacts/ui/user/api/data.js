var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "../models";
import firebase from "react-native-firebase";
let compiled = /^[1-9][0-9]{8}$/.compile();
export class USDataManagementService {
    createAccount(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = compiled.test(phoneNumber);
            if (!valid) {
                throw "Should have a valid french phone number";
            }
            return yield firebase.auth().signInWithPhoneNumber("+33" + valid);
        });
    }
    confirmPhone(confirm, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield confirm.confirm(code);
            if (user == null) {
                return null;
            }
            return this.toModelUser(user);
        });
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
    toModelUser(fUser) {
        let user = new model.User;
        user.picture.uri = fUser.photoURL;
        user.fullname = fUser.displayName;
        user.phone = fUser.phoneNumber;
        user.email = fUser.email;
        user._id = fUser.uid;
        return user;
    }
    getCurrentUserModel() {
        if (this.isAuthenticated()) {
            let fUser = firebase.auth().currentUser;
            return this.toModelUser(fUser);
        }
        throw "User is not authenticated";
    }
    //TODO save extra fields: notification...
    update(user) {
        return firebase.auth().currentUser.updateProfile({
            displayName: user.fullname,
            photoURL: user.picture.uri
        });
    }
}
//# sourceMappingURL=data.js.map