var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from 'react';
import Touchable from 'react-native-touchable-safe';
import { NavigationActions } from 'react-navigation';
import { Alert, StyleSheet, Image, View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { TRListActions } from "../actions";
import { stylesGlobal, colors } from "../styles";
import { selectList } from "../selectors";
import { Routes } from "../navigation";
/**
 *
 */
class PropsRow {
}
__decorate([
    ConnectSaga(TRListActions.GOTO_DETAIL)
], PropsRow.prototype, "detail", void 0);
let TransactionRow = class TransactionRow extends Component {
    render() {
        const styleBadge = [styles.badge];
        const tr = this.props.transaction;
        (tr.iShare) && styleBadge.push(styles.badge_ishare);
        const styleSubTitle = [styles.subtitle];
        if (tr.daysBeforeEnd < 0) {
            styleSubTitle.push(styles.subtitle_expired);
        }
        return (React.createElement(Touchable, { onPress: () => this.props.detail({ transaction: this.props.transaction }), android: "native", ios: "opacity" },
            React.createElement(View, { style: styles.row },
                React.createElement(Image, { style: styles.image, source: { uri: tr.otherAvatar, width: 40, height: 40 } }),
                React.createElement(Text, { style: styles.title }, tr.fullTitle),
                React.createElement(Text, { style: styleSubTitle }, tr.durationLeftName + " -" + tr.otherShortName),
                React.createElement(Text, { style: styleBadge }, tr.iShareName))));
    }
};
TransactionRow = __decorate([
    ReduxConnect(PropsRow)
], TransactionRow);
let HistoryRow = class HistoryRow extends Component {
    render() {
        const styleBadge = [styles.badge];
        const tr = this.props.transaction;
        (tr.iShare) && styleBadge.push(styles.badge_ishare);
        const styleSubTitle = [styles.subtitle];
        if (tr.diffBetweenFinishAndExpireInDays < 0) {
            styleSubTitle.push(styles.subtitle_expired);
        }
        return (React.createElement(Touchable, { onPress: () => this.props.detail({ transaction: this.props.transaction }), android: "native", ios: "opacity" },
            React.createElement(View, { style: styles.row },
                React.createElement(Image, { style: styles.image, source: { uri: tr.otherAvatar, width: 40, height: 40 } }),
                React.createElement(Text, { style: styles.title }, tr.fullTitle),
                React.createElement(Text, { style: styleSubTitle }, tr.finishedAtFormatted + " -" + tr.otherShortName),
                React.createElement(Text, { style: styleBadge }, tr.iShareName))));
    }
};
HistoryRow = __decorate([
    ReduxConnect(PropsRow)
], HistoryRow);
/**
 *
 */
class Props {
}
__decorate([
    ConnectProp(selectList)
], Props.prototype, "trstate", void 0);
__decorate([
    ConnectSaga(NavigationActions.NAVIGATE)
], Props.prototype, "navigate", void 0);
let Transactions = class Transactions extends Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.trstate.error && this.props.trstate.error) {
            Alert.alert(this.props.trstate.errorTitle, this.props.trstate.errorBody, [], { cancelable: true });
        }
    }
    render() {
        const { loading, transactions } = this.props.trstate;
        if (loading) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(ActivityIndicator, { size: 'large', animating: loading }));
        }
        else if (transactions.length == 0) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(Text, { style: styles.text_empty }, "Je n'ai aucun pr\u00EAt ou emprunt en cours"),
                React.createElement(TouchableOpacity, { onPress: () => this.props.navigate({ routeName: Routes.CREATE }) },
                    React.createElement(Text, { style: styles.btn }, "JE ME LANCE")));
        }
        else {
            return (React.createElement(FlatList, { data: transactions, keyExtractor: (_, index) => index + "", renderItem: (d) => React.createElement(TransactionRow, Object.assign({}, this.props, { transaction: d.item })) }));
        }
    }
};
Transactions = __decorate([
    ReduxConnect(Props)
], Transactions);
export { Transactions };
let History = class History extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.trstate.error && this.props.trstate.error) {
            Alert.alert(this.props.trstate.errorTitle, this.props.trstate.errorBody, [], { cancelable: true });
        }
    }
    render() {
        const { loading, transactions } = this.props.trstate;
        if (loading) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(ActivityIndicator, { size: 'large', animating: loading }));
        }
        else if (transactions.length == 0) {
            return React.createElement(View, { style: stylesGlobal.loading },
                React.createElement(Text, { style: styles.text_empty }, "Je n'ai aucun pr\u00EAt ou emprunt dans mon historique"),
                React.createElement(TouchableOpacity, { onPress: () => this.props.navigate({ routeName: Routes.CREATE }) },
                    React.createElement(Text, { style: styles.btn }, "Je me lance")));
        }
        else {
            return (React.createElement(FlatList, { data: transactions, keyExtractor: (_, index) => index + "", renderItem: (d) => React.createElement(HistoryRow, Object.assign({}, this.props, { transaction: d.item })) }));
        }
    }
};
History = __decorate([
    ReduxConnect(Props)
], History);
export { History };
const styles = StyleSheet.create({
    row: {
        height: 72,
        borderColor: 'rgb(209,209,209)',
        borderBottomWidth: 1
    },
    title: {
        fontFamily: "Roboto",
        color: "rgb(84,85,85)",
        fontSize: 16,
        position: 'absolute',
        left: 75,
        top: 16,
    },
    subtitle: {
        fontFamily: "Roboto",
        color: "rgb(155,155,155)",
        fontSize: 14,
        position: 'absolute',
        left: 75,
        top: 36,
    },
    subtitle_expired: {
        color: "red"
    },
    image: {
        borderRadius: 20,
        position: 'absolute',
        left: 16,
        top: 18,
    },
    badge: {
        backgroundColor: colors.main,
        fontFamily: "Roboto",
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 6,
        paddingBottom: 6,
        width: 66,
        overflow: 'hidden',
        position: 'absolute',
        right: 16,
        top: 22,
        borderRadius: 4
    },
    badge_ishare: {
        backgroundColor: "rgb(246,166,35)",
        borderRadius: 4
    },
    text_empty: {
        color: colors.textDark,
        textAlign: "center"
    },
    btn: {
        backgroundColor: colors.main,
        color: "white",
        fontSize: 16,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 24,
        overflow: 'hidden',
        borderRadius: 4
    }
});
//# sourceMappingURL=transactions.js.map