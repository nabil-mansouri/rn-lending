import { put, take, race, call, select } from 'redux-saga/effects'
import { loService } from "./api";
import * as actions from "./actions";
import { Location } from "./models";
import { LocationActions, SelectAddressPayload } from "./actions";
import { LOSTate, selectRoot } from './selectors';

export class LOCSagas {
    //
    static * locationAuthorizedState() {
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
                        yield put<actions.GeolocalizedSuccess>({ type: LocationActions.GEOLOCALIZED_SUCCESS, data: addresses[0] })
                    } else {
                        yield put({ type: LocationActions.GEOLOCALIZED_FAILED })
                    }
                } else if (search) {
                    let temp: actions.SearchPayload = search;
                    try {
                        let addresses = yield call(loService.search, temp.criteria);
                        yield put<actions.FetchSuccessPayload>({ type: LocationActions.FETCHED_SUCCESS, data: addresses, criteria: temp.criteria })
                    } catch (e) {
                        yield put({ type: LocationActions.FETCHED_FAILED })
                    }
                } else if (selectAddr) {
                    let temp: SelectAddressPayload = selectAddr;
                    let loc = temp.selected ? loService.toLocation(temp.selected) : new Location;
                    yield put<actions.SubmitSuccessPayload>({ type: LocationActions.SUBMIT, data: loc })
                    return 0;
                } else if (submit) {
                    let temp: LOSTate = yield select(selectRoot);
                    let loc = temp.selected ? loService.toLocation(temp.selected) : temp.criteria ? loService.toLocationFromString(temp.criteria) : null;
                    yield put<actions.SubmitSuccessPayload>({ type: LocationActions.SUBMIT, data: loc })
                    return 0;
                } else {//CANCEL
                    return 0;
                }
            } catch (e) {
                yield put({ type: LocationActions.FETCHED_FAILED })
            }
        }
    }
    static * locationState(payload: actions.InitPayload) {
        let temp = payload.location ? loService.toAddress(payload.location) : null;
        yield put<actions.InitSuccessPayload>(({ type: LocationActions.INIT, data: temp }));
        let can: boolean = yield loService.hasPermission();
        while (!can) {
            yield put({ type: LocationActions.NEED_PERMS });
            const { perm } = yield race({
                perm: take(LocationActions.REQUESTPERM),
                cancel: take(LocationActions.CANCEL)
            });
            if (perm) {
                can = yield loService.requestPermission();
            } else {
                return 0;
            }
        }
        yield put({ type: LocationActions.PERMS_SUCCESS });
        yield call(LOCSagas.locationAuthorizedState)
    }
}