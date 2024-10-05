import { TRStates, TRCreateState } from "./state";
export { TRStates, TRCreateState };
import { configureLocation } from "../locations/selectors";
import { configureContact } from "../contacts/selectors";
let _root = (state) => state;
let _create = (state) => state.create;
export function configure(r) {
    _root = r;
    configureContact(root((c) => c.contacts));
    configureLocation(root((c) => c.locations));
}
function root(select) {
    return (glo) => {
        return select(_root(glo));
    };
}
function create(select) {
    return (glo) => {
        return select(_create(_root(glo)));
    };
}
//
export const selectRoot = root((sta) => sta);
export const selectList = root((sta) => {
    return sta.list;
});
export const selectListCurrent = root((sta) => sta.list.current);
export const selectListSearch = root((sta) => sta.list.criteria);
//
export const selectCreate = create((s) => s);
export const selectCreateCurrent = root((sta) => sta.create.current);
export const selectStep = create((sta) => sta.step);
//# sourceMappingURL=selectors.js.map