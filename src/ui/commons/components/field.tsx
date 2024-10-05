import React, { Component } from 'react';
import {
    StyleSheet, TouchableOpacity, View, Text, TextInput, ViewStyle,
    ReturnKeyType, ReturnKeyTypeAndroid, ReturnKeyTypeIOS, TextStyle,
    KeyboardType, KeyboardTypeIOS, KeyboardTypeAndroid, Dimensions
} from 'react-native';
import { colors, stylesForm } from "../styles";

class IPropsField {
    label?: string = "";
    suffix?: string;
    inputNumLines?: number = 1;
    type?: KeyboardType | KeyboardTypeIOS | KeyboardTypeAndroid = "default";
    action?: ReturnKeyType | ReturnKeyTypeAndroid | ReturnKeyTypeIOS = "next"
    last?: boolean = false;
    icon?: string;
    readonly?: boolean = false;
    onIcon?: () => void
    styleBlock?: ViewStyle = null
    styleInput?: TextStyle = null
    styleInputError?: TextStyle = null
    styleLabel?: TextStyle = null
    styleLabelError?: TextStyle = null
    styleIcon?: TextStyle = null
    showLabel?: boolean = true
    showInput?: boolean = true
    labelouchable?: boolean = true
    maxLength?: number = -1
    parser?: (val) => any = (v) => v;
    errors?: any;
}
class PropsField extends IPropsField {
    onChange?: (text: any) => void
    value: any;
}
class State {
    value: string
    focus: boolean
}
export class Field extends Component<PropsField, State> {
    static defaultProps = new PropsField;
    refInput: any;
    state: State
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            focus: false
        }
    }
    componentWillReceiveProps(nextProps: PropsField) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value })
        }
    }
    render() {
        const focus = () => {
            this.refInput && this.refInput.focus()
        }
        const renderLabel = () => {
            if (!this.props.showLabel) {
                return null;
            }
            const style = [this.props.styleLabel || styles.block_label]
            if (this.props.errors) {
                style.push(this.props.styleLabelError || styles.label_error)
            }
            if (this.props.labelouchable) {
                return <TouchableOpacity onPress={focus} hitSlop={{ left: 16, top: 8, bottom: 8, right: 0 }}>
                    <Text numberOfLines={1} style={style} >{this.props.label}</Text>
                </TouchableOpacity >
            } else {
                return <Text numberOfLines={1} style={style} >{this.props.label}</Text>
            }
        }
        const renderInput = () => {
            if (!this.props.showInput) {
                return null;
            }
            const style = [this.props.styleInput || styles.block_input];
            if (this.props.errors) {
                style.push(this.props.styleInputError || styles.input_error)
            }
            const addSuffix = (val) => {
                return this.props.suffix ? `${val}${this.props.suffix ? " " + this.props.suffix : ""}` : val;
            }
            if (this.props.readonly) {
                return <Text style={style} numberOfLines={this.props.inputNumLines}>{addSuffix(this.state.value)}</Text>
            } else {
                const onBlur = this.props.suffix ? () => {
                    this.setState({ focus: false })
                } : null;
                const onFocus = this.props.suffix ? () => {
                    this.setState({ focus: true })
                } : null;
                const removeSuffix = (val) => {
                    return val && this.props.suffix ? val.replace(this.props.suffix, "").trim() : val;
                }
                return <TextInput
                    value={this.state.focus ? (this.state.value + "") : addSuffix(this.state.value)}
                    numberOfLines={this.props.inputNumLines}
                    underlineColorAndroid="transparent"
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.type}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={(a) => this.props.onChange(this.props.parser(removeSuffix(a)))}
                    style={style}
                    returnKeyType={this.props.action} ref={ref => this.refInput = ref} />
            }
        }
        const renderRightIcon = () => {
            if (this.props.icon) {
                const style = [this.props.styleIcon || styles.icon]
                return <TouchableOpacity onPress={() => this.props.onIcon && this.props.onIcon()} hitSlop={{ left: 5, top: 5, bottom: 5, right: 5 }}>
                    <Text style={style} >{this.props.icon}</Text>
                </TouchableOpacity>
            }
            return null;
        }
        //
        const style: any[] = [this.props.styleBlock || stylesForm.block_row];
        this.props.last && !this.props.styleBlock && style.push(stylesForm.block_row_last);
        return <View style={style}>
            {renderLabel()}
            {renderInput()}
            {renderRightIcon()}
        </View>
    }
}
export type ParserType = "string" | "integer" | "number" | "boolean";
class PropsWithBinding extends IPropsField {
    object: any;
    property: string;
    onChange?: (text: any) => void
    parserType?: ParserType = "string";
}
function WithBinding(WrappedComponent: any) {
    return class extends React.Component<PropsWithBinding> {
        constructor(props) {
            super(props);
        }
        render() {
            const parser = (val) => {
                switch (this.props.parserType) {
                    case "integer": {
                        return val ? parseInt(val) : 0;
                    }
                    case "number": {
                        return val ? parseFloat(val) : 0;
                    }
                    case "boolean": {
                        return !!(val);
                    }
                }
                return val;
            }
            return <WrappedComponent  {...this.props}
                value={this.props.object[this.props.property]}
                onChange={(val) => {
                    let temp = parser(val);
                    this.props.object[this.props.property] = temp;
                    this.props.onChange && this.props.onChange(temp);
                }} />
        }
    };
}
export const FieldBinded = WithBinding(Field);
class ButtonProps {
    onChange?: () => void
    selected?: boolean;
    style?: ViewStyle
    styleSelected?: ViewStyle
    styleInactive?: ViewStyle
}
export class Button extends React.Component<ButtonProps> {
    render() {
        const child = React.Children.only(this.props.children);
        const style = [child.props.style, this.props.selected ? this.props.styleSelected : this.props.styleInactive];
        let clone = React.cloneElement(child, { style });
        return <TouchableOpacity onPress={() => {
            this.props.onChange && this.props.onChange();
        }} style={this.props.style}>
            {clone}
        </TouchableOpacity>
    }
}
class ButtonBinding extends ButtonProps {
    object: any;
    value: any;
    property: string;
}
export class ButtonBinded extends React.Component<ButtonBinding>{
    render() {
        return <Button  {...this.props}
            selected={this.props.object[this.props.property] == this.props.value}
            onChange={() => {
                this.props.object[this.props.property] = this.props.value;
                this.props.onChange && this.props.onChange();
            }} />
    }
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const labelWidth = WINDOW_WIDTH * 1 / 4;
export const styles = StyleSheet.create({
    input_error: {
        color: colors.errors
    },
    label_error: {
        color: colors.errors
    },
    block_label: {
        color: colors.main,
        fontSize: 16,
        width: labelWidth,
        lineHeight: 48,
        zIndex: 1
    },
    block_input: {
        lineHeight: 48,
        flex: 1,
        fontSize: 16,
        zIndex: 15
    },
    icon: {
        color: colors.main,
        fontFamily: "MaterialIcons-Regular",
        fontSize: 24,
        width: 24,
        height: 24,
        position: "absolute",
        top: 16,
        left: 16
    }
});