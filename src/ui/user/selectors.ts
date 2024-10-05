import { USState } from "./state";

let _root: (s: any) => USState = (state) => state;
function root<A>(select: (a: USState) => A) {
    return (glo: any) => {
        return select(_root(glo));
    }
}
export function configureUser<T>(r: (sta: T) => USState) {
    _root = r;
}

export const selectRoot = root((sta: USState) => sta);
export const selectUser = root((sta: USState) => sta.user);