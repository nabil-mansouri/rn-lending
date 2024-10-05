import { combineReducers } from "redux";
import { TabBar, StackNav, Routes, ExternalRoutes } from "./navigation";
import { usReducers } from "./user/reducers";
import { SCRState } from "./state";
import { ContactActions } from "./contacts";
import { LocationActions } from "./locations";
import { trReducers, TRCreateActions, TRListActions } from "./transactions/reducers";
const stacksReducers = {
    stack: (state, action) => {
        if (action.type == TRCreateActions.CREATE_GOBACK
            || action.type == TRListActions.DETAIL_GOBACK) {
            let all = [...state.routes];
            all.pop();
            return Object.assign({}, state, { index: state.index - 1, routes: all });
        }
        return StackNav.router.getStateForAction(action, state);
    },
    tabBar: (state, action) => {
        return TabBar.router.getStateForAction(action, state);
    },
    transactions: trReducers,
    users: usReducers,
    header: (state = new SCRState) => state
};
const combine = combineReducers(stacksReducers);
export const reducers = (state, action) => {
    let res = combine(state, action);
    //ROUTES
    res.header = Object.assign({}, res.header, { title: "", rightIcon: "", leftIcon: "", searchTransaction: false, searchContact: false });
    let routeStack = res.stack.routes[res.stack.index];
    switch (routeStack.routeName) {
        case Routes.TAB_BAR: {
            let route = res.tabBar.routes[res.tabBar.index];
            switch (route.routeName) {
                case Routes.CREATE:
                    res.header.title = "Nouv. Transaction";
                    break;
                case Routes.HISTORY:
                    res.header.title = "Mon Historique";
                    res.header.rightIcon = "search";
                    res.header.rightAction = TRListActions.SEARCH_START;
                    res.header.searchTransaction = res.transactions.list && res.transactions.list.searching;
                    break;
                case Routes.TRANSACTIONS:
                    res.header.title = "Mes Transactions";
                    res.header.rightIcon = "search";
                    res.header.rightAction = TRListActions.SEARCH_START;
                    res.header.searchTransaction = res.transactions.list && res.transactions.list.searching;
                    break;
                case Routes.PROFILE:
                    res.header.title = "Mon Profile";
                    break;
            }
            break;
        }
        case ExternalRoutes.CREATE_TELLTALE: {
            res.header.title = "Témoins";
            res.header.leftIcon = "arrow-back";
            res.header.leftAction = ContactActions.CANCEL;
            const selected = res.transactions.contacts.selected.filter(c => !!c);
            res.header.rightIcon = selected.length ? "check" : null;
            res.header.rightAction = ContactActions.SUBMIT;
            res.header.searchContact = res.transactions.contacts.searching;
            break;
        }
        case ExternalRoutes.CREATE_CONTACT: {
            res.header.title = "Contact";
            res.header.leftIcon = "arrow-back";
            res.header.leftAction = ContactActions.CANCEL;
            const selected = res.transactions.contacts.selected.filter(c => !!c);
            res.header.rightIcon = selected.length ? "check" : null;
            res.header.rightAction = ContactActions.SUBMIT;
            res.header.searchContact = res.transactions.contacts.searching;
            break;
        }
        case ExternalRoutes.CREATE_LOCATION: {
            res.header.title = "Localisation";
            res.header.leftIcon = "arrow-back";
            res.header.leftAction = LocationActions.CANCEL;
            res.header.rightIcon = "check";
            res.header.rightAction = LocationActions.SUBMIT;
            break;
        }
        case ExternalRoutes.CREATE_STEP:
            res.header.title = "Echelon";
            res.header.leftIcon = "arrow-back";
            res.header.leftAction = TRCreateActions.STEP_CANCEL;
            res.header.rightIcon = res.transactions.create.step.valid ? "check" : null;
            res.header.rightAction = TRCreateActions.STEP_SUBMIT;
            break;
        case ExternalRoutes.DETAILS: {
            res.header.leftIcon = "arrow-back";
            res.header.leftAction = TRListActions.DETAIL_GOBACK;
            if (res.transactions.list && res.transactions.list.current) {
                res.header.title = res.transactions.list.current.iShare ? "Mon prêt" : "Mon emprunt";
            }
            break;
        }
    }
    return res;
};
//# sourceMappingURL=reducers.js.map