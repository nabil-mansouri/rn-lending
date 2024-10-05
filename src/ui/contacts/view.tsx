import React, { Component } from 'react';
import { Alert, StyleSheet, FlatList, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { stylesForm, stylesGlobal, contants, colors } from "../commons/styles";
import { selectRoot } from "./selectors";
import { ContactRecord, COState } from "./state";
import { ContactActions, TogglePayload } from "./actions";
import { Avatar } from "../commons/components";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import ActionButton from 'react-native-action-button';
const ActionButtonOther: any = ActionButton;

/**
 * 
 */
class PropRow {
    model: ContactRecord;
    single: boolean;
    @ConnectSaga(ContactActions.TOGGLE) toggle?: (p: TogglePayload) => void
}
@ReduxConnect(PropRow)
class ContactListRow extends Component<PropRow>{
    render() {
        const { model, single } = this.props;
        const styleRow = [stylesForm.block_row, stylesForm.block_row_last];
        // 
        let checkbox = model.selected ? "check-box" : "check-box-outline-blank";
        if (single) {
            checkbox = model.selected ? "radio-button-checked" : "radio-button-unchecked";
        }
        return <TouchableOpacity onPress={() => this.props.toggle({ selected: model })}>
            <View style={styleRow}>
                <Avatar source={model.thumbnailPath} />
                <Text style={styles.telltale_text}>{model.givenName}</Text>
                <Icon size={24} name={checkbox} color="white" style={styles.check_box} />
            </View>
        </TouchableOpacity>
    }
}
/**
 * 
 */
class Props {
    @ConnectProp(selectRoot) contacts?: COState;
    @ConnectSaga(ContactActions.FETCH) fetch?: () => void
    @ConnectSaga(ContactActions.REQUESTPERM_CONTACT) requestPerm?: () => void
    @ConnectSaga(ContactActions.SEARCH_START) search?: () => void
    @ConnectSaga(ContactActions.CANCEL) cancel?: () => void
}
@ReduxConnect(Props)
export class ContactList extends Component<Props> {
    componentDidMount() {
        this.props.fetch();
    }
    componentDidUpdate(prev: Props) {
        const props = this.props;
        if (!prev.contacts.error && props.contacts.error) {
            Alert.alert(
                props.contacts.errorTitle,
                props.contacts.errorBody,
                [],
                { cancelable: true }
            )
        } else if (!prev.contacts.needRequest && props.contacts.needRequest) {
            Alert.alert(
                "Accès aux contacts",
                "Pret emprunt souhaite afficher votre liste de contact",
                [
                    { text: 'NON', onPress: () => props.cancel(), style: 'cancel' },
                    { text: 'OUI', onPress: () => props.requestPerm() }],
                { cancelable: false }
            )
        }
    }
    render() {
        const { error, contacts, loading, single, searching } = this.props.contacts;
        if (error) {
            return <View style={stylesGlobal.loading}>
                <Text>Impossible de charger les contacts</Text>
            </View>
        } else {
            if (loading) {
                return <View style={stylesGlobal.loading}>
                    <ActivityIndicator size='large' animating={loading} />
                </View>
            } else {
                return <View>
                    <FlatList data={contacts}
                        keyExtractor={(_, index) => index + ""}
                        keyboardShouldPersistTaps="handled"
                        renderItem={(d) => <ContactListRow {...this.props} model={d.item} single={single} />} >
                    </FlatList >
                    {!searching && <ActionButtonOther buttonColor={colors.inverse} onPress={() => this.props.search()}
                        renderIcon={() => <Icon name="search" style={styles.actionButtonIcon} />} >
                    </ActionButtonOther>}
                </View >
            }
        }
    }
}
const styles = StyleSheet.create({
    row_selected: {
        backgroundColor: colors.main
    },
    text_selected: {
        color: "white"
    },
    telltale_avatar_placeholder: {
        borderRadius: contants.avatarHeight / 2,
        top: (contants.blockRowHeight - contants.avatarHeight) / 2,
        width: contants.avatarHeight,
        height: contants.avatarHeight,
        lineHeight: contants.avatarHeight,
        textAlign: "center",
        backgroundColor: colors.main,
        color: "white",
        fontSize: 24,
        overflow: "hidden"
    },
    check_box: {
        position: "absolute",
        top: (contants.blockRowHeight - contants.avatarHeight) / 2,
        right: 16,
        color: colors.main,
        fontSize: 24,
        lineHeight: contants.avatarHeight
    },
    telltale_text: {
        position: "absolute",
        left: 64,
        top: (contants.blockRowHeight - 16) / 2,
        fontSize: 16,
        fontFamily: "Roboto",
        color: colors.textDark
    },
    actionButtonIcon: {
        fontSize: 24,
        lineHeight: 56,
        color: 'white',
    },
});
