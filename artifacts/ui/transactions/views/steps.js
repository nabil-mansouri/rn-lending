var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { colors, stylesForm } from "../styles";
import { Field, HeaderIcon, FieldBinded } from "../components";
import { selectStep } from "../selectors";
import { TRCreateActions } from "../actions";
import { ConnectProp, ReduxConnect, ConnectSaga } from 'react-redux-annotation/saga';
import { CalendarWrapper } from '../components';
class PropIcons {
}
__decorate([
    ConnectSaga(TRCreateActions.STEP_CANCEL)
], PropIcons.prototype, "back", void 0);
__decorate([
    ConnectSaga(TRCreateActions.STEP_SUBMIT)
], PropIcons.prototype, "submit", void 0);
let HeaderIconImpl = class HeaderIconImpl extends HeaderIcon {
    getName() { return this.props.name; }
    onAction() { this.props.type == "cancel" ? this.props.back() : this.props.submit(); }
};
HeaderIconImpl = __decorate([
    ReduxConnect(PropIcons)
], HeaderIconImpl);
/**
 *
 */
class Props {
}
__decorate([
    ConnectProp(selectStep)
], Props.prototype, "step", void 0);
__decorate([
    ConnectSaga(TRCreateActions.STEP_CHANGED)
], Props.prototype, "stepChanged", void 0);
__decorate([
    ConnectSaga(TRCreateActions.STEP_CANCEL)
], Props.prototype, "cancel", void 0);
let StepForm = class StepForm extends Component {
    render() {
        const { step, validation } = this.props.step;
        const selected = step.expireOn ? {
            [step.expireOnDateIso]: { selected: true }
        } : {};
        return React.createElement(TouchableWithoutFeedback, { onPress: Keyboard.dismiss, accessible: false },
            React.createElement(View, { style: styles.container },
                React.createElement(View, { style: [stylesForm.block_wrapper, styles.fields] },
                    React.createElement(FieldBinded, { object: step, property: "amount", showLabel: false, suffix: "\u20AC", parserType: "integer", errors: validation.amount, styleInput: styles.amount_input, styleBlock: styles.amount_block, type: "numeric", onChange: (_) => this.props.stepChanged({ step }) }),
                    React.createElement(Field, { label: "A payer avant le", last: true, value: step.expireOnText, readonly: true, errors: validation.expireOn, labelouchable: false, showInput: false, styleBlock: styles.date_block, styleLabel: styles.date_title })),
                React.createElement(CalendarWrapper, { markedDates: selected, theme: "light", style: styles.calendar, onPicked: (val) => this.props.stepChanged({ step: Object.assign({}, step, { expireOn: val }) }) })));
    }
};
StepForm.navigationOptions = {
    headerLeft: () => React.createElement(HeaderIconImpl, { type: "cancel", name: "arrow-back" }),
    headerRight: () => React.createElement(HeaderIconImpl, { type: "submit", name: "check" })
};
StepForm = __decorate([
    ReduxConnect(Props)
], StepForm);
export { StepForm };
const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calendar: {
        flex: 2
    },
    fields: {
        flex: 1
    },
    date_block: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    date_title: {
        color: colors.main,
        textAlign: "center",
        fontSize: 18
    },
    amount_block: {
        flex: 2,
        alignItems: "center",
        flexDirection: "row"
    },
    amount_input: {
        width: width,
        color: colors.main,
        textAlign: "center",
        fontSize: 48,
        paddingRight: 4
    },
    amount_icon: {
        width: width / 2,
        paddingLeft: 4,
        fontSize: 40,
        lineHeight: 50,
        color: colors.main,
        textAlign: "left",
        fontFamily: "MaterialIcons-Regular",
        fontWeight: "bold"
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
//# sourceMappingURL=steps.js.map