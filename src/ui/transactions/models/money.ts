import moment from "moment";
import { Type } from "class-transformer";

export class Step {
  amount: number = 0;
  expireOn: number;
  finishedAt: number;
  devise = "€"
  get amountFormatted() { return this.amountRound + " " + this.devise; }
  get amountRound() { return this.amount || 0; }
  set amountRound(a: number) { this.amount = Math.round(a); }
  get expireOnDateIso() { return moment(this.expireOn).format("YYYY-MM-DD") }
  get expireOnText() { return moment(this.expireOn).format("DD MMM YYYY") }
}
export class Money {
  amount: number = 0;
  expireOn: number;
  finishedAt: number;
  devise = "€"
  get amountFormatted() { return this.amount + " " + this.devise; }
  @Type(() => Step) steps: Step[] = [];
  get hasSteps() { return this.steps.length > 0; }
  get sumSteps() { return this.steps.map(a => a.amount ? a.amount : 0).reduce((a1, a2) => a1 + a2, 0); }
  get diff() {
    return this.amount - this.sumSteps;
  }
}