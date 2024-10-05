import * as model from "./models";
export * from "./models";
import { COState } from "../contacts/state";
import { LOSTate } from "../locations/state";

export class STState {
    error: boolean = false;
    valid = false;
    errorBody: string;
    errorTitle: string;
    showCalendar = false;
    validation = new model.StepErrors
    step: model.Step = new model.Step;
}
export class TRListState {
    searching = false;
    loading = true;//INIT WITH LOADING
    error = false;
    errorBody: string;
    errorTitle: string;
    criteria: string;
    current: model.Transaction;
    create: TRCreateState;
    transactions: model.Transaction[] = []
}
export class TRCreateState {
    loading = false;
    pickDest = false;
    pickPhoto = false;
    pickDate = false;
    pickLocation = false;
    error = false;
    search: string;
    errorBody: string;
    errorTitle: string;
    validation = new model.TransactionErrors
    current = new model.Transaction;
    step = new STState;
}
export class TRStates {
    list = new TRListState;
    create = new TRCreateState;
    contacts = new COState;
    locations = new LOSTate
}
export const initialListState = new TRListState();
export const initialCreateState = new TRCreateState();
export const initialTRStates = new TRStates();