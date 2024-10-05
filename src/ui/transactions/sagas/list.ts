import { put, take, race, call, fork, cancel } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { Routes } from "../navigation"
import { Transaction } from "../models";
import { trService } from "../api";
import { TRListActions, DetailPayload, FetchingPayload } from "../actions";
import * as actions from "../actions";

export class TRListSagas {
    static * detailState(dDetail: DetailPayload) {
        yield put(NavigationActions.navigate({ routeName: Routes.DETAILS }));
        yield put({ type: TRListActions.DETAIL_LOADING, data: dDetail.transaction });
        let transaction = yield trService.get(dDetail.transaction);
        yield put<actions.DetailSucceessPayload>({ type: TRListActions.DETAIL_LOAD_SUCCESS, transaction });
        const { cancel, finish } = yield race({
            cancel: take(TRListActions.DETAIL_CANCEL),
            finish: take(TRListActions.TRANSACTION_FINISH),
            back: take(TRListActions.DETAIL_GOBACK)
        });
        if (cancel) {
            yield trService.cancel(transaction)
            yield put({ type: TRListActions.DETAIL_CANCEL_SUCCESS });
        } else if (finish) {
            yield trService.finish(transaction)
            yield put({ type: TRListActions.DETAIL_FINISH });
        } else {
            return 0;
        }
    }
    static * fetchState(payload: FetchingPayload) {
        while (true) {
            yield put<actions.FetchingPayloadWithType>({ type: TRListActions.FETCH_DATA_PENDING, ...payload });
            let data: Transaction[] = yield trService.fetch(payload.history, payload.search);
            yield put<actions.FetchSuccessPayload>({ type: TRListActions.FETCH_DATA_SUCCESS, data });
            //GO TO DETAIL
            const detail: DetailPayload = yield take(TRListActions.GOTO_DETAIL);
            yield call(TRListSagas.detailState, detail);
        }
    }
    static * searchState(payload: FetchingPayload) {
        let fetchTask = null;
        yield put({ type: TRListActions.SEARCH_START_SUCCESS });
        while (true) {
            const { searchChange } = yield race({
                searchChange: take(TRListActions.SEARCH_CHANGE),
                searchStop: take(TRListActions.SEARCH_STOP),
            })
            if (searchChange) {
                fetchTask && (yield cancel(fetchTask));
                let temp: FetchingPayload = { history: payload.history, search: searchChange.search }
                fetchTask = yield fork(TRListSagas.fetchState, temp);
            } else {
                fetchTask && (yield cancel(fetchTask));
                yield put({ type: TRListActions.SEARCH_STOP_SUCCESS });
                break;
            }
        }
    }
    static * initState(payload: FetchingPayload) {
        let fetchTask = yield fork(TRListSagas.fetchState, payload);
        while (true) {
            yield take(TRListActions.SEARCH_START);
            fetchTask && (yield cancel(fetchTask));//CANCEL PREVIOUS FETCH
            yield call(TRListSagas.searchState, payload);
            //IF STOP SEARCH RELOAD
            fetchTask = yield fork(TRListSagas.fetchState, payload);
        }
    }
}