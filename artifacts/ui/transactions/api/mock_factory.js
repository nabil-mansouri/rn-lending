import moment from "moment";
import { Transaction, Step, Contact, Picture, Direction } from "../models";
let number = 0;
export function transactionMoney(withSteps) {
    const sessionId = "XX";
    let t = new Transaction;
    t.docId = "0";
    t.currentUserId = sessionId;
    let expire = moment().clone().add(0, "day");
    let finisht = moment().add(1, "day");
    t.money = true;
    t.direction = number++ % 2 == 0 ? Direction.CreatorShare : Direction.OtherShare;
    t.moneyDetail.amount = 400;
    t.creator._id = sessionId;
    t.creator.fullname = "Nabil";
    t.creator.picture.uri = IMG_BASE64;
    t.other.fullname = "YAM";
    t.other.picture.uri = "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png";
    t.moneyDetail.expireOn = expire.toDate().getTime();
    t.finishedAtMS = finisht.toDate().getTime();
    ;
    t.reason = "Restaurant";
    if (withSteps) {
        for (let i = 0; i < 2; i++) {
            let step = new Step;
            step.amount = 23;
            step.expireOn = moment().add(i, "day").toDate().getTime();
            t.moneyDetail.steps.push(step);
        }
    }
    for (let i = 0; i < 2; i++) {
        let c = new Contact;
        c.fullname = "Kamouloux";
        c.picture.uri = "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png";
        t.telltales.push(c);
    }
    for (let i = 0; i < 4; i++) {
        let c = new Picture;
        c.uri = IMG_BASE64;
        t.pictures.push(c);
    }
    t.location.name = "Le Creusot";
    return t;
}
export function generate(nb) {
    const data = [];
    const sessionId = "XX";
    for (let i = 0; i < nb; i++) {
        let days = i;
        let finish = i - nb / 3;
        let t = new Transaction;
        t.docId = i + "";
        t.direction = number++ % 2 == 0 ? Direction.CreatorShare : Direction.OtherShare;
        t.currentUserId = sessionId;
        if (i % 2 == 0) {
            let expire = moment().clone().add(days, "day");
            let finisht = moment().add(days + finish, "day");
            t.money = true;
            t.moneyDetail.amount = 400;
            t.creator._id = sessionId;
            t.moneyDetail.expireOn = expire.toDate().getTime();
            ;
            t.finishedAtMS = finisht.toDate().getTime();
            ;
            t.other.fullname = "YAM";
            t.other.picture.uri = "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png";
            t.creator.fullname = "Nabil";
            t.creator.picture.uri = IMG_BASE64;
        }
        else {
            t.money = false;
            t.creator._id = "Y";
            t.goodDetail.title = "Playstation 4";
            t.goodDetail.expireOn = moment().add(days, "day").toDate().getTime();
            ;
            t.finishedAtMS = moment().add(days + finish, "day").toDate().getTime();
            ;
            t.creator.fullname = "Nabil";
            t.creator.picture.uri = IMG_BASE64;
            t.other.fullname = "YAM";
            t.other.picture.uri = "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png";
        }
        data.push(t);
    }
    return data;
}
const IMG_BASE64 = "data:image/jpeg;base64,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";
//# sourceMappingURL=mock_factory.js.map