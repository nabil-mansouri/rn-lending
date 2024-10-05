import React, { Component } from 'react';
import {
    TouchableOpacity, ActivityIndicator, StyleSheet,
    Dimensions, View, Text, StatusBar
} from 'react-native';
import { ConnectProp, ConnectSaga, ReduxConnect } from "react-redux-annotation/saga";
import { Transaction, TRCreateState, Direction } from "../state";
import { stylesGlobal, colors, statusBar, stylesForm } from "../styles";
import {
    Telltales, Pictures, Steps, Field, ButtonBinded,
    Button, FieldBinded, PhotoActions, CalendarModal, Scale
} from "../components";
import { LocationModal } from "../../locations/view"
import { TRCreateActions } from "../actions"
import * as actions from "../actions";
import { selectCreateCurrent, selectCreate } from "../selectors";
import ActionButton from 'react-native-action-button';
const ActionButtonOther: any = ActionButton;
import Icon from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Props {
    @ConnectSaga(TRCreateActions.PHOTO_CANCEL) cancelPhoto?: () => void;
    @ConnectSaga(TRCreateActions.GOTO_PHOTO) goToPhoto?: () => void;
    @ConnectSaga(TRCreateActions.STEP_DELETE) removeStep?: (p: actions.StepRemovePayload) => void;
    @ConnectSaga(TRCreateActions.PHOTO_REMOVE) removePhoto?: (p: actions.PhotoRemovePayload) => void;
    @ConnectSaga(TRCreateActions.START_EXPIREON) goToFinishAt?: () => void;
    @ConnectSaga(TRCreateActions.END_EXPIREON) pickExpireOn?: (p: actions.ExpireOnEndPayload) => void;
    @ConnectSaga(TRCreateActions.PHOTO_SOURCE) pickPhotoSource?: (source: actions.PhotoSourcePayload) => void;
    @ConnectSaga(TRCreateActions.GOTO_CONTACT_DEST) goToOtherContact?: (p: actions.ContactGotoPayload) => void;
    @ConnectSaga(TRCreateActions.GOTO_CONTACT) goToTelltales?: (p: actions.ContactGotoPayload) => void;
    @ConnectSaga(TRCreateActions.GOTO_LOCATION) goToLocation?: (p: actions.LocationGotoPayload) => void;
    @ConnectSaga(TRCreateActions.GOTO_STEP) goToStep?: () => void;
    @ConnectSaga(TRCreateActions.CONTACT_REMOVE) removeContact?: (p: actions.ContactDeletePayload) => void;
    @ConnectSaga(TRCreateActions.TRANSACTION_SUBMIT) submit?: (p: actions.TransactionSubmitPayload) => void;
    @ConnectSaga(TRCreateActions.TRANSACTION_CHANGED) changed?: (p: actions.TransactionChangedPayload) => void;
    @ConnectSaga(TRCreateActions.TRANSACTION_SUBJECT_CHANGED) subjectChanged?: (p: actions.SubjectChangedPayload) => void;

    @ConnectProp(selectCreate) trcreate?: TRCreateState;
    @ConnectProp(selectCreateCurrent) transaction?: Transaction;
}

