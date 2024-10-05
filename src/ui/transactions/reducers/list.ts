import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import * as actions from "../actions";
import { TRListActions } from "../actions"
import { TRListState, initialListState } from "../state";
export { TRListActions }
export class TRReducers {
    @BindAction(TRListActions.FETCH_DATA_PENDING)
    fetchPending(state: TRListState, action: actions.FetchingPayload): TRListState {
        return { ...state, transactions: [], loading: true, criteria: action.search };
    }
    @BindAction(TRListActions.FETCH_DATA_SUCCESS)
    fetchSuccess(state: TRListState, action: actions.FetchSuccessPayload): TRListState {
        return { ...state, transactions: action.data, loading: false };
    }
    @BindAction(TRListActions.FETCH_DATA_FAIL)
    fetchFail(state: TRListState): TRListState {
        return { ...state, transactions: [], loading: false };
    }
    @BindAction(TRListActions.DETAIL_CANCEL)
    cancel(state: TRListState): TRListState {
        return { ...state, current: null };
    }
    @BindAction(TRListActions.DETAIL_FINISH)
    finish(state: TRListState): TRListState {
        return { ...state, current: null };
    }
    @BindAction(TRListActions.DETAIL_LOADING)
    detailLoading(state: TRListState): TRListState {
        return { ...state, loading: true, current: null };
    }
    @BindAction(TRListActions.DETAIL_LOAD_SUCCESS)
    detailLoadSuccess(state: TRListState, action: actions.DetailPayload): TRListState {
        return { ...state, loading: false, current: action.transaction };
    }
    @BindAction(TRListActions.SEARCH_START_SUCCESS)
    startSearchSuccess(state: TRListState): TRListState {
        return { ...state, searching: true };
    }
    @BindAction(TRListActions.SEARCH_STOP_SUCCESS)
    stopSearchSuccess(state: TRListState): TRListState {
        return { ...state, searching: false };
    }
    @DefaultAction()
    initial(state: TRListState = initialListState) {
        return state;
    }
}
export const trListReducers = exportReducers<TRListState>(TRReducers);