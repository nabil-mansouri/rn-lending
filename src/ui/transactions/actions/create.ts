import { Step, Picture, Transaction, Contact, TransactionErrors, StepErrors } from "../models";

/**
 * STEP
 */
export interface StepValidChangedPayload {
    type: any
    data: Step,
    errors: StepErrors
}
export interface StepChangedPayload {
    step: Step
}
export interface StepSubmitPayloadWithType {
    step: Step
    type: any
}
export interface StepRemovePayload {
    index: number;
}
/**
 * 
 */
export interface PhotoPickedPayload {
    type: any
    data: Picture[];
}
export interface PhotoSourcePayload {
    kind: "camera" | "gallery"
}
export interface PhotoRemovePayload {
    index: number;
}
/**
 * CONTACT
 */
export interface ContactGotoPayload {
    transaction: Transaction
}
export interface ContactDeletePayload {
    contact: Contact;
    transaction: Transaction
}
/**
 * LOCATION
 */
export interface LocationGotoPayload {
    transaction: Transaction
}
/**
 * 
 */
export interface TransactionSubmitPayload {
    ishare: boolean;
    transaction: Transaction
}
export interface TransactionSubmitSuccessPayload {
    transaction: Transaction
    type: any;
}
export interface ExpireOnEndPayload {
    timestamp: number;
    canceled: boolean
}
export interface ValidationChangedPayload {
    transaction: Transaction;
    errors: TransactionErrors
    type: any;
    subjectChanged?: boolean
}
export interface TransactionChangedPayload {
    transaction: Transaction;
}
export interface SubjectChangedPayload {
    transaction: Transaction;
    subject: "good" | "money"
}
/**
 * 
 */
export class TRCreateActions {
    static CREATE_GOBACK = "CREATE_GOBACK";
    static CREATE_INIT = "CREATE_INIT";
    //SUBMIT
    static TRANSACTION_SUBJECT_CHANGED = "TRANSACTION_SUBJECT_CHANGED";
    static TRANSACTION_VALIDATION_CHANGED = "TRANSACTION_VALIDATION_CHANGED";
    static TRANSACTION_CHANGED = "TRANSACTION_CHANGED";
    static TRANSACTION_SUBMIT = "TRANSACTION_SUBMIT";
    static TRANSACTION_SUBMIT_SUCCESS = "TRANSACTION_SUBMIT_SUCCESS";
    //EXPIREON
    static START_EXPIREON = "START_EXPIREON";
    static END_EXPIREON = "END_EXPIREON";
    //STEPS
    static GOTO_STEP = "GOTO_STEP";
    static STEP_DELETE = "STEP_DELETE";
    static STEP_CHANGED = "STEP_CHANGED";
    static STEP_SUBMIT = "STEP_SUBMIT";
    static STEP_CANCEL = "STEP_CANCEL";
    static STEP_VALID_CHANGED = "STEP_VALID_CHANGED";
    static STEP_SUBMIT_SUCCESS = "STEP_SUBMIT_SUCCESS";
    //LOCATION
    static GOTO_LOCATION = "GOTO_LOCATION";
    //CONTACTS
    static CONTACT_REMOVE_SUCCESS = "CONTACT_REMOVE_SUCCESS";
    static CONTACT_REMOVE = "CONTACT_REMOVE";
    static GOTO_CONTACT = "GOTO_CONTACT";
    static GOTO_CONTACT_DEST = "GOTO_CONTACT_DEST";
    //PHOTOS
    static GOTO_PHOTO = "GOTO_PHOTO";
    static PHOTO_NEED_PERMS = "PHOTO_NEED_PERMS";
    static PHOTO_REQUESTPERM = "PHOTOREQUESTPERM";
    static PHOTO_PERMS_SUCCESS = "PHOTO_PERMS_SUCCESS";
    static PHOTO_PICKED_BEGIN = "PHOTO_PICKED_BEGIN";
    static PHOTO_PICKED_SUCCESS = "PHOTO_PICKED_SUCCESS";
    static PHOTO_REMOVE = "PHOTO_REMOVE";
    static PHOTO_CANCEL = "PHOTO_CANCEL";
    static PHOTO_SOURCE = "PHOTO_SOURCE";

}