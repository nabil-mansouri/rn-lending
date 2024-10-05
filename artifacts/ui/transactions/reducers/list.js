var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import { TRListActions } from "../actions";
import { initialListState } from "../state";
export { TRListActions };
export class TRReducers {
    fetchPending(state, action) {
        return Object.assign({}, state, { transactions: [], loading: true, criteria: action.search });
    }
    fetchSuccess(state, action) {
        return Object.assign({}, state, { transactions: action.data, loading: false });
    }
    fetchFail(state) {
        return Object.assign({}, state, { transactions: [], loading: false });
    }
    cancel(state) {
        return Object.assign({}, state, { current: null });
    }
    finish(state) {
        return Object.assign({}, state, { current: null });
    }
    detailLoading(state) {
        return Object.assign({}, state, { loading: true, current: null });
    }
    detailLoadSuccess(state, action) {
        return Object.assign({}, state, { loading: false, current: action.transaction });
    }
    startSearchSuccess(state) {
        return Object.assign({}, state, { searching: true });
    }
    stopSearchSuccess(state) {
        return Object.assign({}, state, { searching: false });
    }
    initial(state = initialListState) {
        return state;
    }
}
__decorate([
    BindAction(TRListActions.FETCH_DATA_PENDING)
], TRReducers.prototype, "fetchPending", null);
__decorate([
    BindAction(TRListActions.FETCH_DATA_SUCCESS)
], TRReducers.prototype, "fetchSuccess", null);
__decorate([
    BindAction(TRListActions.FETCH_DATA_FAIL)
], TRReducers.prototype, "fetchFail", null);
__decorate([
    BindAction(TRListActions.DETAIL_CANCEL)
], TRReducers.prototype, "cancel", null);
__decorate([
    BindAction(TRListActions.DETAIL_FINISH)
], TRReducers.prototype, "finish", null);
__decorate([
    BindAction(TRListActions.DETAIL_LOADING)
], TRReducers.prototype, "detailLoading", null);
__decorate([
    BindAction(TRListActions.DETAIL_LOAD_SUCCESS)
], TRReducers.prototype, "detailLoadSuccess", null);
__decorate([
    BindAction(TRListActions.SEARCH_START_SUCCESS)
], TRReducers.prototype, "startSearchSuccess", null);
__decorate([
    BindAction(TRListActions.SEARCH_STOP_SUCCESS)
], TRReducers.prototype, "stopSearchSuccess", null);
__decorate([
    DefaultAction()
], TRReducers.prototype, "initial", null);
export const trListReducers = exportReducers(TRReducers);
//# sourceMappingURL=list.js.map