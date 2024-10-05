import React, { Component, Children, cloneElement } from 'react';
import { TouchableHighlight, Animated, Dimensions, Modal, PanResponder, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const DRAG_DISMISS_THRESHOLD = 150;
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);
const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
    },
    open: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        // Android pan handlers crash without this declaration:
        backgroundColor: 'transparent',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        backgroundColor: 'transparent',
    },
    headerWrapper: {
        backgroundColor: "rgba(0,0,0,0.2)",
        width: "100%",
        height: 56,
        overflow: "hidden"
    },
    closeButton: {
        position: "absolute",
        left: 16,
        color: 'white',
        lineHeight: 40,
        width: 40,
        textAlign: 'center',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 1.5,
        shadowColor: 'black',
        shadowOpacity: 0.8,
    },
    removeButton: {
        position: "absolute",
        right: 16,
        color: 'white',
        lineHeight: 40,
        width: 40,
        textAlign: 'center',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 1.5,
        shadowColor: 'black',
        shadowOpacity: 0.8,
    },
});
class OverlayProps {
    constructor() {
        this.springConfig = { tension: 30, friction: 7 };
        this.backgroundColor = 'black';
    }
}
class OverlayState {
    constructor() {
        this.isAnimating = false;
        this.isPanning = false;
        this.target = {
            x: 0,
            y: 0,
            opacity: 1,
        };
        this.pan = new Animated.Value(0);
        this.openVal = new Animated.Value(0);
    }
}
export class LightboxOverlay extends Component {
    constructor() {
        super(...arguments);
        this.state = new OverlayState;
        this.open = () => {
            if (isIOS) {
                StatusBar.setHidden(true, 'fade');
            }
            this.state.pan.setValue(0);
            this.setState({
                isAnimating: true,
                target: {
                    x: 0,
                    y: 0,
                    opacity: 1,
                }
            });
            Animated.spring(this.state.openVal, Object.assign({ toValue: 1 }, this.props.springConfig)).start(() => {
                this.setState({ isAnimating: false });
                this.props.didOpen();
            });
        };
        this.remove = () => {
            this.props.willClose();
            if (isIOS) {
                StatusBar.setHidden(false, 'fade');
            }
            this.props.onClose();
            this.props.onRemove();
        };
        this.close = () => {
            this.props.willClose();
            if (isIOS) {
                StatusBar.setHidden(false, 'fade');
            }
            this.setState({
                isAnimating: true,
            });
            Animated.spring(this.state.openVal, Object.assign({ toValue: 0 }, this.props.springConfig)).start(() => {
                this.setState({
                    isAnimating: false,
                });
                this.props.onClose();
            });
        };
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (__, _) => !this.state.isAnimating,
            onStartShouldSetPanResponderCapture: (__, _) => !this.state.isAnimating,
            onMoveShouldSetPanResponder: (__, _) => !this.state.isAnimating,
            onMoveShouldSetPanResponderCapture: (__, _) => !this.state.isAnimating,
            onPanResponderGrant: (__, _) => {
                this.state.pan.setValue(0);
                this.setState({ isPanning: true });
            },
            onPanResponderMove: Animated.event([
                null,
                { dy: this.state.pan }
            ]),
            onPanResponderTerminationRequest: (_, __) => true,
            onPanResponderRelease: (_, gestureState) => {
                if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
                    this.setState({
                        isPanning: false,
                        target: {
                            y: gestureState.dy,
                            x: gestureState.dx,
                            opacity: 1 - Math.abs(gestureState.dy / WINDOW_HEIGHT)
                        }
                    });
                    this.close();
                }
                else {
                    Animated.spring(this.state.pan, Object.assign({ toValue: 0 }, this.props.springConfig)).start(() => { this.setState({ isPanning: false }); });
                }
            },
        });
    }
    componentDidMount() {
        if (this.props.isOpen) {
            this.open();
        }
    }
    componentWillReceiveProps(props) {
        if (this.props.isOpen != props.isOpen && props.isOpen) {
            this.open();
        }
    }
    render() {
        const { isOpen, renderHeader, swipeToDismiss, origin, backgroundColor, } = this.props;
        const { isPanning, openVal, target, } = this.state;
        const lightboxOpacityStyle = {
            opacity: openVal.interpolate({ inputRange: [0, 1], outputRange: [0, target.opacity] })
        };
        let handlers;
        if (swipeToDismiss) {
            handlers = this._panResponder.panHandlers;
        }
        let dragStyle;
        if (isPanning) {
            dragStyle = {
                top: this.state.pan,
            };
            lightboxOpacityStyle.opacity = this.state.pan.interpolate({ inputRange: [-WINDOW_HEIGHT, 0, WINDOW_HEIGHT], outputRange: [0, 1, 0] });
        }
        const openStyle = [styles.open, {
                left: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.x, target.x] }),
                top: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y + STATUS_BAR_OFFSET] }),
                width: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH] }),
                height: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT] }),
            }];
        const background = (React.createElement(Animated.View, { style: [styles.background, { backgroundColor: backgroundColor }, lightboxOpacityStyle] }));
        const header = (React.createElement(Animated.View, { style: [styles.header, lightboxOpacityStyle] }, (renderHeader ?
            renderHeader(this.close) :
            (React.createElement(View, { style: styles.headerWrapper },
                React.createElement(TouchableOpacity, { onPress: () => this.close() },
                    React.createElement(Icon, { size: 28, name: "arrow-back", color: "white", style: styles.closeButton })),
                React.createElement(TouchableOpacity, { onPress: this.remove },
                    React.createElement(Icon, { size: 28, name: "delete", color: "white", style: styles.removeButton })))))));
        const content = (React.createElement(Animated.View, Object.assign({ style: [openStyle, dragStyle] }, handlers), this.props.children));
        return (React.createElement(Modal, { visible: isOpen, transparent: true, onRequestClose: () => this.close() },
            background,
            content,
            header));
    }
}
LightboxOverlay.defaultProps = new OverlayProps;
class Props {
    constructor() {
        this.style = {};
        this.activeProps = {};
        this.didOpen = () => { };
        this.onOpen = () => { };
        this.willClose = () => { };
        this.onClose = () => { };
        this.onRemove = () => { };
        this.swipeToDismiss = true;
    }
}
class State {
    constructor() {
        this.isAnimating = false;
        this.isOpen = false;
        this.origin = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        this.layoutOpacity = new Animated.Value(1);
    }
}
export class Lightbox extends Component {
    constructor() {
        super(...arguments);
        this.state = new State;
        this.getContent = () => {
            if (this.props.renderContent) {
                return this.props.renderContent();
            }
            else if (this.props.activeProps) {
                return cloneElement(Children.only(this.props.children), this.props.activeProps);
            }
            return this.props.children;
        };
        this.getOverlayProps = () => ({
            isOpen: this.state.isOpen,
            origin: this.state.origin,
            renderHeader: this.props.renderHeader,
            swipeToDismiss: this.props.swipeToDismiss,
            springConfig: this.props.springConfig,
            backgroundColor: this.props.backgroundColor,
            children: this.getContent(),
            didOpen: this.props.didOpen,
            willClose: this.props.willClose,
            onClose: this.onClose,
            onRemove: this.props.onRemove
        });
        this.open = () => {
            this._root.measure((_, __, width, height, px, py) => {
                this.props.onOpen();
                console.log("ORIGIN WIDTH: ", width, height, px, py);
                this.setState({
                    isOpen: false,
                    isAnimating: true,
                    origin: {
                        width,
                        height,
                        x: px,
                        y: py,
                    },
                }, () => {
                    this.props.didOpen();
                    this.setState({
                        isOpen: true,
                    });
                    setTimeout(() => {
                        this._root && this.state.layoutOpacity.setValue(0);
                    });
                });
            });
        };
        this.close = () => {
            throw new Error('Lightbox.close method is deprecated. Use renderHeader(close) prop instead.');
        };
        this.onClose = () => {
            this.state.layoutOpacity.setValue(1);
            this.setState({
                isOpen: false,
            }, this.props.onClose);
        };
    }
    render() {
        // measure will not return anything useful if we dont attach a onLayout handler on android
        return (React.createElement(View, { ref: component => this._root = component, style: this.props.style, onLayout: () => { } },
            React.createElement(Animated.View, { style: { opacity: this.state.layoutOpacity } },
                React.createElement(TouchableHighlight, { underlayColor: this.props.underlayColor, onPress: this.open }, this.props.children)),
            React.createElement(LightboxOverlay, Object.assign({}, this.getOverlayProps()))));
    }
}
Lightbox.defaultProps = new Props;
//# sourceMappingURL=lightbox.js.map