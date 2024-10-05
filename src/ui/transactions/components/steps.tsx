import React, { Component } from 'react';
import {
    StyleSheet, TouchableOpacity,
    View, Text

} from 'react-native';
import * as model from "../models";
import { colors, contants, stylesForm } from "../styles";

interface PropsEchelons {
    transaction: model.Transaction;
    edit: boolean;
    onDel?: (index: number) => void
    onAdd?: () => void
}
interface StateEchelons {
}
export class Steps extends Component<PropsEchelons, StateEchelons> {
    render() {
        const transaction = this.props.transaction;
        if (transaction.money) {
            const hasSteps = transaction.money && transaction.moneyDetail.hasSteps;
            if (hasSteps) {
                const steps = this.props.transaction.moneyDetail.steps;
                if (this.props.edit) {
                    return <React.Fragment>
                        <Text style={stylesForm.header}>Echelons</Text>
                        <View style={stylesForm.block_wrapper}>
                            {steps.map((step, index) =>
                                <View style={[stylesForm.block_row]} key={index}>
                                    <Text style={editStyles.step_amount}>{step.amountRound}€</Text>
                                    <Text style={editStyles.step_date}>avant le {step.expireOnText}</Text>
                                    <TouchableOpacity onPress={() => this.props.onDel(index)}>
                                        <Text style={editStyles.step_del_text}>delete</Text>
                                    </TouchableOpacity>
                                </View>)}
                            <TouchableOpacity onPress={() => this.props.onAdd && this.props.onAdd()}>
                                <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                                    <Text style={stylesForm.block_action}>AJOUTER UN ECHELON</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                } else {
                    return <React.Fragment>
                        <Text style={stylesForm.header}>Echelons</Text>
                        <View style={stylesForm.block_wrapper}>
                            {steps.map((step, index) =>
                                <View style={stylesForm.block_row} key={index}>
                                    <Text style={viewStyles.step_amount}>{step.amountRound}€</Text>
                                    <Text style={viewStyles.step_date}>avant le {step.expireOnText}</Text>
                                </View>)}
                        </View>
                    </React.Fragment>
                }
            } else {
                if (this.props.edit) {
                    return <React.Fragment>
                        <TouchableOpacity onPress={() => this.props.onAdd && this.props.onAdd()}>
                            <Text style={stylesForm.header}>Echelons</Text>
                            <View style={stylesForm.block_wrapper}>
                                <View style={[stylesForm.block_row]}  >
                                    <Text style={viewStyles.step_empty}>Pas d'échelons</Text>
                                </View>
                                <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                                    <Text style={stylesForm.block_action}>AJOUTER UN ECHELON</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </React.Fragment>
                } else {
                    return <React.Fragment>
                        <Text style={stylesForm.header}>Echelons</Text>
                        <View style={stylesForm.block_wrapper}>
                            <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                                <Text style={viewStyles.step_empty}>Pas d'échelons</Text>
                            </View>
                        </View>
                    </React.Fragment>
                }
            }
        } else {
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
