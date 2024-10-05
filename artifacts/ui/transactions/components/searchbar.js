var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { ISearchBar } from "../../commons/components";
import { TRListActions } from "../actions";
import { selectListSearch } from "../selectors";
/**
 *
 */
class SearchProps {
}
__decorate([
    ConnectProp(selectListSearch)
], SearchProps.prototype, "criteria", void 0);
__decorate([
    ConnectSaga(TRListActions.SEARCH_CHANGE)
], SearchProps.prototype, "search", void 0);
__decorate([
    ConnectSaga(TRListActions.SEARCH_STOP)
], SearchProps.prototype, "stop", void 0);
let SearchBar = class SearchBar extends ISearchBar {
};
SearchBar = __decorate([
    ReduxConnect(SearchProps)
], SearchBar);
export { SearchBar };
//# sourceMappingURL=searchbar.js.map