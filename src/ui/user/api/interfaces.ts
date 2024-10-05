import * as model from "../models";
import { RNFirebase } from "react-native-firebase";

export interface IServiceUser {
    get(): Promise<model.User>;
    isAuthenticated(): boolean;
    getCurrentUUID(): string;
    update(user: model.User): Promise<model.User>;
    createAccount(phone: string): Promise<boolean>;
    waitForConfirm(): boolean;
    confirm(code: string): Promise<boolean>;
}
export interface IDataManagementService {
    createAccount(phoneNumber: string): Promise<RNFirebase.ConfirmationResult>;
    confirmPhone(confirm: RNFirebase.ConfirmationResult, code: string): Promise<model.User>;
    isAuthenticated(): boolean;
    getCurrentUUID(): string;
    getCurrentUserModel(): model.User;
    update(user: model.User): Promise<void>
}