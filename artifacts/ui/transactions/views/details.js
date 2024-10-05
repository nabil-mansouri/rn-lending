var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { colors, stylesForm, stylesGlobal } from "../styles";
import { TRListActions } from "../actions";
import { Pictures, Telltales, Chips, Steps } from "../components";
import { selectList } from "./../selectors";
import { HeaderIcon } from "../components";
class Props {
}
__decorate([
    ConnectProp(selectList)
], Props.prototype, "trstate", void 0);
__decorate([
    ConnectSaga(TRListActions.DETAIL_GOBACK)
], Props.prototype, "back", void 0);
let HeaderIconImpl = class HeaderIconImpl extends HeaderIcon {
    getName() { return "arrow-back"; }
    onAction() { this.props.back(); }
};
HeaderIconImpl = __decorate([
    ReduxConnect(Props)
], HeaderIconImpl);
/**
 *
 */
let Details = class Details extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.trstate.error && this.props.trstate.error) {
            Alert.alert(this.props.trstate.errorTitle, this.props.trstate.errorBody, [], { cancelable: true });
        }
    }
    render() {
        const { current, loading } = this.props.trstate;
        if (loading) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(ActivityIndicator, { size: 'large', animating: loading }));
        }
        const renderDetails = () => {
            const values = new Array();
            values.push({ key: "Date du prêt", value: current.createdAtFormatted });
            values.push({ key: "Rendre avant le", value: current.expireOnFormatted });
            values.push({ key: "Lieu du prêt", value: current.locationName });
            return React.createElement(React.Fragment, null,
                React.createElement(Text, { style: stylesForm.header }, "D\u00E9tails"),
                React.createElement(View, { style: stylesForm.block_wrapper }, values.map((value, index, array) => React.createElement(View, { style: [stylesForm.block_row, array.length == index + 1 ? stylesForm.block_row_last : {}], key: index },
                    React.createElement(Text, { style: styles.detail_key }, value.key),
                    React.createElement(Text, { style: styles.detail_value }, value.value)))));
        };
        return React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, { style: styles.scrollview },
                React.createElement(Text, { style: stylesForm.header }, "Pr\u00EAt"),
                React.createElement(View, { style: [stylesForm.block_wrapper, styles.section_80] },
                    React.createElement(Chips, { contact: current.sender, style: styles.chips_left }),
                    React.createElement(Text, { style: styles.chips_arrow }, "arrow_forward"),
                    React.createElement(Chips, { contact: current.receiver, style: styles.chips_right })),
                React.createElement(Text, { style: stylesForm.header }, "Montant"),
                React.createElement(View, { style: [stylesForm.block_wrapper, styles.section_80] },
                    React.createElement(Text, { style: styles.title }, current.fullTitle),
                    React.createElement(Text, { style: styles.cause }, current.reason ? current.reason : "Pas de motif")),
                React.createElement(Steps, { transaction: current, edit: false }),
                React.createElement(Telltales, { transaction: current, editMode: false }),
                renderDetails(),
                React.createElement(Pictures, { transaction: current, editMode: false })),
            React.createElement(Text, { style: styles.btn }, "Rendre mon emprunt"));
    }
};
Details.navigationOptions = {
    headerLeft: () => React.createElement(HeaderIconImpl, null)
};
Details = __decorate([
    ReduxConnect(Props)
], Details);
export { Details };
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    btn: {
        height: 56,
        backgroundColor: colors.main,
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 56,
        elevation: 4
    },
    container: {
        flex: 1
    },
    scrollview: {
        flexDirection: "column",
        backgroundColor: "rgb(236,238,241)",
        paddingBottom: 16
    },
    tr_direction: {
        height: 80,
        width: "100%",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.borders_dark
    },
    section_80: {
        height: 80
    },
    chips_left: {
        position: "absolute",
        left: 16,
        top: 24
    },
    chips_right: {
        position: "absolute",
        right: 16,
        top: 24
    },
    chips_arrow: {
        position: "absolute",
        left: width / 2 - 12,
        top: 24,
        fontSize: 24,
        fontFamily: "MaterialIcons-Regular"
    },
    title: {
        position: "absolute",
        fontSize: 40,
        color: colors.main,
        top: 4,
        width: "100%",
        textAlign: "center",
    },
    cause: {
        position: "absolute",
        fontSize: 18,
        color: colors.textDark,
        bottom: 8,
        width: "100%",
        textAlign: "center"
    },
    detail_key: {
        fontSize: 18,
        color: colors.textDark,
        flex: 1,
        fontFamily: "Roboto"
    },
    detail_value: {
        fontSize: 16,
        color: colors.textDark
    }
});
//# sourceMappingURL=details.js.map