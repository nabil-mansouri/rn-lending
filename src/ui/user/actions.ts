import { User } from "./models";
export default class Action {
    static SIGNIN_NEED_PHONE = "SIGNIN_NEED_PHONE";
    static SIGNIN_PHONE_SUBMIT = "SIGNIN_PHONE_SUBMIT";
    static SIGNIN_PHONE_SUBMIT_ERROR = "SIGNIN_PHONE_SUBMIT_ERROR";
    static SIGNIN_NEED_CODE = "SIGNIN_NEED_CODE";
    static SIGNIN_CODE_SUBMIT = "SIGNIN_CODE_SUBMIT";
    static SIGNIN_CODE_SUBMIT_ERROR = "SIGNIN_CODE_SUBMIT_ERROR";
    static FETCH_USER_PENDING = "FETCH_USER_PENDING";
    static FETCH_USER_FAIL = "FETCH_USER_FAIL";
    static FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
    static UPDATE_USER = "UPDATE_USER";
    static UPDATE_PENDING = "UPDATE_PENDING";
    static UPDATE_SUCCESS = "UPDATE_SUCCESS";
    static UPDATE_FAIL = "UPDATE_FAIL";
}

export interface PhoneSubmitPayload {
    phone: string;
}
export interface CodeSubmitPayload {
    code: string;
}
export interface FetchSuccessPayload {
    type: string;
    data: User
}
export interface UpdateSuccessPayload {
    type: string;
    user: User
}