import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from "../../commons/components";
import { Contact, Transaction } from "../models";
import { stylesForm, contants, colors } from "../styles";
import Icon from 'react-native-vector-icons/MaterialIcons'

interface PropsTelltale {
    transaction: Transaction;
    editMode: boolean;
    onAdd?: () => void;
    onRemove?: (contact: Contact) => void;
}
interface StateTelltale {
}
export class Telltales extends Component<PropsTelltale, StateTelltale> {
    render() {
        const transaction = this.props.transaction;
        //
        const renderRow = (model: Contact, index: number) => {
            if (this.props.editMode) {
                return <View style={[stylesForm.block_row, stylesForm.block_row_last]} key={index}>
                    <Avatar source={model.avatar} styleCommons={styles.telltale_avatar} styleText={styles.telltale_avatar_placeholder} textSize={20}></Avatar>
                    <Text style={styles.telltale_text_edit}>{model.shortName}</Text>
                    <TouchableOpacity onPress={() => this.props.onRemove && this.props.onRemove(model)} hitSlop={{ left: 16, top: 16, right: 16, bottom: 16 }}>
                        <Icon name="delete" style={styles.delete} />
                    </TouchableOpacity>
                </View>;
            } else {
                return <View style={[stylesForm.block_row, stylesForm.block_row_last]} key={index}>
                    <Avatar source={model.avatar} ></Avatar>
                    <Text style={styles.telltale_text}>{model.shortName}</Text>
                </View>;
            }
        }
        //
        if (transaction.telltales) {
            const telltales = transaction.telltales;
            if (this.props.editMode) {
                return <React.Fragment>
                    <Text style={stylesForm.header}>Témoins</Text>
                    <View style={stylesForm.block_wrapper}>
                        {telltales.map((model, index) => renderRow(model, index))}
                        <TouchableOpacity onPress={() => this.props.onAdd && this.props.onAdd()} >
                            {telltales.length == 0 && <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                                <Text style={styles.telltale_text}>Pas de témoins</Text>
                            </View>}
                            <View style={[stylesForm.block_row, stylesForm.block_row_last, stylesForm.block_action_sep]}  >
                                <Text style={stylesForm.block_action}>AJOUTER UN TEMOIN</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
            } else {
                return < React.Fragment >
                    <Text style={stylesForm.header}>Témoins</Text>
                    <View style={stylesForm.block_wrapper}>
                        {telltales.map((model, index) => renderRow(model, index))}
                        {telltales.length == 0 && <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                            <Text style={styles.telltale_text}>Pas de témoins</Text>
                        </View>}
                    </View>
                </React.Fragment >
            }

        } else {
            return null;
        }
    }
}
const styles = StyleSheet.create({
    telltale_avatar: { height: 30, width: 30, borderRadius: 15 },
    telltale_avatar_placeholder: { lineHeight: 30 },
    telltale_text_edit: {
        lineHeight: contants.blockRowHeight,
        left: 16,
        fontSize: 16,
        fontFamily: "Roboto",
        flex: 1,
        color: colors.textDark
    },
    telltale_text: {
        width: "100%",
        textAlign: "center",
        lineHeight: contants.blockRowHeight,
        fontSize: 16,
        fontFamily: "Roboto",
        color: colors.textDark
    },
    delete: {
        color: colors.main,
        fontSize: 20,
        alignSelf: "flex-end"
    }
});
