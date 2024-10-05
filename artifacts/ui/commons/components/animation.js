var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from "react";
import { Animated } from 'react-native';
export class Scale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
        };
    }
    componentWillMount() {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.setState({ visible: true });
        }
        Animated.timing(this._visibility, {
            delay: 500,
            toValue: nextProps.visible ? 1 : 0,
            duration: 300,
        }).start(() => {
            this.setState({ visible: nextProps.visible });
        });
    }
    render() {
        const _a = this.props, { visible, children } = _a, rest = __rest(_a, ["visible", "children"]);
        const containerStyle = {
            opacity: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: this._visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    }),
                },
            ],
        };
        const combinedStyle = [containerStyle, this.props.style];
        return (React.createElement(Animated.View, Object.assign({ style: this.state.visible ? combinedStyle : containerStyle }, rest), this.state.visible ? children : null));
    }
}
//# sourceMappingURL=animation.js.map