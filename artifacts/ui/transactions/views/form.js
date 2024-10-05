var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, View, Text, StatusBar } from 'react-native';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { Direction } from "../state";
import { stylesGlobal, colors, statusBar, stylesForm } from "../styles";
import { Telltales, Pictures, Steps, Field, ButtonBinded, Button, FieldBinded, PhotoActions, CalendarModal, Scale } from "../components";
import { LocationModal } from "../../locations/view";
import { TRCreateActions } from "../actions";
import { selectCreateCurrent, selectCreate } from "../selectors";
import ActionButton from 'react-native-action-button';
const ActionButtonOther = ActionButton;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class Props {
}
__decorate([
    ConnectSaga(TRCreateActions.PHOTO_CANCEL)
], Props.prototype, "cancelPhoto", void 0);
__decorate([
    ConnectSaga(TRCreateActions.GOTO_PHOTO)
], Props.prototype, "goToPhoto", void 0);
__decorate([
    ConnectSaga(TRCreateActions.STEP_DELETE)
], Props.prototype, "removeStep", void 0);
__decorate([
    ConnectSaga(TRCreateActions.PHOTO_REMOVE)
], Props.prototype, "removePhoto", void 0);
__decorate([
    ConnectSaga(TRCreateActions.START_EXPIREON)
], Props.prototype, "goToFinishAt", void 0);
__decorate([
    ConnectSaga(TRCreateActions.END_EXPIREON)
], Props.prototype, "pickExpireOn", void 0);
__decorate([
    ConnectSaga(TRCreateActions.PHOTO_SOURCE)
], Props.prototype, "pickPhotoSource", void 0);
__decorate([
    ConnectSaga(TRCreateActions.GOTO_CONTACT_DEST)
], Props.prototype, "goToOtherContact", void 0);
__decorate([
    ConnectSaga(TRCreateActions.GOTO_CONTACT)
], Props.prototype, "goToTelltales", void 0);
__decorate([
    ConnectSaga(TRCreateActions.GOTO_LOCATION)
], Props.prototype, "goToLocation", void 0);
__decorate([
    ConnectSaga(TRCreateActions.GOTO_STEP)
], Props.prototype, "goToStep", void 0);
__decorate([
    ConnectSaga(TRCreateActions.CONTACT_REMOVE)
], Props.prototype, "removeContact", void 0);
__decorate([
    ConnectSaga(TRCreateActions.TRANSACTION_SUBMIT)
], Props.prototype, "submit", void 0);
__decorate([
    ConnectSaga(TRCreateActions.TRANSACTION_CHANGED)
], Props.prototype, "changed", void 0);
__decorate([
    ConnectSaga(TRCreateActions.TRANSACTION_SUBJECT_CHANGED)
], Props.prototype, "subjectChanged", void 0);
__decorate([
    ConnectProp(selectCreate)
], Props.prototype, "trcreate", void 0);
__decorate([
    ConnectProp(selectCreateCurrent)
], Props.prototype, "transaction", void 0);
let DetailForms = class DetailForms extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange() {
        this.props.changed({ transaction: this.props.transaction });
    }
    render() {
        let { loading, pickPhoto, pickDate, validation, pickLocation } = this.props.trcreate;
        const transaction = this.props.transaction;
        const { money } = transaction;
        const seeOtherFields = !validation.type && !validation.subject;
        if (loading) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(ActivityIndicator, { size: 'large', animating: loading }));
        }
        const renderChoices = () => {
            return React.createElement(React.Fragment, null,
                React.createElement(View, { style: [styles.btn_choice_wrapper, styles.btn_choice_wrapper_first] },
                    React.createElement(ButtonBinded, { object: transaction, property: "direction", styleInactive: styles.btn_choice_normal, styleSelected: styles.btn_choice_selected, value: Direction.CreatorShare, onChange: this.onChange },
                        React.createElement(Text, { style: [styles.btn_choice] }, "JE PR\u00CATE")),
                    React.createElement(ButtonBinded, { style: styles.btn_choice_right, object: transaction, property: "direction", styleInactive: styles.btn_choice_normal, styleSelected: styles.btn_choice_selected, value: Direction.OtherShare, onChange: this.onChange },
                        React.createElement(Text, { style: [styles.btn_choice] }, "J'EMPRUNTE"))),
                React.createElement(View, { style: [styles.btn_choice_wrapper, styles.btn_choice_wrapper_last] },
                    React.createElement(Button, { selected: transaction.goodDetail != null, styleInactive: styles.btn_choice_normal, styleSelected: styles.btn_choice_selected, onChange: () => this.props.subjectChanged({ transaction, subject: "good" }) },
                        React.createElement(Text, { style: [styles.btn_choice] }, "UN OBJET")),
                    React.createElement(Button, { selected: transaction.moneyDetail != null, styleInactive: styles.btn_choice_normal, styleSelected: styles.btn_choice_selected, style: styles.btn_choice_right, onChange: () => this.props.subjectChanged({ transaction, subject: "money" }) },
                        React.createElement(Text, { style: [styles.btn_choice] }, "DE L'ARGENT"))));
        };
        const renderOtherFiels = () => {
            if (seeOtherFields) {
                return React.createElement(React.Fragment, null,
                    React.createElement(View, { style: [stylesForm.block_wrapper] },
                        money && React.createElement(FieldBinded, { errors: validation.amount, label: "Combien: ", parserType: "integer", suffix: "\u20AC", type: "numeric", object: transaction.moneyDetail, property: "amount", onChange: this.onChange }),
                        !money && React.createElement(FieldBinded, { errors: validation.title, label: "Quoi: ", object: transaction.goodDetail, property: "title", onChange: this.onChange }),
                        React.createElement(TouchableOpacity, { onPress: () => this.props.goToOtherContact({ transaction }) },
                            React.createElement(Field, { errors: validation.other, label: "A qui:", value: transaction.hasOther ? transaction.other.shortName : "", readonly: true })),
                        React.createElement(TouchableOpacity, { onPress: () => this.props.goToFinishAt() },
                            React.createElement(Field, { errors: validation.expireOn, label: "Jusqu'au:", last: true, readonly: true, value: transaction.hasExpireOn ? transaction.expireOnFormatted : "" }))),
                    React.createElement(Text, { style: stylesForm.header }, "Compl\u00E9ment"),
                    React.createElement(View, { style: [stylesForm.block_wrapper] },
                        React.createElement(FieldBinded, { label: "Motif:", object: transaction, property: "reason", onChange: this.onChange, action: "done" }),
                        React.createElement(TouchableOpacity, { onPress: () => this.props.goToLocation({ transaction }) },
                            React.createElement(Field, { label: "Lieu:", last: true, readonly: true, value: transaction.locationName }))),
                    React.createElement(Steps, { transaction: transaction, edit: true, onAdd: this.props.goToStep, onDel: (index) => this.props.removeStep({ index }) }),
                    React.createElement(Telltales, { transaction: transaction, editMode: true, onAdd: () => this.props.goToTelltales({ transaction }), onRemove: (contact) => this.props.removeContact({ transaction, contact }) }),
                    React.createElement(Pictures, { transaction: transaction, editMode: true, add: this.props.goToPhoto, remove: (index) => this.props.removePhoto({ index }) }));
            }
            else {
                return null;
            }
        };
        const markedDates = transaction.hasExpireOn ? {
            [transaction.expireOnAtISO]: { selected: true }
        } : {};
        return React.createElement(View, { style: styles.container },
            React.createElement(PhotoActions, { onGallery: () => this.props.pickPhotoSource({ kind: "gallery" }), onPhoto: () => this.props.pickPhotoSource({ kind: "camera" }), onClose: () => this.props.cancelPhoto(), visible: pickPhoto }),
            React.createElement(CalendarModal, { onClose: () => this.props.pickExpireOn({ canceled: true, timestamp: null }), markedDates: markedDates, onPicked: (val) => this.props.pickExpireOn({ canceled: false, timestamp: val }), visible: pickDate }),
            React.createElement(LocationModal, { visible: pickLocation }),
            React.createElement(StatusBar, { hidden: pickLocation, backgroundColor: statusBar.color, translucent: true, barStyle: statusBar.style }),
            React.createElement(KeyboardAwareScrollView, { resetScrollToCoords: { x: 0, y: 0 }, style: styles.scrollview, contentContainerStyle: { paddingTop: 8, paddingBottom: 36 } },
                renderChoices(),
                renderOtherFiels()),
            React.createElement(Scale, { visible: !validation.hasErrors(), style: { width: 56, height: 56, position: "absolute", bottom: 56, right: 56 } },
                React.createElement(ActionButtonOther, { buttonColor: colors.inverse, onPress: () => this.props.submit({ ishare: false, transaction }), renderIcon: () => React.createElement(Icon, { name: "check", style: styles.actionButtonIcon }) })));
    }
};
DetailForms = __decorate([
    ReduxConnect(Props)
], DetailForms);
export { DetailForms };
const width = Dimensions.get('window').width;
const widthChoice = (width - 12 - 16 * 2) / 2;
const styles = StyleSheet.create({
    btn_choice_wrapper: {
        marginHorizontal: 16,
        height: 36,
        flex: 1,
    },
    btn_choice_wrapper_first: {
        marginTop: 24,
        marginBottom: 8,
    },
    btn_choice_wrapper_last: {
        marginTop: 8,
        marginBottom: 24,
    },
    btn_choice: {
        lineHeight: 36,
        fontSize: 14,
        borderRadius: 18,
        overflow: 'hidden',
        width: widthChoice,
        textAlign: "center"
    },
    btn_choice_right: {
        position: "absolute",
        right: 0
    },
    btn_choice_selected: {
        backgroundColor: colors.main,
        color: "white",
    },
    btn_choice_normal: {
        backgroundColor: "transparent",
        color: colors.main,
        borderColor: colors.main,
        borderWidth: 1
    },
    btn_wrapper: {
        height: 56,
        backgroundColor: colors.main,
        elevation: 8,
        width: width,
        flexDirection: "row"
    },
    btn: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 56,
        width: (width / 2) - 1
    },
    btn_sep: {
        backgroundColor: colors.separator,
        width: 1
    },
    container: {
        flex: 1,
    },
    scrollview: {
        flexDirection: "column",
        backgroundColor: "rgb(236,238,241)"
    },
    actionButtonIcon: {
        fontSize: 24,
        lineHeight: 56,
        color: 'white',
    },
});
//# sourceMappingURL=form.js.map