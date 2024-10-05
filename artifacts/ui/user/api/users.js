var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { USDataManagementService } from "./data";
export class ServiceUser {
    constructor() {
        this.usDataService = new USDataManagementService();
    }
    get() {
        return Promise.resolve(this.usDataService.getCurrentUserModel());
    }
    update(user) {
        return this.usDataService.update(user).then(_ => user);
    }
    isAuthenticated() {
        return true;
    }
    getCurrentUUID() {
        return this.usDataService.getCurrentUUID();
    }
    createAccount(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._confirm = yield this.usDataService.createAccount(phone);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    waitForConfirm() {
        return !!this._confirm;
    }
    confirm(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.usDataService.confirmPhone(this._confirm, code);
            return !!res;
        });
    }
}
//# sourceMappingURL=users.js.map