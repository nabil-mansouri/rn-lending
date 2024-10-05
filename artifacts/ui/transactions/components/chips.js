import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from "../styles";
export class Chips extends Component {
    render() {
        const { contact } = this.props;
        return React.createElement(View, { style: [styles.chips_background, this.props.style] },
            React.createElement(Image, { source: { uri: contact.avatar, width: chipsHeight, height: chipsHeight }, style: styles.chips_avatar }),
            React.createElement(Text, { style: styles.chips_text }, contact.shortName));
    }
}
const chipsHeight = 32;
const chipsHeightHalf = chipsHeight / 2;
const styles = StyleSheet.create({
    chips_background: {
        width: 130,
        height: chipsHeight,
        borderRadius: chipsHeightHalf,
        backgroundColor: "rgb(234,234,234)"
    },
    chips_avatar: {
        borderRadius: chipsHeightHalf
    },
    chips_text: {
        position: "absolute",
        left: 8 + chipsHeight,
        top: (chipsHeight - 14) / 2,
        fontSize: 14,
        fontFamily: "Roboto",
        color: colors.textDark
    },
});
//# sourceMappingURL=chips.js.map