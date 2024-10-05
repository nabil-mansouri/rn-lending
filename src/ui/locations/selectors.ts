import { LOSTate } from "./state";
export { LOSTate };

let _root: (s: any) => LOSTate = (state) => state;

export function configureLocation<T>(r: (sta: T) => LOSTate) {
    _root = r;
}
function root<A>(select: (a: LOSTate) => A) {
    return (glo: any) => {
        return select(_root(glo));
    }
}
export const selectRoot = root((sta: LOSTate) => sta); 