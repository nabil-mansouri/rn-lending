var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import moment from "moment";
import { Type } from "class-transformer";
export class Step {
    constructor() {
        this.amount = 0;
        this.devise = "€";
    }
    get amountFormatted() { return this.amountRound + " " + this.devise; }
    get amountRound() { return this.amount || 0; }
    set amountRound(a) { this.amount = Math.round(a); }
    get expireOnDateIso() { return moment(this.expireOn).format("YYYY-MM-DD"); }
    get expireOnText() { return moment(this.expireOn).format("DD MMM YYYY"); }
}
export class Money {
    constructor() {
        this.amount = 0;
        this.devise = "€";
        this.steps = [];
    }
    get amountFormatted() { return this.amount + " " + this.devise; }
    get hasSteps() { return this.steps.length > 0; }
    get sumSteps() { return this.steps.map(a => a.amount ? a.amount : 0).reduce((a1, a2) => a1 + a2, 0); }
    get diff() {
        return this.amount - this.sumSteps;
    }
}
__decorate([
    Type(() => Step)
], Money.prototype, "steps", void 0);
//# sourceMappingURL=money.js.map