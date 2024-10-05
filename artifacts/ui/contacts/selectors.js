import { COState } from "./state";
export { COState };
let _root = (state) => state;
export function configureContact(r) {
    _root = r;
}
function root(select) {
    return (glo) => {
        return select(_root(glo));
    };
}
export const selectRoot = root((sta) => sta);
export const selectContactList = root((sta) => sta.contacts);
export const selectContactSearch = root((sta) => sta.search);
//# sourceMappingURL=selectors.js.map