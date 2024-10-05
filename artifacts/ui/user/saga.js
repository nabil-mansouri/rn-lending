import { put, take, call } from 'redux-saga/effects';
import { usService } from "./api";
import { Routes } from "./navigation";
import Action from "./actions";
import { NavigationActions } from "react-navigation";
export class USSagas {
    static *fetchProfile() {
        yield put({ type: Action.FETCH_USER_PENDING });
        let data = yield usService.get();
        yield put({ type: Action.FETCH_USER_SUCCESS, data });
        const upPayload = yield take(Action.UPDATE_USER);
        yield put({ type: Action.UPDATE_PENDING });
        let updated = yield usService.update(upPayload.user);
        yield put({ user: updated, type: Action.UPDATE_SUCCESS });
    }
    static *stepPhoneValidation() {
        yield put({ type: Action.SIGNIN_NEED_PHONE });
        while (true) {
            let payload = yield take(Action.SIGNIN_PHONE_SUBMIT);
            let res = yield call(usService.createAccount, payload.phone);
            if (res) {
                return yield call(USSagas.stepCodeValidation);
            }
            yield put({ type: Action.SIGNIN_PHONE_SUBMIT_ERROR });
        }
    }
    static *stepCodeValidation() {
        yield put({ type: Action.SIGNIN_NEED_CODE });
        while (true) {
            let payload = yield take(Action.SIGNIN_CODE_SUBMIT);
            let res = yield call(usService.confirm, payload.code);
            if (res) {
                return 0;
            }
            yield put({ type: Action.SIGNIN_CODE_SUBMIT_ERROR });
        }
    }
    static *stepLogin() {
        if (usService.isAuthenticated()) {
            return 0;
        }
        yield put(NavigationActions.navigate({ routeName: Routes.LOGIN }));
        if (usService.waitForConfirm()) {
            yield call(USSagas.stepCodeValidation);
        }
        else {
            yield call(USSagas.stepPhoneValidation);
        }
    }
}
//# sourceMappingURL=saga.js.map