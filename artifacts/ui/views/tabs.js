var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { Platform } from "react-native";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { ReduxConnect, ConnectProp } from 'react-redux-annotation/saga';
import { Routes } from "../routes";
import * as trViews from "../transactions/views";
import * as usViews from "../user/views";
import { factoryIcon } from './tabs_icon';
import { colors } from "../commons/styles";
/**
 *
 */
export const tabListenerName = "Tabs";
export const middlewareTabbar = createReactNavigationReduxMiddleware(tabListenerName, (state) => state.tabBar);
export const tabListener = createReduxBoundAddListener(tabListenerName);
/**
 *
 */
factoryIcon(trViews.Transactions, "assignment");
factoryIcon(trViews.History, "schedule");
factoryIcon(trViews.DetailForms, "add-circle");
factoryIcon(usViews.Profile, "account-circle");
/**
 *
 */
let style = Platform.OS == "android" ? {
    backgroundColor: colors.main,
    elevation: 12,
    height: 48
} : {
    backgroundColor: colors.main,
    elevation: 12
};
export const TabBar = TabNavigator({
    [Routes.TRANSACTIONS]: { screen: trViews.Transactions },
    [Routes.HISTORY]: { screen: trViews.History },
    [Routes.CREATE]: { screen: trViews.DetailForms },
    [Routes.PROFILE]: { screen: usViews.Profile },
}, {
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeTintColor: 'white',
        style,
        inactiveTintColor: 'rgba(255,255,255,0.7)',
        activeBackgroundColor: colors.main,
        inactiveBackgroundColor: colors.main
    },
    initialRouteName: Routes.TRANSACTIONS
});
/**
 *
 */
class Props {
}
__decorate([
    ConnectProp((st) => st.header)
], Props.prototype, "headerState", void 0);
__decorate([
    ConnectProp((st) => st.tabBar)
], Props.prototype, "navigationState", void 0);
let Tabs = class Tabs extends React.Component {
    render() {
        const { navigationState, dispatch } = this.props;
        return (React.createElement(TabBar, { navigation: addNavigationHelpers({
                dispatch: dispatch,
                state: navigationState,
                addListener: tabListener
            }) }));
    }
};
Tabs = __decorate([
    ReduxConnect(Props)
], Tabs);
export { Tabs };
//# sourceMappingURL=tabs.js.map