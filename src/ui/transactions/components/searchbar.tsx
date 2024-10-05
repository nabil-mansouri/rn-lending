import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { ISearchBarProps, ISearchBar } from "../../commons/components";
import { TRListActions, FetchingPayload } from "../actions";
import { selectListSearch } from "../selectors";

/**
 * 
 */
class SearchProps implements ISearchBarProps {
    @ConnectProp(selectListSearch) criteria?: string;
    @ConnectSaga(TRListActions.SEARCH_CHANGE) search?: (body: FetchingPayload) => void;
    @ConnectSaga(TRListActions.SEARCH_STOP) stop?: () => void;
}
@ReduxConnect(SearchProps)
export class SearchBar extends ISearchBar<SearchProps>{

} 