import { combineReducers } from "redux";
import { trListReducers } from "./list";
import { trCreateReducers } from "./create";
import { locReducers } from "../../locations/reducers";
import { conReducers } from "../../contacts/reducer";
import { TRCreateActions, TRListActions } from "../actions";
//
export { TRCreateActions, TRListActions }
export { trListReducers, trCreateReducers }
export const trReducers = combineReducers({
    create: trCreateReducers,
    list: trListReducers,
    contacts: conReducers,
    locations: locReducers
})