import { LOSTate } from "./state";
export { LOSTate };
let _root = (state) => state;
export function configureLocation(r) {
    _root = r;
}
function root(select) {
    return (glo) => {
        return select(_root(glo));
    };
}
export const selectRoot = root((sta) => sta);
//# sourceMappingURL=selectors.js.map