import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, contants, stylesForm } from "../styles";
export class Steps extends Component {
    render() {
        const transaction = this.props.transaction;
        if (transaction.money) {
            const hasSteps = transaction.money && transaction.moneyDetail.hasSteps;
            if (hasSteps) {
                const steps = this.props.transaction.moneyDetail.steps;
                if (this.props.edit) {
                    return React.createElement(React.Fragment, null,
                        React.createElement(Text, { style: stylesForm.header }, "Echelons"),
                        React.createElement(View, { style: stylesForm.block_wrapper },
                            steps.map((step, index) => React.createElement(View, { style: [stylesForm.block_row], key: index },
                                React.createElement(Text, { style: editStyles.step_amount },
                                    step.amountRound,
                                    "\u20AC"),
                                React.createElement(Text, { style: editStyles.step_date },
                                    "avant le ",
                                    step.expireOnText),
                                React.createElement(TouchableOpacity, { onPress: () => this.props.onDel(index) },
                                    React.createElement(Text, { style: editStyles.step_del_text }, "delete")))),
                            React.createElement(TouchableOpacity, { onPress: () => this.props.onAdd && this.props.onAdd() },
                                React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                                    React.createElement(Text, { style: stylesForm.block_action }, "AJOUTER UN ECHELON")))));
                }
                else {
                    return React.createElement(React.Fragment, null,
                        React.createElement(Text, { style: stylesForm.header }, "Echelons"),
                        React.createElement(View, { style: stylesForm.block_wrapper }, steps.map((step, index) => React.createElement(View, { style: stylesForm.block_row, key: index },
                            React.createElement(Text, { style: viewStyles.step_amount },
                                step.amountRound,
                                "\u20AC"),
                            React.createElement(Text, { style: viewStyles.step_date },
                                "avant le ",
                                step.expireOnText)))));
                }
            }
            else {
                if (this.props.edit) {
                    return React.createElement(React.Fragment, null,
                        React.createElement(TouchableOpacity, { onPress: () => this.props.onAdd && this.props.onAdd() },
                            React.createElement(Text, { style: stylesForm.header }, "Echelons"),
                            React.createElement(View, { style: stylesForm.block_wrapper },
                                React.createElement(View, { style: [stylesForm.block_row] },
                                    React.createElement(Text, { style: viewStyles.step_empty }, "Pas d'\u00E9chelons")),
                                React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                                    React.createElement(Text, { style: stylesForm.block_action }, "AJOUTER UN ECHELON")))));
                }
                else {
                    return React.createElement(React.Fragment, null,
                        React.createElement(Text, { style: stylesForm.header }, "Echelons"),
                        React.createElement(View, { style: stylesForm.block_wrapper },
                            React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                                React.createElement(Text, { style: viewStyles.step_empty }, "Pas d'\u00E9chelons"))));
                }
            }
        }
        else {
            return null;
        }
    }
}
const editStyles = StyleSheet.create({
    step_amount: {
        fontSize: 18,
        color: colors.main,
        fontFamily: "Roboto"
    },
    step_date: {
        fontSize: 16,
        flexGrow: 1,
        marginHorizontal: 16,
        color: colors.textDark,
    },
    step_del_text: {
        fontSize: 24,
        alignSelf: "flex-end",
        color: colors.main,
        fontFamily: "MaterialIcons-Regular"
    },
});
const viewStyles = StyleSheet.create({
    step_empty: {
        width: "100%",
        textAlign: "center",
        lineHeight: contants.blockRowHeight,
        fontSize: 16,
        fontFamily: "Roboto",
        color: colors.textDark
    },
    step_amount: {
        fontSize: 18,
        color: colors.main,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    step_date: {
        fontSize: 16,
        flexGrow: 1,
        color: colors.textDark,
        alignSelf: "flex-end"
    },
});
//# sourceMappingURL=steps.js.map