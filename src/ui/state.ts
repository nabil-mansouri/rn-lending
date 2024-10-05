import * as nav from "react-navigation";
import * as tr from "./transactions/state";
import * as us from "./user/state";

export class keys {
    static transactions = "transactions"
    static history = "history"
    static create = "create"
    static account = "account"
}
export interface TABScreen {
    key: string;
    title?: string;
}
export class SCRState {
    title: string
    leftIcon: string;
    leftAction: string;
    rightIcon: string;
    rightAction: string;
    searchTransaction: boolean;
    searchContact: boolean;
}
export class GlobalState {
    transactions: tr.TRStates;
    users: us.USState;
    stack: nav.NavigationStateRoute;
    tabBar: nav.NavigationStateRoute;
    header: SCRState
}
export const initialSCRState = new SCRState();
export const initialState = new GlobalState();