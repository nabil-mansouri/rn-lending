import React from 'react';
import { Dispatch } from "redux";
import { addNavigationHelpers, NavigationState, NavigationRouteConfigMap, StackNavigator } from 'react-navigation'
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { ReduxConnect, ConnectProp } from 'react-redux-annotation/saga'
import { GlobalState } from "../state"
import * as usNav from "../user/navigation";
import * as trNav from "../transactions/navigation";
import { Tabs } from "./tabs";
import { Routes } from "../routes";
import { StackHeader } from "./stack_header";
/**
 * 
 */
export const stackListenerName = "Stack";
export const middlewareStack = createReactNavigationReduxMiddleware(
    stackListenerName,
    (state: GlobalState) => state.stack,
);
export const stackListener = createReduxBoundAddListener(stackListenerName);
/**
 * 
 */
const allStack: NavigationRouteConfigMap = {
    ...trNav.StackTransactions,
    ...usNav.StackLogin,
    [Routes.TAB_BAR]: {
        screen: Tabs
    },
};
/**
 * 
 */
export const StackNav = StackNavigator(allStack, {
    //initialRouteName: Routes.TAB_BAR,
    navigationOptions: {
        header: (headerProps) => <StackHeader headeProps={headerProps} />,
    },
    headerMode: "screen"
})

class Props {
    @ConnectProp((st: GlobalState) => st.stack) navigationState?: NavigationState;
    dispatch?: Dispatch<any>;
}
@ReduxConnect(Props)
export class Stack extends React.Component<Props> {
    render() {
        const { navigationState, dispatch } = this.props;
        this.props
        return (
            <StackNav
                key="Stack"
                navigation={
                    addNavigationHelpers({
                        dispatch: dispatch,
                        state: navigationState,
                        addListener: stackListener,
                    })
                }
            />
        )
    }
}
