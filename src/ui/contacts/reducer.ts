import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import * as actions from "./actions";
import { ContactActions } from "./actions"
import { COState, initialCOState } from "./state";

export class CONReducers {
    @BindAction(ContactActions.INIT)
    contactInit(_: COState, payload: actions.InitPayload): COState {
        return { ...initialCOState, single: payload.single, selected: payload.data.map(c => c.recordId) };
    }
    @BindAction(ContactActions.PERMS_SUCCESS)
    contactPermSuccess(state: COState): COState {
        return { ...state };
    }
    @BindAction(ContactActions.FETCHED_SUCCESS)
    contactFetched(state: COState, action: actions.FetchedSuccessPayload): COState {
        let contacts = action.data.map(co => {
            co.selected = state.selected.indexOf(co.recordID) > -1;
            return co;
        })
        return { ...state, loading: false, contacts };
    }
    @BindAction(ContactActions.TOGGLE)
    contactChanged(state: COState, action: actions.TogglePayload): COState {
        let selected = [...state.selected];
        let toUnselect = [];
        if (state.single) {
            while (selected.length > 1) {
                toUnselect.push(selected.pop());
            }
        }
        let contacts = state.contacts.map(co => {
            if (co.recordID == action.selected.recordID) {
                let sel = !co.selected;
                if (sel) {
                    selected.push(co.recordID);
                } else {
                    selected = selected.filter(s => s != co.recordID);
                }
                return { ...co, selected: !co.selected }
            }
            //
            if (toUnselect.indexOf(co.recordID) > -1) {
                return { ...co, selected: false }
            }
            return co;
        })
        return { ...state, contacts, selected };
    }
    @BindAction(ContactActions.SUBMIT_SUCCESS)
    contactSubmit(state: COState): COState {
        return state;
    }
    @BindAction(ContactActions.SEARCH_START_SUCCESS)
    startSearchSuccess(state: COState): COState {
        return { ...state, searching: true };
    }
    @BindAction(ContactActions.SEARCH_STOP_SUCCESS)
    stopSearchSuccess(state: COState): COState {
        return { ...state, searching: false };
    }

    @DefaultAction()
    initial(state: COState = initialCOState) {
        return state;
    }
}
export const conReducers = exportReducers<COState>(CONReducers);