import React, { Component } from 'react';
import { StyleSheet, Image, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { contants, colors } from "../styles";
import Icon from 'react-native-vector-icons/MaterialIcons'

interface PropsField {
    source: string;
    styleCommons?: StyleProp<ViewStyle>;
    styleImg?: StyleProp<ImageStyle>;
    styleText?: StyleProp<TextStyle>;
    textSize?: number;
}
export class Avatar extends Component<PropsField> {
    render() {
        const styC = this.props.styleCommons || {};
        if (this.props.source) {
            const sty = this.props.styleImg || {};
            return <Image source={{ uri: this.props.source, width: contants.avatarHeight, height: contants.avatarHeight }} style={[styles.telltale_avatar, styC, sty]}></Image>
        } else {
            const sty = this.props.styleText || {};
            return <Icon size={this.props.textSize || 24} name="person" color="white" style={[styles.placeholder, styC, sty]} />
        }
    }
}
const styles = StyleSheet.create({
    telltale_avatar: {
        borderRadius: contants.avatarHeight / 2,
    },
    placeholder: {
        borderRadius: contants.avatarHeight / 2,
        width: contants.avatarHeight,
        height: contants.avatarHeight,
        lineHeight: contants.avatarHeight,
        textAlign: "center",
        backgroundColor: colors.main,
        color: "white",
        fontSize: 24,
        overflow: "hidden"
    }
});
