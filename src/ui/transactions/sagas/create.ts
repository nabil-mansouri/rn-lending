import { put, take, race, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { Routes } from "../navigation"
import { Picture, Transaction, StepErrors } from "../models";
import { trService, phoService, coService } from "../api";
import { selectStep, selectCreate } from "../selectors";
import * as actions from "../actions";
import { TRCreateActions } from "../actions";
import * as loc from "../../locations";
import * as con from "../../contacts";
import { TRCreateState, TransactionErrors, STState } from '../state';

export class TRCreateSagas {
    static * stepState() {
        yield put(NavigationActions.navigate({ routeName: Routes.CREATE_STEP }))
        //VALIDATE STEP
        let create: TRCreateState = yield select(selectCreate)
        let step = yield select(selectStep)
        step.amount = trService.computeMaxStepAmount(create.current);//INIT WITH VALUE BEFORE VALIDATE
        let errors: StepErrors = yield call(trService.validateStep, step);
        yield put<actions.StepValidChangedPayload>({ errors, type: TRCreateActions.STEP_VALID_CHANGED, data: step })
        //
        while (true) {
            const { submit, changed } = yield race({
                changed: take(TRCreateActions.STEP_CHANGED),
                submit: take(TRCreateActions.STEP_SUBMIT),
                cancel: take(TRCreateActions.STEP_CANCEL)
            });
            if (changed) {
                let temp: actions.StepChangedPayload = changed;
                let errors: StepErrors = yield call(trService.validateStep, temp.step);
                yield put<actions.StepValidChangedPayload>({ errors, type: TRCreateActions.STEP_VALID_CHANGED, data: temp.step })
            } else if (submit) {
                let temp: STState = yield select(selectStep);
                let errors: StepErrors = yield call(trService.validateStep, temp.step);
                if (errors.hasErrors()) {
                    yield put<actions.StepValidChangedPayload>({ errors, type: TRCreateActions.STEP_VALID_CHANGED, data: temp.step })
                } else {
                    yield put<actions.StepSubmitPayloadWithType>({ type: TRCreateActions.STEP_SUBMIT_SUCCESS, step: temp.step })
                    return 0;
                }
            } else {
                return 0;
            }
        }
    }
    static * photo() {
        yield put({ type: TRCreateActions.PHOTO_PICKED_BEGIN });
        const { source, cancel } = yield race({
            source: take(TRCreateActions.PHOTO_SOURCE),
            cancel: take(TRCreateActions.PHOTO_CANCEL)
        })
        let temp: actions.PhotoSourcePayload = source;
        if (cancel) {
            return null;
        }
        //
        let can: boolean = yield phoService.hasPermission();
        while (!can) {
            yield put({ type: TRCreateActions.PHOTO_NEED_PERMS });
            const { perm } = yield race({
                perm: take(TRCreateActions.PHOTO_REQUESTPERM),
                cancel: take(TRCreateActions.PHOTO_CANCEL)
            });
            if (perm) {
                can = yield phoService.requestPermission();
            } else {
                return null;
            }
        }
        yield put({ type: TRCreateActions.PHOTO_PERMS_SUCCESS });
        let picked: Picture[] = yield phoService.pick(temp.kind == "gallery");
        yield put<actions.PhotoPickedPayload>({ type: TRCreateActions.PHOTO_PICKED_SUCCESS, data: picked })
    }
    static * createState() {
        yield put({ type: TRCreateActions.CREATE_INIT });
        while (true) {
            //VALIDATE TRANSACTION
            let createState: TRCreateState = yield select(selectCreate)
            let errors: TransactionErrors = yield call(trService.validate, createState.current);
            yield put<actions.ValidationChangedPayload>({ errors, type: TRCreateActions.TRANSACTION_VALIDATION_CHANGED, transaction: createState.current })
            //
            const { changed, subjectChanged, contact, contactRemove, telltales, location, step, photo, submit } = yield race({
                contactRemove: take(TRCreateActions.CONTACT_REMOVE),
                contact: take(TRCreateActions.GOTO_CONTACT_DEST),
                telltales: take(TRCreateActions.GOTO_CONTACT),
                location: take(TRCreateActions.GOTO_LOCATION),
                step: take(TRCreateActions.GOTO_STEP),
                photo: take(TRCreateActions.GOTO_PHOTO),
                submit: take(TRCreateActions.TRANSACTION_SUBMIT),
                changed: take(TRCreateActions.TRANSACTION_CHANGED),
                subjectChanged: take(TRCreateActions.TRANSACTION_SUBJECT_CHANGED)
            });
            if (changed) {
                let temp: actions.TransactionChangedPayload = changed;
                let errors = trService.validate(temp.transaction);
                yield put<actions.ValidationChangedPayload>({ errors, transaction: temp.transaction, type: TRCreateActions.TRANSACTION_VALIDATION_CHANGED })
            } else if (subjectChanged) {
                let temp: actions.SubjectChangedPayload = subjectChanged;
                let transaction = trService.changeType(temp.transaction, temp.subject);
                let errors = trService.validate(temp.transaction);
                yield put<actions.ValidationChangedPayload>({ subjectChanged: true, errors, transaction, type: TRCreateActions.TRANSACTION_VALIDATION_CHANGED })
            } else if (contact) {
                let temp: actions.ContactGotoPayload = contact;
                let co: con.InitPayload = { data: [temp.transaction.receiver], single: true }
                yield put(NavigationActions.navigate({ routeName: Routes.CREATE_CONTACT }));
                yield call(con.CONSagas.contactState, co);
                yield put({ type: TRCreateActions.CREATE_GOBACK });
            } else if (telltales) {
                let temp: actions.ContactGotoPayload = telltales;
                let co: con.InitPayload = { data: temp.transaction.telltales, single: false }
                yield put(NavigationActions.navigate({ routeName: Routes.CREATE_TELLTALE }));
                yield call(con.CONSagas.contactState, co);
                yield put({ type: TRCreateActions.CREATE_GOBACK });
            } else if (contactRemove) {
                let temp: actions.ContactDeletePayload = contactRemove;
                let contacts = coService.remove(temp.contact, temp.transaction.telltales);
                yield put<actions.ContactSubmitSuccessPayload>({ type: TRCreateActions.CONTACT_REMOVE_SUCCESS, data: contacts })
            } else if (location) {
                let temp: actions.LocationGotoPayload = location;
                let co: loc.InitPayload = { location: temp.transaction.location }
                //yield put(NavigationActions.navigate({ routeName: Routes.CREATE_LOCATION }));
                yield call(loc.LOCSagas.locationState, co);
                //yield put({ type: TRCreateActions.CREATE_GOBACK });
            } else if (step) {
                yield call(TRCreateSagas.stepState);
                yield put({ type: TRCreateActions.CREATE_GOBACK });
            } else if (photo) {
                yield call(TRCreateSagas.photo);
            } else {//SUBMIT
                let temp: actions.TransactionSubmitPayload = submit;
                let tr: Transaction = yield trService.create(temp.transaction, temp.ishare);
                yield put<actions.TransactionSubmitSuccessPayload>({ type: TRCreateActions.TRANSACTION_SUBMIT_SUCCESS, transaction: tr })
                yield put(NavigationActions.navigate({ routeName: Routes.TRANSACTION }));
            }
        }
    }
}