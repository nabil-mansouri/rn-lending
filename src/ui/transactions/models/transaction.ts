import moment from "moment";
import { Type } from "class-transformer";
import { Money } from "./money";
import { Good } from "./good";
import { Contact } from "../../contacts/models";
import { Location } from "../../locations/models";
import { Picture } from "../../commons/model"
export class TransactionQuery {
    current?: boolean;
    search?: string;
    limit?: number;
    skip?: number;
    offset?: Transaction;
}
export enum Direction {
    CreatorShare, OtherShare
}
export const TRANSACTION_TYPE = "Transaction";
export class Transaction {
    docId: string;
    channels: { [key: string]: boolean } = {}
    docType = TRANSACTION_TYPE;
    // 
    reason: string;
    cancelAt: number;
    createdAtServer: any;
    createdAt: number = moment().toDate().getTime();
    direction: Direction = null;
    currentUserId: string;
    @Type(() => Contact) creator = new Contact();
    @Type(() => Contact) other = new Contact();
    @Type(() => Money) moneyDetail: Money = null;
    @Type(() => Good) goodDetail: Good = null;
    @Type(() => Contact) telltales: Contact[] = [];
    @Type(() => Picture) pictures: Picture[] = [];
    @Type(() => Location) location = new Location();
    notes: number = 1;
    /**
     * METHODS
     */
    get creatorId() { return this.creator && this.creator._id; }
    get hasOther() { return this.other && this.other.recordId }
    get hasSubject() { return this.moneyDetail != null || this.goodDetail != null }
    get money() { return !!this.moneyDetail; }
    set money(b: boolean) {
        if (b) {
            this.moneyDetail = new Money;
            this.goodDetail = null;
        } else {
            this.moneyDetail = null;
            this.goodDetail = new Good;
        }
    }
    get fullTitle() {
        if (this.money) {
            return this.moneyDetail.amountFormatted;
        } else {
            return this.goodDetail.title;
        }
    }
    get nbTells() { return this.telltales ? this.telltales.length : 0; }
    get hasTells() { return this.nbTells > 0; }
    get locationName() { return this.hasLocation ? this.location.name : ""; }
    get hasLocation() { return this.location && this.location.name; }
    get amount() { return this.moneyDetail ? this.moneyDetail.amount : 0; }
    get nbSteps() { return this.moneyDetail && this.moneyDetail.steps ? this.moneyDetail.steps.length : 0; }
    get hasSteps() { return this.money && this.nbSteps > 0; }
    get hasPictures() { return this.nbPictures > 0; }
    get nbPictures() { return this.pictures ? this.pictures.length : 0; }
    get hasAmount() { return this.amount > 0; }
    get iShare() {
        if (this.creatorId == this.currentUserId) {
            return this.direction == Direction.CreatorShare;
        } else {
            return this.direction == Direction.OtherShare;
        }
    }
    get iShareName() { return this.iShare ? "Prêt" : "Emprunt"; }
    get sender() {
        return this.direction == Direction.CreatorShare ? this.creator : this.other
    }
    get receiver() {
        return this.direction == Direction.OtherShare ? this.creator : this.other
    }
    get otherAvatar() { return this.other.avatar; }
    get otherShortName() { return this.other.shortName; }
    get expireOnMS(): number {
        if (this.money) {
            return this.moneyDetail.expireOn;
        }
        else { return this.goodDetail.expireOn; }
    }
    set expireOnMS(s) {
        if (this.money) {
            this.moneyDetail.expireOn = s;
        }
        else { this.goodDetail.expireOn = s; }
    }
    get daysBeforeEnd() {
        let now = moment().startOf('day');
        let limit = moment(this.expireOnMS).startOf('day');
        return limit.diff(now, "days");
    }
    get expireOnAtISO() { return moment(this.expireOnMS).format("YYYY-MM-DD") }
    get hasExpireOn() { return this.hasSubject && !!this.expireOnMS }
    get finished() { return !!this.finishedAtMS; }
    get finishedAtMS() { return this.money ? this.moneyDetail.finishedAt : this.goodDetail.finishedAt; }
    get finishedAtFormatted() {
        const finishedAt = this.finishedAtMS;
        return finishedAt ? moment(finishedAt).format("DD MMMM") : "-";
    }
    get expireOnFormatted() {
        const expireOnAt = this.expireOnMS;
        return expireOnAt ? moment(expireOnAt).format("DD MMMM YYYY") : "-";
    }
    get createdAtFormatted() {
        const createdAt = this.createdAt;
        return createdAt ? moment(createdAt).format("DD MMM YYYY") : "-";
    }
    set finishedAtMS(date: number) {
        if (this.money) {
            this.moneyDetail.finishedAt = date;
        } else {
            this.goodDetail.finishedAt = date;
        }
    }
    get diffBetweenFinishAndExpireInDays() {
        let realEnd = moment(this.finishedAtMS).startOf('day');
        let end = moment(this.expireOnMS).startOf('day');
        return realEnd.diff(end, "days");
    }
    get durationLeftName() {
        let diff = this.daysBeforeEnd;
        if (diff > 0) {
            return `${diff}j. restants`;
        } else if (diff === 0) {
            return `Dernier jour`;
        } else {
            return `${Math.abs(diff)}j. de retard`;
        }
    }
    finish() {
        let now = moment().toDate().getTime();
        if (this.money) {
            this.moneyDetail.finishedAt = now;
        } else {
            this.goodDetail.finishedAt = now;
        }
    }
    cancel() {
        this.cancelAt = moment().toDate().getTime();
    }
}