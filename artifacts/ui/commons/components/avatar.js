import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { contants, colors } from "../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
export class Avatar extends Component {
    render() {
        const styC = this.props.styleCommons || {};
        if (this.props.source) {
            const sty = this.props.styleImg || {};
            return React.createElement(Image, { source: { uri: this.props.source, width: contants.avatarHeight, height: contants.avatarHeight }, style: [styles.telltale_avatar, styC, sty] });
        }
        else {
            const sty = this.props.styleText || {};
            return React.createElement(Icon, { size: this.props.textSize || 24, name: "person", color: "white", style: [styles.placeholder, styC, sty] });
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
//# sourceMappingURL=avatar.js.map