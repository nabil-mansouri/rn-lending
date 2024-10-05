import { COState } from "./state";
export { COState };

let _root: (s: any) => COState = (state) => state;

export function configureContact<T>(r: (sta: T) => COState) {
    _root = r;
}
function root<A>(select: (a: COState) => A) {
    return (glo: any) => {
        return select(_root(glo));
    }
}
export const selectRoot = root((sta: COState) => sta);
export const selectContactList = root((sta: COState) => sta.contacts);
export const selectContactSearch = root((sta: COState) => sta.search);