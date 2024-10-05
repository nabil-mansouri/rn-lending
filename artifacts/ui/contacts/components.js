var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ContactActions } from "./actions";
import { selectContactSearch } from "./selectors";
import { SearchBarStyle } from "../commons/components";
import { colors } from "../commons/styles";
/**
 *
 */
class SearchContactProps {
}
__decorate([
    ConnectProp(selectContactSearch)
], SearchContactProps.prototype, "criteria", void 0);
__decorate([
    ConnectSaga(ContactActions.SEARCH_CHANGE)
], SearchContactProps.prototype, "search", void 0);
__decorate([
    ConnectSaga(ContactActions.SEARCH_STOP)
], SearchContactProps.prototype, "stop", void 0);
__decorate([
    ConnectSaga(ContactActions.SUBMIT)
], SearchContactProps.prototype, "submit", void 0);
let SearchBarContact = class SearchBarContact extends React.Component {
    render() {
        return React.createElement(View, { style: SearchBarStyle.search_wrapper },
            React.createElement(View, { style: SearchBarStyle.search_text_background },
                React.createElement(TextInput, { autoFocus: true, style: SearchBarStyle.search_text, clearButtonMode: "never", onChangeText: (t) => this.props.search({ search: t }), returnKeyType: "search", selectionColor: colors.main_light, value: this.props.criteria, underlineColorAndroid: "transparent" }),
                React.createElement(TouchableOpacity, { hitSlop: { bottom: 16, top: 16, left: 16, right: 16 }, onPress: () => this.props.stop() },
                    React.createElement(Icon, { size: 18, name: "cancel", color: "white", style: SearchBarStyle.search_icon }))),
            React.createElement(TouchableOpacity, { style: stylesCustom.style_check, hitSlop: { bottom: 16, top: 16, left: 16, right: 16 }, onPress: () => this.props.submit() },
                React.createElement(Icon, { size: 24, name: "check", color: "white", style: [SearchBarStyle.search_icon] })));
    }
};
SearchBarContact = __decorate([
    ReduxConnect(SearchContactProps)
], SearchBarContact);
export { SearchBarContact };
export const stylesCustom = StyleSheet.create({
    style_check: {
        marginRight: 18
    }
});
//# sourceMappingURL=components.js.map