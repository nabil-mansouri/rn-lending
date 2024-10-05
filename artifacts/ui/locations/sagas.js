import { put, take, race, call, select } from 'redux-saga/effects';
import { loService } from "./api";
import { Location } from "./models";
import { LocationActions } from "./actions";
import { selectRoot } from './selectors';
export class LOCSagas {
    //
    static *locationAuthorizedState() {
        while (true) {
            try {
                const { selectAddr, geo, search, submit } = yield race({
                    geo: take(LocationActions.GEOLOCALIZE),
                    search: take(LocationActions.SEARCH_ADDRESS),
                    selectAddr: take(LocationActions.SELECT_ADDRESS),
                    submit: take(LocationActions.SUBMIT),
                    cancel: take(LocationActions.CANCEL)
                });
                if (geo) {
                    let addresses = yield loService.geolocalize();
                    if (addresses.length) {
                        yield put({ type: LocationActions.GEOLOCALIZED_SUCCESS, data: addresses[0] });
                    }
                    else {
                        yield put({ type: LocationActions.GEOLOCALIZED_FAILED });
                    }
                }
                else if (search) {
                    let temp = search;
                    try {
                        let addresses = yield call(loService.search, temp.criteria);
                        yield put({ type: LocationActions.FETCHED_SUCCESS, data: addresses, criteria: temp.criteria });
                    }
                    catch (e) {
                        yield put({ type: LocationActions.FETCHED_FAILED });
                    }
                }
                else if (selectAddr) {
                    let temp = selectAddr;
                    let loc = temp.selected ? loService.toLocation(temp.selected) : new Location;
                    yield put({ type: LocationActions.SUBMIT, data: loc });
                    return 0;
                }
                else if (submit) {
                    let temp = yield select(selectRoot);
                    let loc = temp.selected ? loService.toLocation(temp.selected) : temp.criteria ? loService.toLocationFromString(temp.criteria) : null;
                    yield put({ type: LocationActions.SUBMIT, data: loc });
                    return 0;
                }
                else {
                    return 0;
                }
            }
            catch (e) {
                yield put({ type: LocationActions.FETCHED_FAILED });
            }
        }
    }
    static *locationState(payload) {
        let temp = payload.location ? loService.toAddress(payload.location) : null;
        yield put(({ type: LocationActions.INIT, data: temp }));
        let can = yield loService.hasPermission();
        while (!can) {
            yield put({ type: LocationActions.NEED_PERMS });
            const { perm } = yield race({
                perm: take(LocationActions.REQUESTPERM),
                cancel: take(LocationActions.CANCEL)
            });
            if (perm) {
                can = yield loService.requestPermission();
            }
            else {
                return 0;
            }
        }
        yield put({ type: LocationActions.PERMS_SUCCESS });
        yield call(LOCSagas.locationAuthorizedState);
    }
}
//# sourceMappingURL=sagas.js.map