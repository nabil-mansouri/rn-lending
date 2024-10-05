var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View, Text, Dimensions, Switch, ScrollView } from 'react-native';
import { colors, stylesGlobal } from "../styles";
import { ImagePlaceHolder } from '../../commons/components';
import { selectUser, selectRoot } from "../selectors";
import { ConnectProp, ReduxConnect } from "react-redux-annotation/saga";
class Props {
}
__decorate([
    ConnectProp(selectUser)
], Props.prototype, "user", void 0);
__decorate([
    ConnectProp(selectRoot)
], Props.prototype, "usstate", void 0);
let Profile = class Profile extends Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.usstate.error && this.props.usstate.error) {
            Alert.alert(this.props.usstate.errorTitle, this.props.usstate.errorBody, [], { cancelable: true });
        }
    }
    render() {
        const { loading } = this.props.usstate;
        const user = this.props.user;
        if (loading) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(ActivityIndicator, { size: 'large', animating: loading }));
        }
        return React.createElement(ScrollView, { style: styles.scrollview },
            React.createElement(View, { style: styles.container },
                React.createElement(View, { style: styles.mask_wrapper },
                    React.createElement(ImagePlaceHolder, { borderRadius: avatar_radius, imgStyle: styles.mask, placeholder: () => {
                            return React.createElement(Text, { style: [styles.mask_placeholder] }, "photo_camera");
                        }, source: { uri: user.avatar } })),
                React.createElement(Text, { style: [styles.header] }, "Mes informations"),
                React.createElement(View, { style: styles.text_container },
                    React.createElement(Text, { style: styles.text_icon }, "mail"),
                    React.createElement(Text, { style: styles.text_content }, user.email)),
                React.createElement(View, { style: styles.text_container },
                    React.createElement(Text, { style: styles.text_icon }, "phone"),
                    React.createElement(Text, { style: styles.text_content }, user.phone)),
                React.createElement(Text, { style: styles.header }, "Notifications"),
                React.createElement(View, { style: [styles.text_container] },
                    React.createElement(Text, { style: [styles.text_content, styles.text_content_switch] }, "Recevoir des notifications"),
                    React.createElement(Switch, { style: styles.switch, value: user.push }))));
    }
};
Profile = __decorate([
    ReduxConnect(Props)
], Profile);
export { Profile };
const width = Dimensions.get('window').width;
const avatar_height = 150;
const avatar_radius = 50;
const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.background,
        paddingBottom: 16
    },
    image_avatar: {
        height: avatar_height,
        width: "100%",
        backgroundColor: "#E0F2F1"
    },
    header: {
        fontFamily: "Roboto",
        color: colors.textDark,
        fontSize: 18,
        paddingTop: 14,
        paddingLeft: 16,
        paddingBottom: 16
    },
    mask_wrapper: {
        height: avatar_height,
        width: "100%",
        backgroundColor: "white",
        borderColor: colors.borders_dark,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    mask: {
        position: "absolute",
        top: avatar_height / 2 - 50,
        left: width / 2 - 50,
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#FFD600",
    },
    mask_placeholder: {
        fontFamily: "MaterialIcons-Regular",
        fontSize: 70,
        color: "white",
        textAlign: "center",
        paddingTop: 15
    },
    text_container: {
        width: "100%",
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        backgroundColor: "white"
    },
    text_content: {
        fontSize: 16,
        position: "absolute",
        left: 72,
        top: 18
    },
    text_content_switch: {
        left: 16
    },
    switch: {
        position: "absolute",
        top: 18,
        right: 16
    },
    text_icon: {
        fontFamily: "MaterialIcons-Regular",
        fontSize: 24,
        top: 10
    }
});
//# sourceMappingURL=profile.js.map