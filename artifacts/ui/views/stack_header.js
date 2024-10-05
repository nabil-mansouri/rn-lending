var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from "react";
import { ReduxConnect, ConnectProp } from 'react-redux-annotation/saga';
import { Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Header } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from "../commons/styles";
import { SearchBar } from "../transactions/components";
import { SearchBarContact } from "../contacts/components";
class PropsIcon {
}
let HeaderIcon = class HeaderIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(TouchableOpacity, { hitSlop: { bottom: 16, top: 16, left: 16, right: 16 }, onPress: () => this.props.dispatch({ type: this.props.action }) },
            React.createElement(Icon, { size: 24, name: this.props.name, color: "white", style: styles.icon }));
    }
};
HeaderIcon = __decorate([
    ReduxConnect(PropsIcon)
], HeaderIcon);
export { HeaderIcon };
/**
 *
 */
class PropsHeader {
}
__decorate([
    ConnectProp((st) => st.header)
], PropsHeader.prototype, "header", void 0);
let StackHeader = class StackHeader extends React.Component {
    componentWillMount() {
        StatusBar.setBarStyle('light-content', false);
    }
    componentWillUpdate() {
        StatusBar.setBarStyle('light-content', false);
    }
    render() {
        const self = this;
        const { title, rightIcon, rightAction, leftIcon, leftAction, searchTransaction, searchContact } = self.props.header;
        const right = rightIcon ? React.createElement(HeaderIcon, { action: rightAction, name: rightIcon }) : null;
        const left = leftIcon ? React.createElement(HeaderIcon, { action: leftAction, name: leftIcon }) : null;
        const header = searchTransaction ? React.createElement(SearchBar, null) : searchContact ? React.createElement(SearchBarContact, null) : null;
        //
        return React.createElement(Header, Object.assign({}, this.props.headeProps, { getScreenDetails: (scene) => {
                let temp = self.props.headeProps.getScreenDetails(scene);
                temp.options = Object.assign({}, temp.options);
                if (header) {
                    temp.options.headerTitle = header;
                    temp.options.headerRight = null;
                    temp.options.headerLeft = null;
                    temp.options.headerTitleStyle = Object.assign({}, styles.header_title_full);
                }
                else {
                    temp.options.headerTitle = null;
                    temp.options.title = title;
                    temp.options.headerTitleStyle = Object.assign({}, styles.header_title);
                    temp.options.headerStyle = Object.assign({}, title ? styles.header : styles.header_hide);
                    temp.options.headerRight = right;
                    temp.options.headerLeft = left;
                }
                return temp;
            } }));
    }
};
StackHeader = __decorate([
    ReduxConnect(PropsHeader)
], StackHeader);
export { StackHeader };
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
});
//# sourceMappingURL=stack_header.js.map