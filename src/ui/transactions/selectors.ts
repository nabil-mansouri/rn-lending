import { TRStates, TRCreateState } from "./state";
export { TRStates, TRCreateState };
import { configureLocation } from "../locations/selectors";
import { configureContact } from "../contacts/selectors";

let _root: (s: any) => TRStates = (state) => state;
let _create: (s: TRStates) => TRCreateState = (state) => state.create;
export function configure<T>(r: (sta: T) => TRStates) {
    _root = r;
    configureContact(root((c) => c.contacts));
    configureLocation(root((c) => c.locations));
}
function root<A>(select: (a: TRStates) => A) {
    return (glo: any) => {
        return select(_root(glo));
    }
}
function create<A>(select: (a: TRCreateState) => A) {
    return (glo: any) => {
        return select(_create(_root(glo)));
    }
}
//
export const selectRoot = root((sta: TRStates) => sta);
export const selectList = root((sta: TRStates) => {
    return sta.list;
});
export const selectListCurrent = root((sta: TRStates) => sta.list.current);
export const selectListSearch = root((sta: TRStates) => sta.list.criteria);

//
export const selectCreate = create((s) => s);
export const selectCreateCurrent = root((sta: TRStates) => sta.create.current);
export const selectStep = create((sta: TRCreateState) => sta.step);
