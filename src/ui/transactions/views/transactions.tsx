import React, { Component } from 'react';
import Touchable from 'react-native-touchable-safe';
import { NavigationActions } from 'react-navigation';
import { Alert, StyleSheet, Image, View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { TRListActions, DetailPayload } from "../actions";
import { stylesGlobal, colors } from "../styles";
import { TRListState, Transaction } from "../state";
import { selectList } from "../selectors";
import { Routes } from "../navigation";


/**
 * 
 */
class PropsRow {
    transaction: Transaction
    @ConnectSaga(TRListActions.GOTO_DETAIL) detail?: (payload: DetailPayload) => void
}
@ReduxConnect(PropsRow)
class TransactionRow extends Component<PropsRow, any> {
    render() {
        const styleBadge = [styles.badge];
        const tr = this.props.transaction;
        (tr.iShare) && styleBadge.push(styles.badge_ishare);
        const styleSubTitle = [styles.subtitle];
        if (tr.daysBeforeEnd < 0) {
            styleSubTitle.push(styles.subtitle_expired);
        }
        return (
            <Touchable onPress={() => this.props.detail({ transaction: this.props.transaction })}
                android="native" ios="opacity">
                <View style={styles.row} >
                    <Image style={styles.image} source={{ uri: tr.otherAvatar, width: 40, height: 40 }}></Image>
                    <Text style={styles.title}>{tr.fullTitle}</Text>
                    <Text style={styleSubTitle}>{tr.durationLeftName + " -" + tr.otherShortName}</Text>
                    <Text style={styleBadge}>{tr.iShareName}</Text>
                </View >
            </Touchable>
        );
    }
}
@ReduxConnect(PropsRow)
class HistoryRow extends Component<PropsRow, any> {
    render() {
        const styleBadge = [styles.badge];
        const tr = this.props.transaction;
        (tr.iShare) && styleBadge.push(styles.badge_ishare);
        const styleSubTitle = [styles.subtitle];
        if (tr.diffBetweenFinishAndExpireInDays < 0) {
            styleSubTitle.push(styles.subtitle_expired);
        }
        return (
            <Touchable onPress={() => this.props.detail({ transaction: this.props.transaction })}
                android="native" ios="opacity">
                <View style={styles.row} >
                    <Image style={styles.image} source={{ uri: tr.otherAvatar, width: 40, height: 40 }}></Image>
                    <Text style={styles.title}>{tr.fullTitle}</Text>
                    <Text style={styleSubTitle}>{tr.finishedAtFormatted + " -" + tr.otherShortName}</Text>
                    <Text style={styleBadge}>{tr.iShareName}</Text>
                </View >
            </Touchable>
        );
    }
}
/**
 * 
 */

class Props {
    @ConnectProp(selectList) trstate?: TRListState;
    @ConnectSaga(NavigationActions.NAVIGATE) navigate?: (route: { routeName: string }) => void
}
@ReduxConnect(Props)
export class Transactions extends Component<Props> {

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.trstate.error && this.props.trstate.error) {
            Alert.alert(
                this.props.trstate.errorTitle,
                this.props.trstate.errorBody,
                [],
                { cancelable: true }
            )
        }
    }
    render() {
        const { loading, transactions } = this.props.trstate;
        if (loading) {
            return <View style={stylesGlobal.loading}>
                <ActivityIndicator size='large' animating={loading} />
            </View>
        } else if (transactions.length == 0) {
            return <View style={stylesGlobal.loading}>
                <Text style={styles.text_empty}>Je n'ai aucun prêt ou emprunt en cours</Text>
                <TouchableOpacity onPress={() => this.props.navigate({ routeName: Routes.CREATE })}>
                    <Text style={styles.btn}>JE ME LANCE</Text>
                </TouchableOpacity>
            </View>
        } else {
            return (
                <FlatList data={transactions}
                    keyExtractor={(_, index) => index + ""}
                    renderItem={(d) => <TransactionRow {...this.props} transaction={d.item} />} >
                </FlatList >
            );
        }
    }
}
@ReduxConnect(Props)
export class History extends React.Component<Props> {

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.trstate.error && this.props.trstate.error) {
            Alert.alert(
                this.props.trstate.errorTitle,
                this.props.trstate.errorBody,
                [],
                { cancelable: true }
            )
        }
    }
    render() {
        const { loading, transactions } = this.props.trstate;
        if (loading) {
            return <View style={stylesGlobal.loading}>
                <ActivityIndicator size='large' animating={loading} />
            </View>
        } else if (transactions.length == 0) {
            return <View style={stylesGlobal.loading}>
                <Text style={styles.text_empty}>Je n'ai aucun prêt ou emprunt dans mon historique</Text>
                <TouchableOpacity onPress={() => this.props.navigate({ routeName: Routes.CREATE })}>
                    <Text style={styles.btn}>Je me lance</Text>
                </TouchableOpacity>
            </View>
        } else {
            return (<FlatList data={transactions}
                keyExtractor={(_, index) => index + ""}
                renderItem={(d) => <HistoryRow {...this.props} transaction={d.item} />} >
            </FlatList >
            );
        }
    }
}
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