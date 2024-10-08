import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { Lightbox } from './lightbox';
import * as model from "../models";
import { stylesForm, contants, colors } from "../styles";

class Props {
    transaction: model.Transaction;
    editMode: boolean;
    add?: () => void;
    remove?: (index: number) => void;
}
class State {
    closing: boolean
}
export class Pictures extends Component<Props, State> {
    state = {
        closing: false
    }
    render() {
        const pictures = this.props.transaction.pictures;
        const activeProps = this.state.closing ? { width: contants.pictureHeight, height: contants.pictureHeight } : { width, height: width * 16 / 9, left: 0, resizeMode: 'contain' };
        if (pictures) {
            return <React.Fragment>
                <Text style={stylesForm.header}>Photos</Text>
                <View style={[stylesForm.block_wrapper, stylesForm.block_wrapper_last]}  >
                    {pictures.length > 0 && <View style={[styles.picture_wrapper]}>
                        {pictures.map((model, index) =>
                            <Lightbox key={index} style={styles.lightbox}
                                underlayColor="white"
                                willClose={() => { this.setState({ closing: true }) }}
                                onClose={() => { this.setState({ closing: false }) }}
                                onRemove={() => this.props.remove && this.props.remove(index)}
                                activeProps={activeProps}>
                                <Image source={{ uri: model.uri, width: contants.pictureHeight, height: contants.pictureHeight }} style={styles.picture}
                                    resizeMode="cover"></Image>
                            </Lightbox>
                        )}
                    </View>}
                    {pictures.length == 0 && <View style={[stylesForm.block_row, stylesForm.block_row_last]}  >
                        <Text style={styles.empty_text}>Pas de photos</Text>
                    </View>}
                    {this.props.editMode && <TouchableOpacity onPress={() => this.props.add && this.props.add()}>
                        <View style={[stylesForm.block_row, stylesForm.block_row_last, stylesForm.block_action_sep]}  >
                            <Text style={stylesForm.block_action}>AJOUTER UNE PHOTO</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
            </React.Fragment>
        } else {
            return null
        }
    }
}


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    empty_text: {
        width: "100%",
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Roboto",
        color: colors.textDark
    },
    lightbox: {
        padding: 0,
        margin: 0
    },
    picture_wrapper: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8
    },
    picture: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
    }
});
