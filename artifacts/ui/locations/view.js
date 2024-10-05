var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { StatusBar, Alert, StyleSheet, TouchableOpacity, View, Text, FlatList, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { colors, stylesForm, contants } from "../commons/styles";
import { LocationActions } from "./actions";
import { selectRoot } from "./selectors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ReduxConnect, ConnectProp, ConnectSaga } from 'react-redux-annotation/saga';
export class LocationRow extends Component {
    render() {
        const { data } = this.props;
        return (React.createElement(TouchableOpacity, { onPress: () => this.props.onPress(data) },
            React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                React.createElement(Text, null, data.formattedAddress))));
    }
}
/**
 *
 */
class PropsInput {
}
__decorate([
    ConnectProp(selectRoot)
], PropsInput.prototype, "location", void 0);
__decorate([
    ConnectSaga(LocationActions.SUBMIT)
], PropsInput.prototype, "submit", void 0);
__decorate([
    ConnectSaga(LocationActions.SEARCH_ADDRESS)
], PropsInput.prototype, "search", void 0);
__decorate([
    ConnectSaga(LocationActions.GEOLOCALIZE)
], PropsInput.prototype, "geolocalize", void 0);
let LocationInput = class LocationInput extends Component {
    render() {
        return (React.createElement(View, { style: [stylesForm.block_wrapper, styles.input_wrapper] },
            React.createElement(TextInput, { autoFocus: true, style: styles.search_text, clearButtonMode: "never", onChangeText: (t) => this.props.search({ criteria: t }), returnKeyType: "done", selectionColor: colors.textDark, value: this.props.location.criteria, underlineColorAndroid: "transparent", onSubmitEditing: () => this.props.submit() }),
            React.createElement(TouchableOpacity, { onPress: () => this.props.geolocalize(), hitSlop: { bottom: 16, top: 16, left: 16, right: 16 } },
                React.createElement(Icon, { size: 24, name: "my-location", color: "white", style: styles.search_icon }))));
    }
};
LocationInput = __decorate([
    ReduxConnect(PropsInput)
], LocationInput);
export { LocationInput };
/**
 *
 */
class Props {
}
__decorate([
    ConnectProp(selectRoot)
], Props.prototype, "location", void 0);
__decorate([
    ConnectSaga(LocationActions.SELECT_ADDRESS)
], Props.prototype, "select", void 0);
__decorate([
    ConnectSaga(LocationActions.CANCEL)
], Props.prototype, "cancel", void 0);
__decorate([
    ConnectSaga(LocationActions.REQUESTPERM)
], Props.prototype, "requestPerm", void 0);
let Locations = class Locations extends Component {
    componentDidUpdate(prev) {
        const props = this.props;
        if (!prev.location.error && props.location.error) {
            Alert.alert(props.location.errorTitle, props.location.errorBody, [], { cancelable: true });
        }
        else if (!prev.location.needRequest && props.location.needRequest) {
            Alert.alert("Accès à votre position", "Pret emprunt souhaite accèder à votre position", [
                { text: 'NON', onPress: () => props.cancel(), style: 'cancel' },
                { text: 'OUI', onPress: () => props.requestPerm() }
            ], { cancelable: false });
        }
    }
    render() {
        const { results, criteria } = this.props.location;
        const finalIndex = results.length - 1;
        const renderResult = () => {
            if (results.length == 0 && criteria && criteria.trim().length == 0) {
                return React.createElement(View, { style: stylesForm.block_wrapper },
                    React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                        React.createElement(Text, null, "Aucun r\u00E9sultat pour cette adresse")));
            }
            else {
                return React.createElement(View, { style: stylesForm.block_wrapper },
                    React.createElement(FlatList, { data: results, keyExtractor: (_, index) => index + "", keyboardShouldPersistTaps: "handled", renderItem: d => React.createElement(LocationRow, { key: d.index, last: d.index == finalIndex, data: d.item, onPress: (s) => this.props.select({ selected: s }) }) }));
            }
        };
        return React.createElement(View, { style: [styles.container, this.props.style] },
            React.createElement(LocationInput, null),
            renderResult());
    }
};
Locations = __decorate([
    ReduxConnect(Props)
], Locations);
export { Locations };
class PropsModal {
}
__decorate([
    ConnectProp(selectRoot)
], PropsModal.prototype, "location", void 0);
__decorate([
    ConnectSaga(LocationActions.CANCEL)
], PropsModal.prototype, "cancel", void 0);
let LocationModal = class LocationModal extends Component {
    render() {
        return React.createElement(Modal, { animationType: "fade", transparent: true, onRequestClose: () => this.props.cancel(), visible: this.props.visible },
            React.createElement(TouchableWithoutFeedback, { onPress: () => this.props.cancel() },
                React.createElement(View, { style: styles.modal_background },
                    React.createElement(Locations, null))));
    }
};
LocationModal = __decorate([
    ReduxConnect(Props)
], LocationModal);
export { LocationModal };
const statusHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
    modal_background: {
        flex: 1,
        zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal_inner: {
        marginTop: statusHeight
    },
    input_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: contants.blockRowHeight,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: colors.borders,
    },
    search_text: {
        paddingLeft: 16,
        flex: 1,
        color: colors.textDark,
        fontSize: 14,
    },
    search_icon: {
        marginHorizontal: 16,
        color: colors.main
    },
    container: {
        flex: 1
    },
    action_container: {
        flex: 1,
        backgroundColor: colors.main,
        flexDirection: "row",
        alignItems: "flex-start"
    },
    action_text: {
        fontSize: 14,
        color: "white"
    },
    actionButtonIcon: {
        fontSize: 24,
        lineHeight: 56,
        color: 'white',
    },
});
//# sourceMappingURL=view.js.map