var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as mock from "./mock_factory";
export class ServiceUser {
    constructor() {
        this.user = mock.user();
        this.confirmTried = 0;
        this.createTried = 0;
    }
    get() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.user);
            }, 3000);
        });
    }
    update(user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(user);
            }, 3000);
        });
    }
    isAuthenticated() {
        return true;
    }
    getCurrentUUID() {
        return this.user._id;
    }
    createAccount(_) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createTried++;
            return this.createTried == 2;
        });
    }
    waitForConfirm() {
        return false;
    }
    confirm(_) {
        return __awaiter(this, void 0, void 0, function* () {
            this.confirmTried++;
            return this.confirmTried == 2;
        });
    }
}
//# sourceMappingURL=mock_service.js.map