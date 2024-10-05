var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import { ContactActions } from "./actions";
import { initialCOState } from "./state";
export class CONReducers {
    contactInit(_, payload) {
        return Object.assign({}, initialCOState, { single: payload.single, selected: payload.data.map(c => c.recordId) });
    }
    contactPermSuccess(state) {
        return Object.assign({}, state);
    }
    contactFetched(state, action) {
        let contacts = action.data.map(co => {
            co.selected = state.selected.indexOf(co.recordID) > -1;
            return co;
        });
        return Object.assign({}, state, { loading: false, contacts });
    }
    contactChanged(state, action) {
        let selected = [...state.selected];
        let toUnselect = [];
        if (state.single) {
            while (selected.length > 1) {
                toUnselect.push(selected.pop());
            }
        }
        let contacts = state.contacts.map(co => {
            if (co.recordID == action.selected.recordID) {
                let sel = !co.selected;
                if (sel) {
                    selected.push(co.recordID);
                }
                else {
                    selected = selected.filter(s => s != co.recordID);
                }
                return Object.assign({}, co, { selected: !co.selected });
            }
            //
            if (toUnselect.indexOf(co.recordID) > -1) {
                return Object.assign({}, co, { selected: false });
            }
            return co;
        });
        return Object.assign({}, state, { contacts, selected });
    }
    contactSubmit(state) {
        return state;
    }
    startSearchSuccess(state) {
        return Object.assign({}, state, { searching: true });
    }
    stopSearchSuccess(state) {
        return Object.assign({}, state, { searching: false });
    }
    initial(state = initialCOState) {
        return state;
    }
}
__decorate([
    BindAction(ContactActions.INIT)
], CONReducers.prototype, "contactInit", null);
__decorate([
    BindAction(ContactActions.PERMS_SUCCESS)
], CONReducers.prototype, "contactPermSuccess", null);
__decorate([
    BindAction(ContactActions.FETCHED_SUCCESS)
], CONReducers.prototype, "contactFetched", null);
__decorate([
    BindAction(ContactActions.TOGGLE)
], CONReducers.prototype, "contactChanged", null);
__decorate([
    BindAction(ContactActions.SUBMIT_SUCCESS)
], CONReducers.prototype, "contactSubmit", null);
__decorate([
    BindAction(ContactActions.SEARCH_START_SUCCESS)
], CONReducers.prototype, "startSearchSuccess", null);
__decorate([
    BindAction(ContactActions.SEARCH_STOP_SUCCESS)
], CONReducers.prototype, "stopSearchSuccess", null);
__decorate([
    DefaultAction()
], CONReducers.prototype, "initial", null);
export const conReducers = exportReducers(CONReducers);
//# sourceMappingURL=reducer.js.map