@ReduxConnect(Props)
export class DetailForms extends Component<Props> {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange() {
        this.props.changed({ transaction: this.props.transaction });
    }
    render() {
        let { loading, pickPhoto, pickDate, validation, pickLocation } = this.props.trcreate;
        const transaction = this.props.transaction;
        const { money } = transaction;
        const seeOtherFields = !validation.type && !validation.subject;
        if (loading) {
            return <View style={stylesGlobal.loading}>
                <ActivityIndicator size='large' animating={loading} />
            </View>
        }
        const renderChoices = () => {
            return <React.Fragment>
                <View style={[styles.btn_choice_wrapper, styles.btn_choice_wrapper_first]}>
                    <ButtonBinded object={transaction} property="direction"
                        styleInactive={styles.btn_choice_normal} styleSelected={styles.btn_choice_selected}
                        value={Direction.CreatorShare} onChange={this.onChange}>
                        <Text style={[styles.btn_choice]}>JE PRÊTE</Text>
                    </ButtonBinded>
                    <ButtonBinded style={styles.btn_choice_right} object={transaction} property="direction"
                        styleInactive={styles.btn_choice_normal} styleSelected={styles.btn_choice_selected}
                        value={Direction.OtherShare} onChange={this.onChange}>
                        <Text style={[styles.btn_choice]}>J'EMPRUNTE</Text>
                    </ButtonBinded>
                </View>
                <View style={[styles.btn_choice_wrapper, styles.btn_choice_wrapper_last]}>
                    <Button selected={transaction.goodDetail != null}
                        styleInactive={styles.btn_choice_normal} styleSelected={styles.btn_choice_selected}
                        onChange={() => this.props.subjectChanged({ transaction, subject: "good" })}>
                        <Text style={[styles.btn_choice]}>UN OBJET</Text>
                    </Button>
                    <Button selected={transaction.moneyDetail != null}
                        styleInactive={styles.btn_choice_normal} styleSelected={styles.btn_choice_selected}
                        style={styles.btn_choice_right}
                        onChange={() => this.props.subjectChanged({ transaction, subject: "money" })}>
                        <Text style={[styles.btn_choice]}>DE L'ARGENT</Text>
                    </Button>
                </View>
            </React.Fragment >
        }
        const renderOtherFiels = () => {
            if (seeOtherFields) {
                return <React.Fragment>
                    <View style={[stylesForm.block_wrapper]}>
                        {money && <FieldBinded errors={validation!.amount} label="Combien: " parserType="integer" suffix="€" type="numeric" object={transaction.moneyDetail} property="amount" onChange={this.onChange} />}
                        {!money && <FieldBinded errors={validation!.title} label="Quoi: " object={transaction.goodDetail} property="title" onChange={this.onChange} />}
                        <TouchableOpacity onPress={() => this.props.goToOtherContact({ transaction })} >
                            <Field errors={validation!.other} label="A qui:" value={transaction.hasOther ? transaction.other.shortName : ""} readonly={true} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.goToFinishAt()} >
                            <Field errors={validation!.expireOn} label="Jusqu'au:" last={true} readonly={true} value={transaction.hasExpireOn ? transaction.expireOnFormatted : ""} />
                        </TouchableOpacity>
                    </View>
                    <Text style={stylesForm.header}>Complément</Text>
                    <View style={[stylesForm.block_wrapper]}>
                        <FieldBinded label="Motif:" object={transaction} property="reason" onChange={this.onChange} action="done" />
                        <TouchableOpacity onPress={() => this.props.goToLocation({ transaction })} >
                            <Field label="Lieu:" last={true} readonly={true} value={transaction.locationName} />
                        </TouchableOpacity>
                    </View>
                    <Steps transaction={transaction} edit={true} onAdd={this.props.goToStep} onDel={(index) => this.props.removeStep({ index })} />
                    <Telltales transaction={transaction} editMode={true}
                        onAdd={() => this.props.goToTelltales({ transaction })}
                        onRemove={(contact) => this.props.removeContact({ transaction, contact })} />
                    <Pictures transaction={transaction} editMode={true} add={this.props.goToPhoto} remove={(index) => this.props.removePhoto({ index })} />

                </React.Fragment>
            } else {
                return null;
            }
        }
        const markedDates = transaction.hasExpireOn ? {
            [transaction.expireOnAtISO]: { selected: true }
        } : {}
        return <View style={styles.container}>
            <PhotoActions onGallery={() => this.props.pickPhotoSource({ kind: "gallery" })}
                onPhoto={() => this.props.pickPhotoSource({ kind: "camera" })}
                onClose={() => this.props.cancelPhoto()} visible={pickPhoto} />
            <CalendarModal onClose={() => this.props.pickExpireOn({ canceled: true, timestamp: null })}
                markedDates={markedDates}
                onPicked={(val) => this.props.pickExpireOn({ canceled: false, timestamp: val })}
                visible={pickDate} />
            <LocationModal visible={pickLocation} />
            <StatusBar hidden={pickLocation}
                backgroundColor={statusBar.color}
                translucent={true}
                barStyle={statusBar.style}
            />
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                style={styles.scrollview}
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 36 }}>
                {renderChoices()}
                {renderOtherFiels()}
            </KeyboardAwareScrollView>
            <Scale visible={!validation.hasErrors()} style={{ width: 56, height: 56, position: "absolute", bottom: 56, right: 56 }}>
                <ActionButtonOther buttonColor={colors.inverse} onPress={() => this.props.submit({ ishare: false, transaction })}
                    renderIcon={() => <Icon name="check" style={styles.actionButtonIcon} />} >
                </ActionButtonOther>
            </Scale>
        </View >
    }
}

const width = Dimensions.get('window').width;
const widthChoice = (width - 12 - 16 * 2) / 2;
const styles = StyleSheet.create({
    btn_choice_wrapper: {
        marginHorizontal: 16,
        height: 36,
        flex: 1,
    },
    btn_choice_wrapper_first: {
        marginTop: 24,
        marginBottom: 8,
    },
    btn_choice_wrapper_last: {
        marginTop: 8,
        marginBottom: 24,
    },
    btn_choice: {
        lineHeight: 36,
        fontSize: 14,
        borderRadius: 18,
        overflow: 'hidden',
        width: widthChoice,
        textAlign: "center"
    },
    btn_choice_right: {
        position: "absolute",
        right: 0
    },
    btn_choice_selected: {
        backgroundColor: colors.main,
        color: "white",
    },
    btn_choice_normal: {
        backgroundColor: "transparent",
        color: colors.main,
        borderColor: colors.main,
        borderWidth: 1
    },
    btn_wrapper: {
        height: 56,
        backgroundColor: colors.main,
        elevation: 8,
        width: width,
        flexDirection: "row"
    },
    btn: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 56,
        width: (width / 2) - 1
    },
    btn_sep: {
        backgroundColor: colors.separator,
        width: 1
    },
    container: {
        flex: 1,
    },
    scrollview: {
        flexDirection: "column",
        backgroundColor: "rgb(236,238,241)"
    },

    actionButtonIcon: {
        fontSize: 24,
        lineHeight: 56,
        color: 'white',
    },
});
