import React from "react";
import { Dispatch, Action } from 'redux'
import { ReduxConnect, ConnectProp } from 'react-redux-annotation/saga'
import { Platform, StatusBar, TouchableOpacity } from 'react-native'
import { GlobalState, SCRState } from "../state"
import { Header, HeaderProps } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from "../commons/styles";
import { SearchBar } from "../transactions/components";
import { SearchBarContact } from "../contacts/components";

class PropsIcon {
    name: string;
    action: string;
    dispatch?: Dispatch<Action>
}
@ReduxConnect(PropsIcon)
export class HeaderIcon extends React.Component<PropsIcon> {
    constructor(props) {
        super(props);
    }
    render() {
        return <TouchableOpacity hitSlop={{ bottom: 16, top: 16, left: 16, right: 16 }} onPress={() => this.props.dispatch({ type: this.props.action })}>
            <Icon size={24} name={this.props.name} color="white" style={styles.icon} />
        </TouchableOpacity>
    }
}
/**
 * 
 */
class PropsHeader {
    @ConnectProp((st: GlobalState) => st.header) header?: SCRState;
    headeProps: HeaderProps;
}
@ReduxConnect(PropsHeader)
export class StackHeader extends React.Component<PropsHeader> {
    componentWillMount() {
        StatusBar.setBarStyle('light-content', false);
    }
    componentWillUpdate() {
        StatusBar.setBarStyle('light-content', false);
    }
    render() {
        const self = this;
        const { title, rightIcon, rightAction, leftIcon, leftAction, searchTransaction, searchContact } = self.props.header;
        const right = rightIcon ? <HeaderIcon action={rightAction} name={rightIcon} /> : null;
        const left = leftIcon ? <HeaderIcon action={leftAction} name={leftIcon} /> : null;
        const header = searchTransaction ? <SearchBar /> : searchContact ? <SearchBarContact /> : null;
        //
        return <Header {...this.props.headeProps} getScreenDetails={(scene) => {
            let temp = self.props.headeProps.getScreenDetails(scene);
            temp.options = { ...temp.options };
            if (header) {
                temp.options.headerTitle = header;
                temp.options.headerRight = null;
                temp.options.headerLeft = null;
                temp.options.headerTitleStyle = Object.assign({}, styles.header_title_full)
            } else {
                temp.options.headerTitle = null;
                temp.options.title = title;
                temp.options.headerTitleStyle = Object.assign({}, styles.header_title)
                temp.options.headerStyle = Object.assign({}, title ? styles.header : styles.header_hide)
                temp.options.headerRight = right;
                temp.options.headerLeft = left;
            }
            return temp;
        }} />
    }
}

/**
 * ANDROID
 */
let styles = Platform.OS == "android" ? ({
    icon: {
        color: "white",
        marginHorizontal: 16
    },
    header_title: {
        color: "white",
        fontSize: 18
    },
    header_title_full: {
        width: "100%"
    },
    header: {
        elevation: 0,
        backgroundColor: colors.main,
        top: 0,
        paddingTop: StatusBar.currentHeight,
        height: 56 + StatusBar.currentHeight
    },
    header_hide: {
        top: 0,
        elevation: 0,
        backgroundColor: colors.main,
        paddingTop: StatusBar.currentHeight,
        height: StatusBar.currentHeight
    }
}) : ({
    icon: {
        color: "white",
        marginHorizontal: 16
    },
    header_title: {
        color: "white"
    },
    header_title_full: {
        width: "100%"
    },
    header: {
        elevation: 0,
        backgroundColor: colors.main
    },
    header_hide: {
        elevation: 0,
        backgroundColor: colors.main
    }
})