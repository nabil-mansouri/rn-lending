var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import Action from "./actions";
import { User, initialState } from "./state";
export class USReducers {
    fetchPending(state) {
        return Object.assign({}, state, { loading: true, error: false });
    }
    fetchSuccess(state, action) {
        return Object.assign({}, state, { user: action.data, loading: false, error: false });
    }
    fetchFail(state) {
        return Object.assign({}, state, { user: new User, loading: false, error: true, errorBody: "Veuillez vous connecter à internet.", errorTitle: "Connexion impossible" });
    }
    updatePending(state) {
        return Object.assign({}, state, { loading: true, error: false });
    }
    updateSuccess(state, action) {
        return Object.assign({}, state, { loading: false, error: false, user: action.user });
    }
    updateFail(state, action) {
        return Object.assign({}, state, { loading: false, error: true, user: action.user, errorBody: "Veuillez vous connecter à internet.", errorTitle: "Sauvegarde échoué" });
    }
    /**
     *
     * @param state
     */
    signInNeedPhone(state) {
        return Object.assign({}, state, { loading: false, error: false, signInCode: "", signInPhone: "", signInState: "phone" });
    }
    signInPhoneSubmit(state) {
        return Object.assign({}, state, { loading: true, error: false });
    }
    signInPhoneSubmitError(state) {
        return Object.assign({}, state, { loading: false, error: true });
    }
    signInNeedCode(state) {
        return Object.assign({}, state, { loading: false, error: false, signInState: "code" });
    }
    signInCodeSubmit(state) {
        return Object.assign({}, state, { loading: true });
    }
    signInCodeSubmitError(state) {
        return Object.assign({}, state, { loading: false, error: true });
    }
    initial(state = initialState) {
        return state;
    }
}
__decorate([
    BindAction(Action.FETCH_USER_PENDING)
], USReducers.prototype, "fetchPending", null);
__decorate([
    BindAction(Action.FETCH_USER_SUCCESS)
], USReducers.prototype, "fetchSuccess", null);
__decorate([
    BindAction(Action.FETCH_USER_FAIL)
], USReducers.prototype, "fetchFail", null);
__decorate([
    BindAction(Action.UPDATE_PENDING)
], USReducers.prototype, "updatePending", null);
__decorate([
    BindAction(Action.UPDATE_SUCCESS)
], USReducers.prototype, "updateSuccess", null);
__decorate([
    BindAction(Action.UPDATE_FAIL)
], USReducers.prototype, "updateFail", null);
__decorate([
    BindAction(Action.SIGNIN_NEED_PHONE)
], USReducers.prototype, "signInNeedPhone", null);
__decorate([
    BindAction(Action.SIGNIN_PHONE_SUBMIT)
], USReducers.prototype, "signInPhoneSubmit", null);
__decorate([
    BindAction(Action.SIGNIN_PHONE_SUBMIT_ERROR)
], USReducers.prototype, "signInPhoneSubmitError", null);
__decorate([
    BindAction(Action.SIGNIN_NEED_CODE)
], USReducers.prototype, "signInNeedCode", null);
__decorate([
    BindAction(Action.SIGNIN_CODE_SUBMIT)
], USReducers.prototype, "signInCodeSubmit", null);
__decorate([
    BindAction(Action.SIGNIN_CODE_SUBMIT_ERROR)
], USReducers.prototype, "signInCodeSubmitError", null);
__decorate([
    DefaultAction()
], USReducers.prototype, "initial", null);
export const usReducers = exportReducers(USReducers);
//# sourceMappingURL=reducers.js.map