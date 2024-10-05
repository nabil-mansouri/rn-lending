var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import { TRCreateActions, LocationActions, ContactActions } from "../actions";
import { initialCreateState, Transaction, STState, Step, TransactionErrors, Money } from "../state";
export class TRCreateReducers {
    /**
     * CONTACT
     */
    destPick(state) {
        return Object.assign({}, state, { pickDest: true });
    }
    contactsPick(state) {
        return Object.assign({}, state, { pickDest: false });
    }
    contactSubmit(state, action) {
        let s = Object.assign({}, state);
        s.current = Object.assign(new Transaction, state.current);
        if (s.pickDest) {
            s.current.other = action.data[0];
        }
        else {
            s.current.telltales = [...action.data];
        }
        return s;
    }
    /**
     *  LOCATION
     */
    locationInit(state) {
        return Object.assign({}, state, { pickLocation: true });
    }
    locationCancel(state) {
        return Object.assign({}, state, { pickLocation: false });
    }
    locationSubmit(state, action) {
        let s = Object.assign({}, state, { pickLocation: false });
        s.current = Object.assign(new Transaction, state.current);
        s.current.location = action.data;
        return s;
    }
    /**
     *  STEP
     */
    stepInit(state) {
        let s = Object.assign({}, state);
        s.step = new STState;
        return s;
    }
    stepNotValid(state, action) {
        let s = Object.assign({}, state);
        s.step = Object.assign({}, state.step, { valid: !action.errors.hasErrors(), validation: action.errors, showCalendar: false });
        s.step.step = Object.assign(new Step, state.step.step, action.data);
        return s;
    }
    stepSubmit(state) {
        let s = Object.assign({}, state);
        s.current = Object.assign(new Transaction, state.current);
        let mondeyDetail = s.current.moneyDetail = Object.assign(new Money, state.current.moneyDetail);
        mondeyDetail.steps.push(s.step.step);
        mondeyDetail.steps = mondeyDetail.steps.sort((a1, a2) => {
            return a1.expireOn - a2.expireOn;
        });
        if (mondeyDetail.sumSteps > mondeyDetail.amount) {
            mondeyDetail.amount = mondeyDetail.sumSteps;
        }
        return s;
    }
    stepRemove(state, act) {
        let s = Object.assign({}, state);
        s.current = Object.assign(new Transaction, state.current);
        s.current.moneyDetail.steps = state.current.moneyDetail.steps.filter((_, i) => i != act.index);
        return s;
    }
    /**
     *  PHOTOS
     */
    pickBegin(state) {
        return Object.assign({}, state, { pickPhoto: true });
    }
    pickSuccess(state, action) {
        let s = Object.assign({}, state, { pickPhoto: false });
        s.current = Object.assign(new Transaction, state.current);
        s.current.pictures = [...s.current.pictures, ...action.data];
        return s;
    }
    pickEnd(state) {
        return Object.assign({}, state, { pickPhoto: false });
    }
    removePhoto(state, action) {
        let s = Object.assign({}, state);
        s.current = Object.assign(new Transaction, state.current);
        let pictures = [...s.current.pictures];
        pictures.splice(action.index, 1);
        s.current.pictures = pictures;
        return s;
    }
    /**
     *  EXPIREON
     */
    finishAtStart(state) {
        return Object.assign({}, state, { pickDate: true });
    }
    finishAtEnd(state, action) {
        let s = Object.assign({}, state, { pickDate: false });
        s.current = Object.assign(new Transaction, state.current);
        let expireValid = action.timestamp > 0 ? null : state.validation.expireOn;
        s.validation = Object.assign(new TransactionErrors, s.validation, { expireOn: expireValid });
        !action.canceled && (s.current.expireOnMS = action.timestamp);
        return s;
    }
    /**
     * TRANSACTION
     */
    transactionInit(state) {
        let validation = new TransactionErrors;
        validation.amount = { empty: true };
        validation.expireOn = { empty: true };
        validation.other = { empty: true };
        validation.subject = { empty: true };
        validation.title = { empty: true };
        validation.type = { empty: true };
        return Object.assign({}, state, { validation, current: new Transaction });
    }
    transactionValidation(state, action) {
        let s = Object.assign({}, state, { validation: action.errors });
        s.current = Object.assign(new Transaction, state.current, action.transaction);
        return s;
    }
    /**
     * INIT
     */
    initial(state = initialCreateState) {
        return state;
    }
}
__decorate([
    BindAction([TRCreateActions.GOTO_CONTACT_DEST])
], TRCreateReducers.prototype, "destPick", null);
__decorate([
    BindAction([TRCreateActions.GOTO_CONTACT])
], TRCreateReducers.prototype, "contactsPick", null);
__decorate([
    BindAction([ContactActions.SUBMIT_SUCCESS, TRCreateActions.CONTACT_REMOVE_SUCCESS])
], TRCreateReducers.prototype, "contactSubmit", null);
__decorate([
    BindAction(LocationActions.INIT)
], TRCreateReducers.prototype, "locationInit", null);
__decorate([
    BindAction(LocationActions.CANCEL)
], TRCreateReducers.prototype, "locationCancel", null);
__decorate([
    BindAction(LocationActions.SUBMIT)
], TRCreateReducers.prototype, "locationSubmit", null);
__decorate([
    BindAction(TRCreateActions.GOTO_STEP)
], TRCreateReducers.prototype, "stepInit", null);
__decorate([
    BindAction(TRCreateActions.STEP_VALID_CHANGED)
], TRCreateReducers.prototype, "stepNotValid", null);
__decorate([
    BindAction(TRCreateActions.STEP_SUBMIT_SUCCESS)
], TRCreateReducers.prototype, "stepSubmit", null);
__decorate([
    BindAction(TRCreateActions.STEP_DELETE)
], TRCreateReducers.prototype, "stepRemove", null);
__decorate([
    BindAction(TRCreateActions.PHOTO_PICKED_BEGIN)
], TRCreateReducers.prototype, "pickBegin", null);
__decorate([
    BindAction([TRCreateActions.PHOTO_PICKED_SUCCESS])
], TRCreateReducers.prototype, "pickSuccess", null);
__decorate([
    BindAction([TRCreateActions.PHOTO_CANCEL])
], TRCreateReducers.prototype, "pickEnd", null);
__decorate([
    BindAction([TRCreateActions.PHOTO_REMOVE])
], TRCreateReducers.prototype, "removePhoto", null);
__decorate([
    BindAction([TRCreateActions.START_EXPIREON])
], TRCreateReducers.prototype, "finishAtStart", null);
__decorate([
    BindAction([TRCreateActions.END_EXPIREON])
], TRCreateReducers.prototype, "finishAtEnd", null);
__decorate([
    BindAction(TRCreateActions.CREATE_INIT)
], TRCreateReducers.prototype, "transactionInit", null);
__decorate([
    BindAction(TRCreateActions.TRANSACTION_VALIDATION_CHANGED)
], TRCreateReducers.prototype, "transactionValidation", null);
__decorate([
    DefaultAction()
], TRCreateReducers.prototype, "initial", null);
export const trCreateReducers = exportReducers(TRCreateReducers);
//# sourceMappingURL=create.js.map