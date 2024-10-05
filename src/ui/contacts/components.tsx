import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native"
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ContactActions, FetchingPayload } from "./actions";
import { selectContactSearch } from "./selectors";
import { SearchBarStyle } from "../commons/components";
import { colors } from "../commons/styles";
/**
 * 
 */
class SearchContactProps {
    @ConnectProp(selectContactSearch) criteria?: string;
    @ConnectSaga(ContactActions.SEARCH_CHANGE) search?: (body: FetchingPayload) => void;
    @ConnectSaga(ContactActions.SEARCH_STOP) stop?: () => void;
    @ConnectSaga(ContactActions.SUBMIT) submit?: () => void;
}
@ReduxConnect(SearchContactProps)
export class SearchBarContact extends React.Component<SearchContactProps> {
    render() {
        return <View style={SearchBarStyle.search_wrapper}>
            <View style={SearchBarStyle.search_text_background}>
                <TextInput autoFocus={true} style={SearchBarStyle.search_text} clearButtonMode="never"
                    onChangeText={(t) => this.props.search({ search: t })}
                    returnKeyType="search" selectionColor={colors.main_light}
                    value={this.props.criteria} underlineColorAndroid="transparent">
                </TextInput>
                <TouchableOpacity hitSlop={{ bottom: 16, top: 16, left: 16, right: 16 }} onPress={() => this.props.stop()}>
                    <Icon size={18} name="cancel" color="white" style={SearchBarStyle.search_icon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={stylesCustom.style_check} hitSlop={{ bottom: 16, top: 16, left: 16, right: 16 }} onPress={() => this.props.submit()}>
                <Icon size={24} name="check" color="white" style={[SearchBarStyle.search_icon]} />
            </TouchableOpacity>
        </View >
    }
}

export const stylesCustom = StyleSheet.create({
    style_check: {
        marginRight: 18
    }
});