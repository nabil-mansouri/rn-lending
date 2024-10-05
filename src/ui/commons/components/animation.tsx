import React from "react"

import { Animated, ViewStyle } from 'react-native';

interface Props {
    visible: boolean
    style?: ViewStyle
}
interface State {
    visible: boolean
}
export class Scale extends React.Component<Props, State> {
    _visibility: Animated.Value;
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
        const { visible, children, ...rest } = this.props;
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
        return (
            <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
                {this.state.visible ? children : null}
            </Animated.View>
        );
    }
}