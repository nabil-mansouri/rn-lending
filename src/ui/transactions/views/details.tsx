import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { colors, stylesForm, stylesGlobal } from "../styles";
import { TRListActions } from "../actions";
import { Pictures, Telltales, Chips, Steps } from "../components";
import { TRListState } from "./../state";
import { selectList } from "./../selectors";
import { HeaderIcon } from "../components";

class Props {
    @ConnectProp(selectList) trstate?: TRListState;
    @ConnectSaga(TRListActions.DETAIL_GOBACK) back?: () => void;
}
@ReduxConnect(Props)
class HeaderIconImpl extends HeaderIcon<Props>{
    getName(): string { return "arrow-back" }
    onAction(): void { this.props.back() }
}
/**
 * 
 */
@ReduxConnect(Props)
export class Details extends Component<Props> {
    static navigationOptions = {
        headerLeft: () => <HeaderIconImpl />
    }
    constructor(props) {
        super(props)
    }
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
        const { current, loading } = this.props.trstate;
        if (loading) {
            return <View style={stylesGlobal.loading}>
                <ActivityIndicator size='large' animating={loading} />
            </View>
        }
        const renderDetails = () => {
            const values = new Array<{ key: string, value: string }>();
            values.push({ key: "Date du prêt", value: current.createdAtFormatted });
            values.push({ key: "Rendre avant le", value: current.expireOnFormatted });
            values.push({ key: "Lieu du prêt", value: current.locationName });
            return <React.Fragment>
                <Text style={stylesForm.header}>Détails</Text>
                <View style={stylesForm.block_wrapper}>
                    {values.map((value, index, array) =>
                        <View style={[stylesForm.block_row, array.length == index + 1 ? stylesForm.block_row_last : {}]} key={index}>
                            <Text style={styles.detail_key}>{value.key}</Text>
                            <Text style={styles.detail_value}>{value.value}</Text>
                        </View>)}
                </View>
            </React.Fragment>
        }
        return <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <Text style={stylesForm.header}>Prêt</Text>
                <View style={[stylesForm.block_wrapper, styles.section_80]}>
                    <Chips contact={current.sender} style={styles.chips_left} />
                    <Text style={styles.chips_arrow}>arrow_forward</Text>
                    <Chips contact={current.receiver} style={styles.chips_right} />
                </View>
                <Text style={stylesForm.header}>Montant</Text>
                <View style={[stylesForm.block_wrapper, styles.section_80]}>
                    <Text style={styles.title}>{current.fullTitle}</Text>
                    <Text style={styles.cause}>{current.reason ? current.reason : "Pas de motif"}</Text>
                </View>
                <Steps transaction={current} edit={false} />
                <Telltales transaction={current} editMode={false} />
                {renderDetails()}
                <Pictures transaction={current} editMode={false} />
            </ScrollView>
            <Text style={styles.btn}  >Rendre mon emprunt</Text>
        </View >
    }
}
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
