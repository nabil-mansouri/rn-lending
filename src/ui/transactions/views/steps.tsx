import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { colors, stylesForm } from "../styles";
import { Field, HeaderIcon, FieldBinded } from "../components";
import { STState } from "../state";
import { selectStep } from "../selectors"
import { TRCreateActions, StepChangedPayload } from "../actions"
import { ConnectProp, ReduxConnect, ConnectSaga } from 'react-redux-annotation/saga';
import { CalendarWrapper } from '../components';
class PropIcons {
    name: string;
    type: "submit" | "cancel";
    @ConnectSaga(TRCreateActions.STEP_CANCEL) back?: () => void
    @ConnectSaga(TRCreateActions.STEP_SUBMIT) submit?: () => void
}
@ReduxConnect(PropIcons)
class HeaderIconImpl extends HeaderIcon<PropIcons>{
    getName(): string { return this.props.name; }
    onAction(): void { this.props.type == "cancel" ? this.props.back() : this.props.submit() }
}
/**
 * 
 */

class Props {
    @ConnectProp(selectStep) step: STState;
    @ConnectSaga(TRCreateActions.STEP_CHANGED) stepChanged?: (p: StepChangedPayload) => void;
    @ConnectSaga(TRCreateActions.STEP_CANCEL) cancel?: () => void;
}
@ReduxConnect(Props)
export class StepForm extends Component<Props> {
    static navigationOptions = {
        headerLeft: () => <HeaderIconImpl type="cancel" name="arrow-back" />,
        headerRight: () => <HeaderIconImpl type="submit" name="check" />
    }
    render() {
        const { step, validation } = this.props.step;
        const selected = step.expireOn ? {
            [step.expireOnDateIso]: { selected: true }
        } : {} 
        return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={[stylesForm.block_wrapper, styles.fields]}>
                    <FieldBinded object={step} property="amount"
                        showLabel={false}
                        suffix="€"
                        parserType="integer"
                        errors={validation.amount}
                        styleInput={styles.amount_input}
                        styleBlock={styles.amount_block}
                        type="numeric"
                        onChange={(_) => this.props.stepChanged({ step })} />
                    <Field label="A payer avant le"
                        last={true} value={step.expireOnText}
                        readonly={true}
                        errors={validation.expireOn}
                        labelouchable={false}
                        showInput={false}
                        styleBlock={styles.date_block}
                        styleLabel={styles.date_title} />
                </View>
                <CalendarWrapper markedDates={selected} theme="light" style={styles.calendar}
                    onPicked={(val) => this.props.stepChanged({ step: { ...step, expireOn: val } })} />
            </View>
        </TouchableWithoutFeedback>
    }
}
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
