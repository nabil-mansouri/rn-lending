import { Contact, ContactRecord } from "./models";
import { Action } from "redux";

export interface InitPayload {
    data: Contact[]
    single: boolean;
}
export type InitPayloadWithType = InitPayload & Action;
export interface FetchingPayload {
    search?: string
}
export interface SubmitSuccessPayload {
    type: any
    data: Contact[]
}
export interface TogglePayload {
    selected: ContactRecord;
}
export interface FetchedSuccessPayload {
    type: any
    data: ContactRecord[]
}
/**
 * 
 */
export class ContactActions {
    // 
    static INIT = "CONTACT_INIT";
    //PERMS
    static NEED_PERMS = "CONTACT_NEED_PERMS";
    static PERMS_SUCCESS = "CONTACT_PERMS_SUCCESS";
    static REQUESTPERM_CONTACT = "CONTACT_REQUESTPERM_CONTACT";
    //FETCH
    static FETCH = "CONTACT_FETCH";
    static FETCHED_SUCCESS = "CONTACT_FETCHED_SUCCESS";
    static FETCHED_FAILED = "CONTACT_FETCHED_FAILED";
    //ACTIONS
    static TOGGLE = "CONTACT_TOGGLE";
    static CANCEL = "CONTACT_CANCEL";
    static SUBMIT = "CONTACT_SUBMIT";
    static SUBMIT_SUCCESS = "CONTACT_SUBMIT_SUCCESS";
    //SEARCH
    static SEARCH_START = "CONTACT_SEARCH_START";
    static SEARCH_START_SUCCESS = "CONTACT_SEARCH_START_SUCCESS";
    static SEARCH_CHANGE = "CONTACT_SEARCH_CHANGE";
    static SEARCH_STOP = "CONTACT_SEARCH_STOP";
    static SEARCH_STOP_SUCCESS = "CONTACT_SEARCH_STOP_SUCCESS";
    //
}