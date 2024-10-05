import * as model from "./models";
export * from "./models";


export class COState {
    selected: string[] = [];
    contacts: model.ContactRecord[] = [];
    loading: boolean = true;//INIT LOADING
    searching = false;
    search: string;
    error: boolean = false;
    errorBody: string;
    errorTitle: string;
    hasPermission: boolean;
    needRequest: boolean;
    canValid = false;
    single = false
}
export const initialCOState = new COState(); 