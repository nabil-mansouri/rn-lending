import * as model from "../models";
import { usService } from "../../user/api"
import firebase, { RNFirebase } from "react-native-firebase";

export class TRDataManagementService {
    ref: RNFirebase.firestore.CollectionReference = null;
    get collection() {
        if (this.ref) {
            return this.ref;
        }
        this.ref = firebase.firestore().collection("transactions");
        return this.ref;
    }
    createTransaction(tr: model.Transaction) {
        tr.creator._id = usService.getCurrentUUID();
        //TODO use phone revision instead or use a date?
        let tellTalesPhones = tr.telltales.map(t => t.phone).reduce((a1, a2) => {
            a1[a2] = true;
            return a1;
        }, {});
        tr.channels = {
            [tr.receiver.phone]: true,
            [tr.sender.phone]: true,
            ...tellTalesPhones
        }
        tr.createdAtServer = firebase.firestore.FieldValue.serverTimestamp();
        return this.collection.add(tr);
    }
    async  fetchTransaction() {
        let transactions = await this.collection.get();
        let all = transactions.docs.map(d => d.ref.get())
        let allObjects = await Promise.all(all);
        let results = allObjects.map(a => a.data());
        results.forEach((r: model.Transaction) => {
            Object.setPrototypeOf(r, model.Transaction.prototype);
            if (r.moneyDetail) {
                Object.setPrototypeOf(r.moneyDetail, model.Money.prototype);
            }
            if (r.goodDetail) {
                Object.setPrototypeOf(r.goodDetail, model.Good.prototype);
            }
        })
        return results;
    }
}
export let trDataService = new TRDataManagementService(); 