var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { ReduxConnect, ConnectProp } from 'react-redux-annotation/saga';
import * as usNav from "../user/navigation";
import * as trNav from "../transactions/navigation";
import { Tabs } from "./tabs";
import { Routes } from "../routes";
import { StackHeader } from "./stack_header";
/**
 *
 */
export const stackListenerName = "Stack";
export const middlewareStack = createReactNavigationReduxMiddleware(stackListenerName, (state) => state.stack);
export const stackListener = createReduxBoundAddListener(stackListenerName);
/**
 *
 */
const allStack = Object.assign({}, trNav.StackTransactions, usNav.StackLogin, { [Routes.TAB_BAR]: {
        screen: Tabs
    } });
/**
 *
 */
export const StackNav = StackNavigator(allStack, {
    //initialRouteName: Routes.TAB_BAR,
    navigationOptions: {
        header: (headerProps) => React.createElement(StackHeader, { headeProps: headerProps }),
    },
    headerMode: "screen"
});
class Props {
}
__decorate([
    ConnectProp((st) => st.stack)
], Props.prototype, "navigationState", void 0);
let Stack = class Stack extends React.Component {
    render() {
        const { navigationState, dispatch } = this.props;
        this.props;
        return (React.createElement(StackNav, { key: "Stack", navigation: addNavigationHelpers({
                dispatch: dispatch,
                state: navigationState,
                addListener: stackListener,
            }) }));
    }
};
Stack = __decorate([
    ReduxConnect(Props)
], Stack);
export { Stack };
//# sourceMappingURL=stack.js.map