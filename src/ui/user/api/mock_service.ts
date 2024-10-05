import { IServiceUser } from "./interfaces";
import * as model from "../models";
import * as mock from "./mock_factory";


export class ServiceUser implements IServiceUser {
    user = mock.user();
    confirmTried = 0;
    createTried = 0;
    get(): Promise<model.User> {
        return new Promise<model.User>((resolve) => {
            setTimeout(() => {
                resolve(this.user);
            }, 3000)
        });
    }

    update(user: model.User): Promise<model.User> {
        return new Promise<model.User>((resolve) => {
            setTimeout(() => {
                resolve(user);
            }, 3000)
        });
    }
    isAuthenticated(): boolean {
        return true;
    }
    getCurrentUUID(): string {
        return this.user._id;
    }
    async createAccount(_: string): Promise<boolean> {
        this.createTried++;
        return this.createTried == 2;
    }
    waitForConfirm(): boolean {
        return false;
    }
    async confirm(_): Promise<boolean> {
        this.confirmTried++;
        return this.confirmTried == 2;
    }
}