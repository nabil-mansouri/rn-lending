var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "../models";
import { usService } from "../../user/api";
import firebase from "react-native-firebase";
export class TRDataManagementService {
    constructor() {
        this.ref = null;
    }
    get collection() {
        if (this.ref) {
            return this.ref;
        }
        this.ref = firebase.firestore().collection("transactions");
        return this.ref;
    }
    createTransaction(tr) {
        tr.creator._id = usService.getCurrentUUID();
        //TODO use phone revision instead or use a date?
        let tellTalesPhones = tr.telltales.map(t => t.phone).reduce((a1, a2) => {
            a1[a2] = true;
            return a1;
        }, {});
        tr.channels = Object.assign({ [tr.receiver.phone]: true, [tr.sender.phone]: true }, tellTalesPhones);
        tr.createdAtServer = firebase.firestore.FieldValue.serverTimestamp();
        return this.collection.add(tr);
    }
    fetchTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            let transactions = yield this.collection.get();
            let all = transactions.docs.map(d => d.ref.get());
            let allObjects = yield Promise.all(all);
            let results = allObjects.map(a => a.data());
            results.forEach((r) => {
                Object.setPrototypeOf(r, model.Transaction.prototype);
                if (r.moneyDetail) {
                    Object.setPrototypeOf(r.moneyDetail, model.Money.prototype);
                }
                if (r.goodDetail) {
                    Object.setPrototypeOf(r.goodDetail, model.Good.prototype);
                }
            });
            return results;
        });
    }
}
export let trDataService = new TRDataManagementService();
//# sourceMappingURL=data.js.map