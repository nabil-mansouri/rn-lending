import { Address, Location } from "./models";


export interface InitPayload {
    location: Location
}
export interface InitSuccessPayload {
    type: any
    data: Address
}
export interface FetchSuccessPayload {
    type: any
    criteria: string;
    data: Address[]
}
export interface GeolocalizedSuccess {
    type: any
    data: Address
}
export interface SubmitSuccessPayload {
    type: any
    data: Location
}
export interface SearchPayload {
    criteria: string
}
export interface SelectAddressPayload {
    selected: Address 
}
//
export class LocationActions {
    static INIT = "LOCATION_INIT";
    //
    static NEED_PERMS = "LOCATION_NEED_PERMS";
    static REQUESTPERM = "LOCATION_REQUESTPERM";
    static PERMS_SUCCESS = "LOCATION_PERMS_SUCCESS";
    //
    static GEOLOCALIZE = "GEOLOCALIZE";
    static GEOLOCALIZED_SUCCESS = "GEOLOCALIZED_SUCCESS";
    static GEOLOCALIZED_FAILED = "GEOLOCALIZED_FAILED";
    //
    static SEARCH_ADDRESS = "SEARCH_ADDRESS";
    static SELECT_ADDRESS = "SELECT_ADDRESS";
    static FETCHED_SUCCESS = "LOCATION_FETCHED_SUCCESS";
    static FETCHED_FAILED = "LOCATION_FETCHED_FAILED";
    //
    static CANCEL = "LOCATION_CANCEL";
    static SUBMIT = "LOCATION_SUBMIT";
    static SUBMIT_SUCCESS = "LOCATION_SUBMIT_SUCCESS";
}