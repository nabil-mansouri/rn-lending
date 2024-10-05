import { IServiceUser } from "./interfaces";
import * as model from "../models";
import { USDataManagementService } from "./data";
import { RNFirebase } from "react-native-firebase";


export class ServiceUser implements IServiceUser {
    usDataService = new USDataManagementService();
    _confirm: RNFirebase.ConfirmationResult;
    get(): Promise<model.User> {
        return Promise.resolve(this.usDataService.getCurrentUserModel());
    }
    update(user: model.User): Promise<model.User> {
        return this.usDataService.update(user).then(_ => user);
    }
    isAuthenticated(): boolean {
        return true;
    }
    getCurrentUUID(): string {
        return this.usDataService.getCurrentUUID();
    }
    async createAccount(phone: string): Promise<boolean> {
        try {
            this._confirm = await this.usDataService.createAccount(phone);
            return true;
        } catch (e) {
            return false;
        }
    }
    waitForConfirm(): boolean {
        return !!this._confirm;
    }
    async confirm(code): Promise<boolean> {
        let res = await this.usDataService.confirmPhone(this._confirm, code)
        return !!res;
    }

}