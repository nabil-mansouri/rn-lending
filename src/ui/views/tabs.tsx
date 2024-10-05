import React from 'react';
import { StyleProp, ViewStyle, Platform } from "react-native";
import { Dispatch } from "redux";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { TabNavigator, addNavigationHelpers, NavigationState } from 'react-navigation'
import { ReduxConnect, ConnectProp } from 'react-redux-annotation/saga'
import { Routes } from "../routes"
import { GlobalState, SCRState } from "../state"
import * as trViews from "../transactions/views";
import * as usViews from "../user/views";
import { factoryIcon } from './tabs_icon';
import { colors } from "../commons/styles";
/**
 * 
 */
export const tabListenerName = "Tabs";
export const middlewareTabbar = createReactNavigationReduxMiddleware(
    tabListenerName,
    (state: GlobalState) => state.tabBar,
);
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
let style: StyleProp<ViewStyle> = Platform.OS == "android" ? {
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
    @ConnectProp((st: GlobalState) => st.header) headerState?: SCRState;
    @ConnectProp((st: GlobalState) => st.tabBar) navigationState?: NavigationState;
    dispatch?: Dispatch<any>;
}
@ReduxConnect(Props)
export class Tabs extends React.Component<Props> {
    render() {
        const { navigationState, dispatch } = this.props;
        return (
            <TabBar
                navigation={
                    addNavigationHelpers({
                        dispatch: dispatch,
                        state: navigationState,
                        addListener: tabListener
                    })
                }
            />
        )
    }
}