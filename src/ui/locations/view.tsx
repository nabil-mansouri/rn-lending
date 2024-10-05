import React, { Component } from 'react';
import { StatusBar, Alert, StyleSheet, TouchableOpacity, View, Text, FlatList, TextInput, Modal, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { colors, stylesForm, contants } from "../commons/styles";
import { LocationActions, SearchPayload, SelectAddressPayload } from "./actions";
import { Address, LOSTate } from "./state";
import { selectRoot } from "./selectors"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ReduxConnect, ConnectProp, ConnectSaga } from 'react-redux-annotation/saga';

/**
 * 
 */
interface PropRow {
    data: Address,
    last: boolean;
    onPress: (data: Address) => void
}
export class LocationRow extends Component<PropRow> {
    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.onPress(data)}>
                <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                    <Text>{data.formattedAddress}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
/**
 * 
 */
class PropsInput {
    @ConnectProp(selectRoot) location?: LOSTate;
    @ConnectSaga(LocationActions.SUBMIT) submit?: () => void
    @ConnectSaga(LocationActions.SEARCH_ADDRESS) search?: (s: SearchPayload) => void
    @ConnectSaga(LocationActions.GEOLOCALIZE) geolocalize?: () => void

}
@ReduxConnect(PropsInput)
export class LocationInput extends Component<PropsInput> {
    render() {
        return (
            <View style={[stylesForm.block_wrapper, styles.input_wrapper]}>
                <TextInput autoFocus={true} style={styles.search_text} clearButtonMode="never"
                    onChangeText={(t) => this.props.search({ criteria: t })}
                    returnKeyType="done" selectionColor={colors.textDark}
                    value={this.props.location.criteria} underlineColorAndroid="transparent"
                    onSubmitEditing={() => this.props.submit()}>
                </TextInput>
                <TouchableOpacity onPress={() => this.props.geolocalize()} hitSlop={{ bottom: 16, top: 16, left: 16, right: 16 }}>
                    <Icon size={24} name="my-location" color="white" style={styles.search_icon} />
                </TouchableOpacity>
            </View>
        );
    }
}
/**
 * 
 */
class Props {
    style?: ViewStyle
    @ConnectProp(selectRoot) location?: LOSTate;
    @ConnectSaga(LocationActions.SELECT_ADDRESS) select?: (p: SelectAddressPayload) => void
    @ConnectSaga(LocationActions.CANCEL) cancel?: () => void
    @ConnectSaga(LocationActions.REQUESTPERM) requestPerm?: () => void

}
@ReduxConnect(Props)
export class Locations extends Component<Props> {

    componentDidUpdate(prev: Props) {
        const props = this.props;
        if (!prev.location.error && props.location.error) {
            Alert.alert(
                props.location.errorTitle,
                props.location.errorBody,
                [],
                { cancelable: true }
            )
        } else if (!prev.location.needRequest && props.location.needRequest) {
            Alert.alert(
                "Accès à votre position",
                "Pret emprunt souhaite accèder à votre position",
                [
                    { text: 'NON', onPress: () => props.cancel(), style: 'cancel' },
                    { text: 'OUI', onPress: () => props.requestPerm() }],
                { cancelable: false }
            )
        }
    }
    render() {
        const { results, criteria } = this.props.location;
        const finalIndex = results.length - 1;
        const renderResult = () => {
            if (results.length == 0 && criteria && criteria.trim().length == 0) {
                return <View style={stylesForm.block_wrapper}>
                    <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                        <Text>Aucun résultat pour cette adresse</Text>
                    </View>
                </View>
            } else {
                return <View style={stylesForm.block_wrapper}>
                    <FlatList data={results} keyExtractor={(_, index) => index + ""}
                        keyboardShouldPersistTaps="handled"
                        renderItem={d =>
                            <LocationRow key={d.index}
                                last={d.index == finalIndex} data={d.item}
                                onPress={(s) => this.props.select({ selected: s })} />} >
                    </FlatList >
                </View>
            }
        }
        return <View style={[styles.container, this.props.style]}>
            <LocationInput />
            {renderResult()}
        </View>
    }
}
class PropsModal {
    @ConnectProp(selectRoot) location?: LOSTate;
    @ConnectSaga(LocationActions.CANCEL) cancel?: () => void
    visible: boolean;
}
@ReduxConnect(Props)
export class LocationModal extends Component<PropsModal> {

    render() {
        return <Modal animationType="fade" transparent={true} onRequestClose={() => this.props.cancel()} visible={this.props.visible}>
            <TouchableWithoutFeedback onPress={() => this.props.cancel()}>
                <View style={styles.modal_background}>
                    <Locations />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    }
}
const statusHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
    modal_background: {
        flex: 1,
        zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modal_inner: {
        marginTop: statusHeight
    },
    input_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: contants.blockRowHeight,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: colors.borders,
    },
    search_text: {
        paddingLeft: 16,
        flex: 1,
        color: colors.textDark,
        fontSize: 14,
    },
    search_icon: {
        marginHorizontal: 16,
        color: colors.main
    },
    container: {
        flex: 1
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
