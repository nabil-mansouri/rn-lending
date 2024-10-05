var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import { LocationActions } from "./actions";
import { initialLOSTate } from "./state";
export class LOCReducers {
    locationFetched(state) {
        return Object.assign({}, state, { results: [] });
    }
    locationGeoSuccess(state, action) {
        return Object.assign({}, state, { results: [], criteria: action.data.formattedAddress, selected: action.data });
    }
    locationFetchFailed(state, action) {
        return Object.assign({}, state, { results: action.data, criteria: action.criteria, selected: null });
    }
    locationSubmit(state) {
        return state;
    }
    locationCreate(_, action) {
        return Object.assign({}, initialLOSTate, { selected: action.data });
    }
    initial(state = initialLOSTate) {
        return state;
    }
}
__decorate([
    BindAction(LocationActions.FETCHED_FAILED)
], LOCReducers.prototype, "locationFetched", null);
__decorate([
    BindAction(LocationActions.GEOLOCALIZED_SUCCESS)
], LOCReducers.prototype, "locationGeoSuccess", null);
__decorate([
    BindAction(LocationActions.FETCHED_SUCCESS)
], LOCReducers.prototype, "locationFetchFailed", null);
__decorate([
    BindAction(LocationActions.SUBMIT)
], LOCReducers.prototype, "locationSubmit", null);
__decorate([
    BindAction(LocationActions.INIT)
], LOCReducers.prototype, "locationCreate", null);
__decorate([
    DefaultAction()
], LOCReducers.prototype, "initial", null);
export const locReducers = exportReducers(LOCReducers);
//# sourceMappingURL=reducers.js.map