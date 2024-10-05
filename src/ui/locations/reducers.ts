import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import * as actions from "./actions";
import { LocationActions } from "./actions"
import { initialLOSTate, LOSTate } from "./state";

export class LOCReducers {
    @BindAction(LocationActions.FETCHED_FAILED)
    locationFetched(state: LOSTate): LOSTate {
        return { ...state, results: [] };
    }
    @BindAction(LocationActions.GEOLOCALIZED_SUCCESS)
    locationGeoSuccess(state: LOSTate, action: actions.GeolocalizedSuccess): LOSTate {
        return { ...state, results: [], criteria: action.data.formattedAddress, selected: action.data };
    }
    @BindAction(LocationActions.FETCHED_SUCCESS)
    locationFetchFailed(state: LOSTate, action: actions.FetchSuccessPayload): LOSTate {
        return { ...state, results: action.data, criteria: action.criteria, selected: null };
    }
    @BindAction(LocationActions.SUBMIT)
    locationSubmit(state: LOSTate): LOSTate {
        return state;
    }
    @BindAction(LocationActions.INIT)
    locationCreate(_: LOSTate, action: actions.InitSuccessPayload): LOSTate {
        return { ...initialLOSTate, selected: action.data };
    }
    @DefaultAction()
    initial(state: LOSTate = initialLOSTate) {
        return state;
    }
}
export const locReducers = exportReducers<LOSTate>(LOCReducers);