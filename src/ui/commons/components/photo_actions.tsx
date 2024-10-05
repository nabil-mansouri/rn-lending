import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal, View, Text, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from "../styles"
interface Props {
    onPhoto: () => void;
    onGallery: () => void;
    onClose?: () => void
    visible: boolean;
}
export class PhotoActions extends Component<Props> {

    render() {
        return <Modal animationType="slide" transparent={true} onRequestClose={this.props.onClose} visible={this.props.visible}>
            <TouchableWithoutFeedback onPress={this.props.onClose}>
                <View style={styles.background}>
                    <View style={styles.wrapper}>
                        <TouchableOpacity onPress={this.props.onGallery}>
                            <View style={styles.square}>
                                <Icon size={48} name={"photo"} color="white" style={styles.icon} />
                                <Text style={styles.title}>Mes photos</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onPhoto}>
                            <View style={styles.square}>
                                <Icon size={48} name={"photo-camera"} color="white" style={styles.icon} />
                                <Text style={styles.title}>Appareil Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    }
}

const width = Dimensions.get('window').width - 24 * 2;
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0.3)",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    wrapper: {
        padding: 24,
        elevation: 8,
        borderTopWidth: 1,
        borderTopColor: colors.borders_dark,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    square: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 2
    },
    title: {
        fontSize: 16,
        marginTop: 8,
        textAlign: "center",
        color: colors.textDark
    },
    icon: {
        textAlign: "center",
        color: colors.main
    }
});