var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { Alert, StyleSheet, FlatList, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { stylesForm, stylesGlobal, contants, colors } from "../commons/styles";
import { selectRoot } from "./selectors";
import { ContactActions } from "./actions";
import { Avatar } from "../commons/components";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import ActionButton from 'react-native-action-button';
const ActionButtonOther = ActionButton;
/**
 *
 */
class PropRow {
}
__decorate([
    ConnectSaga(ContactActions.TOGGLE)
], PropRow.prototype, "toggle", void 0);
let ContactListRow = class ContactListRow extends Component {
    render() {
        const { model, single } = this.props;
        const styleRow = [stylesForm.block_row, stylesForm.block_row_last];
        // 
        let checkbox = model.selected ? "check-box" : "check-box-outline-blank";
        if (single) {
            checkbox = model.selected ? "radio-button-checked" : "radio-button-unchecked";
        }
        return React.createElement(TouchableOpacity, { onPress: () => this.props.toggle({ selected: model }) },
            React.createElement(View, { style: styleRow },
                React.createElement(Avatar, { source: model.thumbnailPath }),
                React.createElement(Text, { style: styles.telltale_text }, model.givenName),
                React.createElement(Icon, { size: 24, name: checkbox, color: "white", style: styles.check_box })));
    }
};
ContactListRow = __decorate([
    ReduxConnect(PropRow)
], ContactListRow);
/**
 *
 */
class Props {
}
__decorate([
    ConnectProp(selectRoot)
], Props.prototype, "contacts", void 0);
__decorate([
    ConnectSaga(ContactActions.FETCH)
], Props.prototype, "fetch", void 0);
__decorate([
    ConnectSaga(ContactActions.REQUESTPERM_CONTACT)
], Props.prototype, "requestPerm", void 0);
__decorate([
    ConnectSaga(ContactActions.SEARCH_START)
], Props.prototype, "search", void 0);
__decorate([
    ConnectSaga(ContactActions.CANCEL)
], Props.prototype, "cancel", void 0);
let ContactList = class ContactList extends Component {
    componentDidMount() {
        this.props.fetch();
    }
    componentDidUpdate(prev) {
        const props = this.props;
        if (!prev.contacts.error && props.contacts.error) {
            Alert.alert(props.contacts.errorTitle, props.contacts.errorBody, [], { cancelable: true });
        }
        else if (!prev.contacts.needRequest && props.contacts.needRequest) {
            Alert.alert("Accès aux contacts", "Pret emprunt souhaite afficher votre liste de contact", [
                { text: 'NON', onPress: () => props.cancel(), style: 'cancel' },
                { text: 'OUI', onPress: () => props.requestPerm() }
            ], { cancelable: false });
        }
    }
    render() {
        const { error, contacts, loading, single, searching } = this.props.contacts;
        if (error) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(Text, null, "Impossible de charger les contacts"));
        }
        else {
            if (loading) {
                return React.createElement(View, { style: stylesGlobal.loading },
                    React.createElement(ActivityIndicator, { size: 'large', animating: loading }));
            }
            else {
                return React.createElement(View, null,
                    React.createElement(FlatList, { data: contacts, keyExtractor: (_, index) => index + "", keyboardShouldPersistTaps: "handled", renderItem: (d) => React.createElement(ContactListRow, Object.assign({}, this.props, { model: d.item, single: single })) }),
                    !searching && React.createElement(ActionButtonOther, { buttonColor: colors.inverse, onPress: () => this.props.search(), renderIcon: () => React.createElement(Icon, { name: "search", style: styles.actionButtonIcon }) }));
            }
        }
    }
};
ContactList = __decorate([
    ReduxConnect(Props)
], ContactList);
export { ContactList };
const styles = StyleSheet.create({
    row_selected: {
        backgroundColor: colors.main
    },
    text_selected: {
        color: "white"
    },
    telltale_avatar_placeholder: {
        borderRadius: contants.avatarHeight / 2,
        top: (contants.blockRowHeight - contants.avatarHeight) / 2,
        width: contants.avatarHeight,
        height: contants.avatarHeight,
        lineHeight: contants.avatarHeight,
        textAlign: "center",
        backgroundColor: colors.main,
        color: "white",
        fontSize: 24,
        overflow: "hidden"
    },
    check_box: {
        position: "absolute",
        top: (contants.blockRowHeight - contants.avatarHeight) / 2,
        right: 16,
        color: colors.main,
        fontSize: 24,
        lineHeight: contants.avatarHeight
    },
    telltale_text: {
        position: "absolute",
        left: 64,
        top: (contants.blockRowHeight - 16) / 2,
        fontSize: 16,
        fontFamily: "Roboto",
        color: colors.textDark
    },
    actionButtonIcon: {
        fontSize: 24,
        lineHeight: 56,
        color: 'white',
    },
});
//# sourceMappingURL=view.js.map