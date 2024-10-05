import { BindAction, exportReducers, DefaultAction } from "react-redux-annotation";
import Action, * as actions from "./actions";
import { USState, User, initialState } from "./state";


export class USReducers {
    @BindAction(Action.FETCH_USER_PENDING)
    fetchPending(state: USState): USState {
        return { ...state, loading: true, error: false };
    }
    @BindAction(Action.FETCH_USER_SUCCESS)
    fetchSuccess(state: USState, action: actions.FetchSuccessPayload): USState {
        return { ...state, user: action.data, loading: false, error: false };
    }
    @BindAction(Action.FETCH_USER_FAIL)
    fetchFail(state: USState): USState {
        return { ...state, user: new User, loading: false, error: true, errorBody: "Veuillez vous connecter à internet.", errorTitle: "Connexion impossible" };
    }
    @BindAction(Action.UPDATE_PENDING)
    updatePending(state: USState): USState {
        return { ...state, loading: true, error: false };
    }
    @BindAction(Action.UPDATE_SUCCESS)
    updateSuccess(state: USState, action: actions.UpdateSuccessPayload): USState {
        return { ...state, loading: false, error: false, user: action.user };
    }
    @BindAction(Action.UPDATE_FAIL)
    updateFail(state: USState, action: actions.UpdateSuccessPayload): USState {
        return { ...state, loading: false, error: true, user: action.user, errorBody: "Veuillez vous connecter à internet.", errorTitle: "Sauvegarde échoué" };
    }
    /**
     * 
     * @param state 
     */
    @BindAction(Action.SIGNIN_NEED_PHONE)
    signInNeedPhone(state: USState): USState {
        return { ...state, loading: false, error: false, signInCode: "", signInPhone: "", signInState: "phone" };
    }
    @BindAction(Action.SIGNIN_PHONE_SUBMIT)
    signInPhoneSubmit(state: USState): USState {
        return { ...state, loading: true, error: false };
    }
    @BindAction(Action.SIGNIN_PHONE_SUBMIT_ERROR)
    signInPhoneSubmitError(state: USState): USState {
        return { ...state, loading: false, error: true };
    }
    @BindAction(Action.SIGNIN_NEED_CODE)
    signInNeedCode(state: USState): USState {
        return { ...state, loading: false, error: false, signInState: "code" };
    }
    @BindAction(Action.SIGNIN_CODE_SUBMIT)
    signInCodeSubmit(state: USState): USState {
        return { ...state, loading: true };
    }
    @BindAction(Action.SIGNIN_CODE_SUBMIT_ERROR)
    signInCodeSubmitError(state: USState): USState {
        return { ...state, loading: false, error: true };
    }
    @DefaultAction()
    initial(state: USState = initialState) {
        return state;
    }
}
export const usReducers = exportReducers<USState>(USReducers);