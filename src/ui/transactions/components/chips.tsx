import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Text, Image } from 'react-native';
import { Contact } from "../models";
import { colors } from "../styles";

interface PropsChips {
    contact: Contact;
    style: StyleProp<ViewStyle>;
}
interface StateChips {
}
export class Chips extends Component<PropsChips, StateChips> {
    render() {
        const { contact } = this.props;
        return <View style={[styles.chips_background, this.props.style]}>
            <Image source={{ uri: contact.avatar, width: chipsHeight, height: chipsHeight }} style={styles.chips_avatar}></Image>
            <Text style={styles.chips_text}>{contact.shortName}</Text>
        </View>
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
