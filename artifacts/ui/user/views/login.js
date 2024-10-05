var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { colors } from "../styles";
import { selectUser, selectRoot } from "../selectors";
import { ConnectProp, ReduxConnect } from "react-redux-annotation/saga";
import Icon from 'react-native-vector-icons/MaterialIcons';
class Props {
}
__decorate([
    ConnectProp(selectUser)
], Props.prototype, "user", void 0);
__decorate([
    ConnectProp(selectRoot)
], Props.prototype, "usstate", void 0);
let Login = class Login extends Component {
    render() {
        return React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.top_bg },
                React.createElement(View, { style: styles.title_wrapper },
                    React.createElement(Text, { style: styles.title }, "Prets & Emprunts"),
                    React.createElement(Text, { style: styles.subtitle }, "Prets et emprunts est une application vous permettant de pr\u00EAter ou d\u2019emprunter des objets ou de l\u2019argent de mani\u00E8re s\u00E9curi\u00E9")),
                React.createElement(View, { style: styles.status_wrapper },
                    React.createElement(View, { style: styles.status }),
                    React.createElement(View, { style: [styles.status, styles.status_inactive] }),
                    React.createElement(View, { style: [styles.status, styles.status_inactive] }))),
            React.createElement(View, { style: styles.bottom },
                React.createElement(Text, { style: styles.help }, "Nous utilisons votre num\u00E9ro de t\u00E9l\u00E9phone pour vous authentifier"),
                React.createElement(View, { style: styles.input_wrapper },
                    React.createElement(Text, { style: styles.input_text }, "+ 33"),
                    React.createElement(TextInput, { value: "6 37 45 63 65", style: styles.input_text }),
                    React.createElement(Icon, { size: 26, name: "phone", color: colors.main })),
                React.createElement(Text, { style: styles.button }, "M'AUTHENTIFIER")));
    }
};
Login = __decorate([
    ReduxConnect(Props)
], Login);
export { Login };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.background
    },
    top_bg: {
        backgroundColor: colors.main,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center'
    },
    title: {
        backgroundColor: "white",
        fontSize: 18,
        marginBottom: 22
    },
    subtitle: {
        backgroundColor: "rgba(255,255,255,0.8)",
        fontSize: 14
    },
    title_wrapper: {
        alignItems: 'center'
    },
    status_wrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: 'center'
    },
    status: {
        width: 12,
        height: 12,
        backgroundColor: "white"
    },
    status_inactive: {
        backgroundColor: "rgba(255,255,255,0.3)"
    },
    bottom: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: 'space-around',
        paddingVertical: 30
    },
    help: {
        color: colors.black,
        marginBottom: 30,
        fontSize: 14
    },
    button: {
        fontSize: 16,
        color: "white",
        lineHeight: 44,
        height: 44,
        backgroundColor: colors.main,
        borderRadius: 8,
        overflow: "hidden"
    },
    input_wrapper: {
        borderBottomColor: colors.borders_drak80,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input_text: {
        fontSize: 24,
        color: colors.black
    }
});
//# sourceMappingURL=login.js.map