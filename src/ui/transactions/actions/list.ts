import { Action } from "redux";
import { Transaction } from "../models";

export interface FetchingPayload {
    search?: string;
    history: boolean;
}
export type FetchingPayloadWithType = FetchingPayload & Action;
export interface FetchSuccessPayload {
    type: any;
    data: Transaction[]
}
/**
 * 
 */
export interface DetailPayload {
    transaction?: Transaction;
}
export interface DetailSucceessPayload {
    type: any;
    transaction: Transaction
}
/**
 * 
 */
export class TRListActions {
    //FETCH
    static FETCH_DATA_PENDING = "FETCH_DATA_PENDING";
    static FETCH_DATA_FAIL = "FETCH_DATA_FAIL";
    static FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
    //DETAIL
    static GOTO_DETAIL = "GOTO_DETAIL";
    static DETAIL_LOADING = "DETAIL_LOADING";
    static DETAIL_LOAD_SUCCESS = "DETAIL_LOAD_SUCCESS";
    static DETAIL_FINISH = "DETAIL_FINISH";
    static DETAIL_CANCEL = "DETAIL_CANCEL";
    static DETAIL_CANCEL_SUCCESS = "DETAIL_CANCEL_SUCCESS";
    static DETAIL_GOBACK = "DETAIL_GOBACK";
    //SEARCH
    static SEARCH_START = "SEARCH_START";
    static SEARCH_START_SUCCESS = "SEARCH_START_SUCCESS";
    static SEARCH_CHANGE = "SEARCH_CHANGE";
    static SEARCH_STOP = "SEARCH_STOP";
    static SEARCH_STOP_SUCCESS = "SEARCH_STOP_SUCCESS";
    //ACTIONS
    static TRANSACTION_FINISH = "TRANSACTION_FINISH";
    static TRANSACTION_CANCEL = "TRANSACTION_CANCEL";
}