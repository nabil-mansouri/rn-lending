import * as model from "./models";
export * from "./models";
import { COState } from "../contacts/state";
import { LOSTate } from "../locations/state";
export class STState {
    constructor() {
        this.error = false;
        this.valid = false;
        this.showCalendar = false;
        this.validation = new model.StepErrors;
        this.step = new model.Step;
    }
}
export class TRListState {
    constructor() {
        this.searching = false;
        this.loading = true; //INIT WITH LOADING
        this.error = false;
        this.transactions = [];
    }
}
export class TRCreateState {
    constructor() {
        this.loading = false;
        this.pickDest = false;
        this.pickPhoto = false;
        this.pickDate = false;
        this.pickLocation = false;
        this.error = false;
        this.validation = new model.TransactionErrors;
        this.current = new model.Transaction;
        this.step = new STState;
    }
}
export class TRStates {
    constructor() {
        this.list = new TRListState;
        this.create = new TRCreateState;
        this.contacts = new COState;
        this.locations = new LOSTate;
    }
}
export const initialListState = new TRListState();
export const initialCreateState = new TRCreateState();
export const initialTRStates = new TRStates();
//# sourceMappingURL=state.js.map