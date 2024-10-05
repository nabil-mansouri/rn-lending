import { TRListSagas, TRCreateSagas } from "./transactions/sagas";
import { USSagas } from "./user/saga";
import * as trNav from "./transactions/navigation";
import { fork, take, race, cancel, call, put } from "redux-saga/effects";
import { NavigationActions } from "react-navigation";
import { Routes } from "./routes";
let taskId = null;
function* cancelTask() {
    if (taskId) {
        yield cancel(taskId);
    }
    taskId = null;
}
export default function* rootSaga() {
    yield call(USSagas.stepLogin);
    yield put(NavigationActions.navigate({ routeName: trNav.Routes.TRANSACTION }));
    taskId = yield fork(TRListSagas.initState, { history: false });
    while (true) {
        //TODO back
        const { navigate } = yield race({
            navigate: take(NavigationActions.NAVIGATE)
        });
        //
        if (navigate) {
            const { routeName } = navigate;
            switch (routeName) {
                case Routes.TRANSACTIONS:
                    yield cancelTask();
                    taskId = yield fork(TRListSagas.initState, { history: false });
                    break;
                case Routes.HISTORY:
                    yield cancelTask();
                    taskId = yield fork(TRListSagas.initState, { history: true });
                    break;
                case Routes.CREATE:
                    yield cancelTask();
                    taskId = yield fork(TRCreateSagas.createState);
                    break;
                case Routes.PROFILE:
                    yield cancelTask();
                    taskId = yield fork(USSagas.fetchProfile);
                    break;
            }
        }
    }
}
//# sourceMappingURL=saga.js.map