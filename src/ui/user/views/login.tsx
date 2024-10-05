import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TextInput
} from 'react-native';
import { colors } from "../styles";
import { User, USState } from '../state';
import { selectUser, selectRoot } from "../selectors"
import { ConnectProp, ReduxConnect } from "react-redux-annotation/saga"
import Icon from 'react-native-vector-icons/MaterialIcons'

class Props {
    @ConnectProp(selectUser) user?: User;
    @ConnectProp(selectRoot) usstate?: USState;
}

@ReduxConnect(Props)
export class Login extends Component<Props> {
    render() {
        return <View style={styles.container}>
            <View style={styles.top_bg}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>Prets & Emprunts</Text>
                    <Text style={styles.subtitle}>Prets et emprunts est une application vous permettant de prêter ou d’emprunter des objets ou de l’argent de manière sécurié</Text>
                </View>
                <View style={styles.status_wrapper}>
                    <View style={styles.status}></View>
                    <View style={[styles.status, styles.status_inactive]}></View>
                    <View style={[styles.status, styles.status_inactive]}></View>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.help} >Nous utilisons votre numéro de téléphone pour vous authentifier</Text>
                <View style={styles.input_wrapper}>
                    <Text style={styles.input_text}>+ 33</Text>
                    <TextInput value={"6 37 45 63 65"} style={styles.input_text} />
                    <Icon size={26} name="phone" color={colors.main} />
                </View>
                <Text style={styles.button} >M'AUTHENTIFIER</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.background
    },
    top_bg: {
        backgroundColor: colors.main,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center'
    },
    title: {
        backgroundColor: "white",
        fontSize: 18,
        marginBottom: 22
    },
    subtitle: {
        backgroundColor: "rgba(255,255,255,0.8)",
        fontSize: 14
    },
    title_wrapper: {
        alignItems: 'center'
    },
    status_wrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        justifyContent: 'center'
    },
    status: {
        width: 12,
        height: 12,
        backgroundColor: "white"
    },
    status_inactive: {
        backgroundColor: "rgba(255,255,255,0.3)"
    },
    bottom: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: 'space-around',
        paddingVertical: 30
    },
    help: {
        color: colors.black,
        marginBottom: 30,
        fontSize: 14
    },
    button: {
        fontSize: 16,
        color: "white",
        lineHeight: 44,
        height: 44,
        backgroundColor: colors.main,
        borderRadius: 8,
        overflow: "hidden"
    },
    input_wrapper: {
        borderBottomColor: colors.borders_drak80,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input_text: {
        fontSize: 24,
        color: colors.black
    }
});
