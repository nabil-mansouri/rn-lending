import { put, take, race, call, select, fork, cancel } from 'redux-saga/effects';
import { coService } from "./api";
import { ContactActions } from "./actions";
import { selectRoot } from "./selectors";
export class CONSagas {
    //
    static *contactFetchState(temp) {
        try {
            let contacts = yield coService.fetch(temp.search);
            yield put({ type: ContactActions.FETCHED_SUCCESS, data: contacts });
        }
        catch (e) {
            yield put({ type: ContactActions.FETCHED_FAILED });
        }
    }
    static *contactSearchState() {
        let fetchTask = null;
        yield put({ type: ContactActions.SEARCH_START_SUCCESS });
        while (true) {
            const { searchChange } = yield race({
                searchChange: take(ContactActions.SEARCH_CHANGE),
                searchStop: take(ContactActions.SEARCH_STOP),
            });
            if (searchChange) {
                fetchTask && (yield cancel(fetchTask));
                let temp = { search: searchChange.search };
                fetchTask = yield fork(CONSagas.contactFetchState, temp);
            }
            else {
                fetchTask && (yield cancel(fetchTask));
                yield put({ type: ContactActions.SEARCH_STOP_SUCCESS });
                break;
            }
        }
    }
    static *contactAuthorizedState() {
        let fetchTask = yield fork(CONSagas.contactFetchState, {});
        while (true) {
            yield take(ContactActions.SEARCH_START);
            fetchTask && (yield cancel(fetchTask)); //CANCEL PREVIOUS FETCH
            yield call(CONSagas.contactSearchState);
            //IF STOP SEARCH RELOAD
            fetchTask = yield fork(CONSagas.contactFetchState, {});
        }
    }
    static *validateState() {
        while (true) {
            const { submit, cancel } = yield race({
                toggle: take(ContactActions.TOGGLE),
                cancel: take(ContactActions.CANCEL),
                submit: take(ContactActions.SUBMIT)
            });
            if (submit) {
                let state = yield select(selectRoot);
                let all = yield coService.fetch();
                let contacts = all.filter(co => state.selected.indexOf(co.recordID) > -1).map(rec => coService.toContact(rec));
                yield put({ type: ContactActions.SUBMIT_SUCCESS, data: contacts });
                return 0;
            }
            else if (cancel) {
                return 0;
            }
            else {
                //TOGGLE DO NOTHIN
            }
        }
    }
    static *contactState(payload) {
        yield put({ type: ContactActions.INIT, data: payload.data, single: payload.single });
        let can = yield coService.hasPermission();
        while (!can) {
            yield put({ type: ContactActions.NEED_PERMS });
            const { perm } = yield race({
                perm: take(ContactActions.REQUESTPERM_CONTACT),
                cancel: take(ContactActions.CANCEL)
            });
            if (perm) {
                can = yield coService.requestPermission();
            }
            else {
                return 0;
            }
        }
        yield put({ type: ContactActions.PERMS_SUCCESS });
        yield race({
            fetch: call(CONSagas.contactAuthorizedState),
            valid: call(CONSagas.validateState)
        });
    }
}
//# sourceMappingURL=sagas.js.map