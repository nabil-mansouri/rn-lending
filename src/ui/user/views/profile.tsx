import React, { Component } from 'react';
import {
    StyleSheet, ActivityIndicator, Alert,
    View, Text, Dimensions, Switch, ScrollView
} from 'react-native';
import { colors, stylesGlobal } from "../styles";
import { ImagePlaceHolder } from '../../commons/components';
import { User, USState } from '../state'; 
import { selectUser, selectRoot } from "../selectors"
import { ConnectProp, ReduxConnect } from "react-redux-annotation/saga"

class Props {
    @ConnectProp(selectUser) user?: User;
    @ConnectProp(selectRoot) usstate?: USState;
}

@ReduxConnect(Props)
export class Profile extends Component<Props> {
    componentDidUpdate(prevProps: Props) {
        if (!prevProps.usstate.error && this.props.usstate.error) {
            Alert.alert(
                this.props.usstate.errorTitle,
                this.props.usstate.errorBody,
                [],
                { cancelable: true }
            )
        }
    }
    render() {
        const { loading } = this.props.usstate;
        const user = this.props.user;
        if (loading) {
            return <View style={stylesGlobal.loading}>
                <ActivityIndicator size='large' animating={loading} />
            </View>
        }
        return <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
                {/*<Image style={styles.image_avatar}
                    source={{ uri: user.pictureURI }}
                ></Image>
                <View style={styles.mask_wrapper}>
                    <ImagePlaceHolder
                        imgStyle={styles.mask}
                        placeholder={() => {
                            return <Text style={[styles.mask_placeholder]} >photo_camera</Text>
                        }}
                        source={{ uri: user.pictureURI }}
                    />
                </View>*/}
                <View style={styles.mask_wrapper}>
                    <ImagePlaceHolder
                        borderRadius={avatar_radius}
                        imgStyle={styles.mask}
                        placeholder={() => {
                            return <Text style={[styles.mask_placeholder]} >photo_camera</Text>
                        }}
                        source={{ uri: user.avatar }}
                    />
                </View>
                <Text style={[styles.header]}>Mes informations</Text>
                <View style={styles.text_container}>
                    <Text style={styles.text_icon}>mail</Text>
                    <Text style={styles.text_content}>{user.email}</Text>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.text_icon}>phone</Text>
                    <Text style={styles.text_content}>{user.phone}</Text>
                </View>
                <Text style={styles.header}>Notifications</Text>
                <View style={[styles.text_container]}>
                    <Text style={[styles.text_content, styles.text_content_switch]}>Recevoir des notifications</Text>
                    <Switch style={styles.switch} value={user.push} />
                </View>
            </View>
        </ScrollView>
    }
}

const width = Dimensions.get('window').width;
const avatar_height = 150;
const avatar_radius = 50;
const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.background,
        paddingBottom: 16
    },
    image_avatar: {
        height: avatar_height,
        width: "100%",
        backgroundColor: "#E0F2F1"
    },
    header: {
        fontFamily: "Roboto",
        color: colors.textDark,
        fontSize: 18,
        paddingTop: 14,
        paddingLeft: 16,
        paddingBottom: 16
    },
    mask_wrapper: {
        height: avatar_height,
        width: "100%",
        backgroundColor: "white",
        borderColor: colors.borders_dark,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    mask: {
        position: "absolute",
        top: avatar_height / 2 - 50,
        left: width / 2 - 50,
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#FFD600",
    },
    mask_placeholder: {
        fontFamily: "MaterialIcons-Regular",
        fontSize: 70,
        color: "white",
        textAlign: "center",
        paddingTop: 15
    },
    text_container: {
        width: "100%",
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        backgroundColor: "white"
    },
    text_content: {
        fontSize: 16,
        position: "absolute",
        left: 72,
        top: 18
    },
    text_content_switch: {
        left: 16
    },
    switch: {
        position: "absolute",
        top: 18,
        right: 16
    },
    text_icon: {
        fontFamily: "MaterialIcons-Regular",
        fontSize: 24,
        top: 10
    }
});
