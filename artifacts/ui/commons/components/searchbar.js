import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from "../../commons/styles";
export class ISearchBar extends Component {
    render() {
        return React.createElement(View, { style: [styles.search_wrapper, styles.search_text_background] },
            React.createElement(TextInput, { autoFocus: true, style: styles.search_text, clearButtonMode: "never", onChangeText: (t) => this.props.search({ search: t }), returnKeyType: "search", selectionColor: colors.main_light, value: this.props.criteria, underlineColorAndroid: "transparent" }),
            React.createElement(TouchableOpacity, { hitSlop: { bottom: 16, top: 16, left: 16, right: 16 }, onPress: () => this.props.stop() },
                React.createElement(Icon, { size: 18, name: "cancel", color: "white", style: styles.search_icon })));
    }
}
//TODO per platform
const styles = StyleSheet.create({
    search_wrapper: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    search_icon: {
        color: "white",
        marginHorizontal: 8
    },
    search_text_background: {
        height: 28,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.1)"
    },
    search_text: {
        fontSize: 16,
        lineHeight: 28,
        paddingHorizontal: 8,
        marginVertical: 6,
        borderRadius: 8,
        color: "white",
        flex: 1,
        backgroundColor: "transparent"
    }
});
export const SearchBarStyle = styles;
//# sourceMappingURL=searchbar.js.map