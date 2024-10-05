let _root = (state) => state;
function root(select) {
    return (glo) => {
        return select(_root(glo));
    };
}
export function configureUser(r) {
    _root = r;
}
export const selectRoot = root((sta) => sta);
export const selectUser = root((sta) => sta.user);
//# sourceMappingURL=selectors.js.map