import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
const styles = Platform.OS == "android" ? StyleSheet.create({
    icon: {
        color: "white",
        marginLeft: 16
    }
}) : StyleSheet.create({
    icon: {
        color: "white",
        marginLeft: 16
    }
});
export class HeaderIcon extends Component {
    constructor(props) {
        super(props);
        this.getName = this.getName.bind(this);
        this.onAction = this.onAction.bind(this);
    }
    render() {
        return React.createElement(TouchableOpacity, { hitSlop: { bottom: 16, top: 16, left: 16, right: 16 }, onPress: this.onAction },
            React.createElement(Icon, { size: 24, name: this.getName(), color: "white", style: styles.icon }));
    }
}
//# sourceMappingURL=headers.js.map