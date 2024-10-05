import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import {
    TRCreateActions, LocationActions, PhotoPickedPayload, ValidationChangedPayload,
    PhotoRemovePayload, ExpireOnEndPayload, ContactActions,
    ContactSubmitSuccessPayload, LocationSubmitSuccessPayload, StepValidChangedPayload, StepRemovePayload
} from "../actions"
import { TRCreateState, initialCreateState, Transaction, STState, Step, TransactionErrors, Money } from "../state";

export class TRCreateReducers {
    /**
     * CONTACT
     */
    @BindAction([TRCreateActions.GOTO_CONTACT_DEST])
    destPick(state: TRCreateState): TRCreateState {
        return { ...state, pickDest: true };
    }
    @BindAction([TRCreateActions.GOTO_CONTACT])
    contactsPick(state: TRCreateState): TRCreateState {
        return { ...state, pickDest: false };
    }
    @BindAction([ContactActions.SUBMIT_SUCCESS, TRCreateActions.CONTACT_REMOVE_SUCCESS])
    contactSubmit(state: TRCreateState, action: ContactSubmitSuccessPayload): TRCreateState {
        let s = { ...state };
        s.current = Object.assign(new Transaction, state.current);
        if (s.pickDest) {
            s.current.other = action.data[0];
        } else {
            s.current.telltales = [...action.data];
        }
        return s;
    }
    /**
     *  LOCATION
     */
    @BindAction(LocationActions.INIT)
    locationInit(state: TRCreateState): TRCreateState {
        return { ...state, pickLocation: true };
    }
    @BindAction(LocationActions.CANCEL)
    locationCancel(state: TRCreateState): TRCreateState {
        return { ...state, pickLocation: false };
    }
    @BindAction(LocationActions.SUBMIT)
    locationSubmit(state: TRCreateState, action: LocationSubmitSuccessPayload): TRCreateState {
        let s = { ...state, pickLocation: false };
        s.current = Object.assign(new Transaction, state.current);
        s.current.location = action.data;
        return s;
    }
    /**
     *  STEP
     */
    @BindAction(TRCreateActions.GOTO_STEP)
    stepInit(state: TRCreateState): TRCreateState {
        let s = { ...state };
        s.step = new STState
        return s;
    }
    @BindAction(TRCreateActions.STEP_VALID_CHANGED)
    stepNotValid(state: TRCreateState, action: StepValidChangedPayload): TRCreateState {
        let s = { ...state };
        s.step = { ...state.step, valid: !action.errors.hasErrors(), validation: action.errors, showCalendar: false };
        s.step.step = Object.assign(new Step, state.step.step, action.data)
        return s;
    }
    @BindAction(TRCreateActions.STEP_SUBMIT_SUCCESS)
    stepSubmit(state: TRCreateState): TRCreateState {
        let s = { ...state };
        s.current = Object.assign(new Transaction, state.current);
        let mondeyDetail = s.current.moneyDetail = Object.assign(new Money, state.current.moneyDetail);
        mondeyDetail.steps.push(s.step.step);
        mondeyDetail.steps = mondeyDetail.steps.sort((a1, a2) => {
            return a1.expireOn - a2.expireOn;
        })
        if (mondeyDetail.sumSteps > mondeyDetail.amount) {
            mondeyDetail.amount = mondeyDetail.sumSteps;
        }
        return s;
    }
    @BindAction(TRCreateActions.STEP_DELETE)
    stepRemove(state: TRCreateState, act: StepRemovePayload): TRCreateState {
        let s = { ...state };
        s.current = Object.assign(new Transaction, state.current);
        s.current.moneyDetail.steps = state.current.moneyDetail.steps.filter((_, i) => i != act.index);
        return s;
    }
    /**
     *  PHOTOS
     */
    @BindAction(TRCreateActions.PHOTO_PICKED_BEGIN)
    pickBegin(state: TRCreateState): TRCreateState {
        return { ...state, pickPhoto: true }
    }
    @BindAction([TRCreateActions.PHOTO_PICKED_SUCCESS])
    pickSuccess(state: TRCreateState, action: PhotoPickedPayload): TRCreateState {
        let s = { ...state, pickPhoto: false }
        s.current = Object.assign(new Transaction, state.current);
        s.current.pictures = [...s.current.pictures, ...action.data];
        return s;
    }
    @BindAction([TRCreateActions.PHOTO_CANCEL])
    pickEnd(state: TRCreateState): TRCreateState {
        return { ...state, pickPhoto: false }
    }
    @BindAction([TRCreateActions.PHOTO_REMOVE])
    removePhoto(state: TRCreateState, action: PhotoRemovePayload): TRCreateState {
        let s = { ...state }
        s.current = Object.assign(new Transaction, state.current);
        let pictures = [...s.current.pictures];
        pictures.splice(action.index, 1)
        s.current.pictures = pictures;
        return s;
    }
    /**
     *  EXPIREON
     */
    @BindAction([TRCreateActions.START_EXPIREON])
    finishAtStart(state: TRCreateState): TRCreateState {
        return { ...state, pickDate: true }
    }
    @BindAction([TRCreateActions.END_EXPIREON])
    finishAtEnd(state: TRCreateState, action: ExpireOnEndPayload): TRCreateState {
        let s = { ...state, pickDate: false }
        s.current = Object.assign(new Transaction, state.current);
        let expireValid = action.timestamp > 0 ? null : state.validation.expireOn;
        s.validation = Object.assign(new TransactionErrors, s.validation, { expireOn: expireValid })
        !action.canceled && (s.current.expireOnMS = action.timestamp)
        return s;
    }
    /**
     * TRANSACTION
     */
    @BindAction(TRCreateActions.CREATE_INIT)
    transactionInit(state: TRCreateState): TRCreateState {
        let validation = new TransactionErrors;
        validation.amount = { empty: true }
        validation.expireOn = { empty: true }
        validation.other = { empty: true }
        validation.subject = { empty: true }
        validation.title = { empty: true }
        validation.type = { empty: true }
        return { ...state, validation, current: new Transaction };
    }
    @BindAction(TRCreateActions.TRANSACTION_VALIDATION_CHANGED)
    transactionValidation(state: TRCreateState, action: ValidationChangedPayload): TRCreateState {
        let s = { ...state, validation: action.errors };
        s.current = Object.assign(new Transaction, state.current, action.transaction)
        return s;
    }
    /**
     * INIT
     */
    @DefaultAction()
    initial(state: TRCreateState = initialCreateState) {
        return state;
    }
}
export const trCreateReducers = exportReducers<TRCreateState>(TRCreateReducers);