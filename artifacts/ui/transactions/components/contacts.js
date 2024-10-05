import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from "../../commons/components";
import { stylesForm, contants, colors } from "../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
export class Telltales extends Component {
    render() {
        const transaction = this.props.transaction;
        //
        const renderRow = (model, index) => {
            if (this.props.editMode) {
                return React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last], key: index },
                    React.createElement(Avatar, { source: model.avatar, styleCommons: styles.telltale_avatar, styleText: styles.telltale_avatar_placeholder, textSize: 20 }),
                    React.createElement(Text, { style: styles.telltale_text_edit }, model.shortName),
                    React.createElement(TouchableOpacity, { onPress: () => this.props.onRemove && this.props.onRemove(model), hitSlop: { left: 16, top: 16, right: 16, bottom: 16 } },
                        React.createElement(Icon, { name: "delete", style: styles.delete })));
            }
            else {
                return React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last], key: index },
                    React.createElement(Avatar, { source: model.avatar }),
                    React.createElement(Text, { style: styles.telltale_text }, model.shortName));
            }
        };
        //
        if (transaction.telltales) {
            const telltales = transaction.telltales;
            if (this.props.editMode) {
                return React.createElement(React.Fragment, null,
                    React.createElement(Text, { style: stylesForm.header }, "T\u00E9moins"),
                    React.createElement(View, { style: stylesForm.block_wrapper },
                        telltales.map((model, index) => renderRow(model, index)),
                        React.createElement(TouchableOpacity, { onPress: () => this.props.onAdd && this.props.onAdd() },
                            telltales.length == 0 && React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                                React.createElement(Text, { style: styles.telltale_text }, "Pas de t\u00E9moins")),
                            React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last, stylesForm.block_action_sep] },
                                React.createElement(Text, { style: stylesForm.block_action }, "AJOUTER UN TEMOIN")))));
            }
            else {
                return React.createElement(React.Fragment, null,
                    React.createElement(Text, { style: stylesForm.header }, "T\u00E9moins"),
                    React.createElement(View, { style: stylesForm.block_wrapper },
                        telltales.map((model, index) => renderRow(model, index)),
                        telltales.length == 0 && React.createElement(View, { style: [stylesForm.block_row, stylesForm.block_row_last] },
                            React.createElement(Text, { style: styles.telltale_text }, "Pas de t\u00E9moins"))));
            }
        }
        else {
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
//# sourceMappingURL=contacts.js.map