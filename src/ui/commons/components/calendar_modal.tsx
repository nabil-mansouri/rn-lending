import React, { Component } from 'react';
import { StyleSheet, Modal, View, ViewStyle, TouchableWithoutFeedback } from "react-native";
import { colors } from "../styles"
import { LocaleConfig, Calendar } from 'react-native-calendars';


LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};
LocaleConfig.defaultLocale = 'fr';
interface Selected {
    [key: string]: {
        selected: boolean,
        marked?: boolean,
        selectedColor?: string
        activeOpacity?: string
        dotColor?: string
    }
}
class Props {
    onPicked: (value: number) => void;
    onClose?: () => void
    visible: boolean;
    theme?: "dark" | "light" = "dark"
    markedDates?: Selected = {}
    style?: ViewStyle = {}
}
class WrapperProps {
    onPicked: (value: number) => void;
    theme?: "dark" | "light" = "dark"
    markedDates?: Selected = {}
    style?: ViewStyle = {}
}
const themeDark = {
    backgroundColor: colors.main,
    calendarBackground: colors.main,
    textSectionTitleColor: "rgba(255,255,255,0.7)",
    selectedDayBackgroundColor: "white",
    selectedDayTextColor: colors.main,
    todayTextColor: "rgba(255,255,255,0.8)",
    dayTextColor: "white",
    textDisabledColor: "rgba(255,255,255,0.4)",
    dotColor: colors.borders,
    selectedDotColor: "white",
    arrowColor: "white",
    monthTextColor: "white",
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayFontFamily: 'Roboto',
    textMonthFontFamily: 'Roboto',
    textDayHeaderFontFamily: 'Roboto',
    textDayHeaderFontSize: 12,
    'stylesheet.day.basic': {
        text: {
            lineHeight: 32,
            color: "white",
        }
    }
};
const themeLight = {
    backgroundColor: "white",
    calendarBackground: "white",
    textSectionTitleColor: "rgba(255,255,255,0.7)",
    selectedDayBackgroundColor: colors.main,
    selectedDayTextColor: "white",
    todayTextColor: colors.main_dark,
    dayTextColor: colors.main,
    textDisabledColor: colors.main_op4,
    dotColor: colors.borders,
    selectedDotColor: "white",
    arrowColor: colors.main,
    monthTextColor: colors.main,
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayFontFamily: 'Roboto',
    textMonthFontFamily: 'Roboto',
    textDayHeaderFontFamily: 'Roboto',
    textDayHeaderFontSize: 12,
    'stylesheet.day.basic': {
        text: {
            lineHeight: 32,
            color: colors.main,
        }
    }
};
export class CalendarWrapper extends Component<WrapperProps>{
    static defaultProps = new WrapperProps;
    render() {
        const now = new Date();
        const nowIso = now.toISOString();
        return <Calendar
            style={this.props.style}
            markedDates={this.props.markedDates}
            minDate={nowIso}
            onDayPress={(day) => {
                return this.props.onPicked(day.timestamp)
            }}
            firstDay={1}
            theme={this.props.theme == "dark" ? themeDark : themeLight}
        />
    }
}
export class CalendarModal extends Component<Props> {
    static defaultProps = new Props;

    render() {
        return <Modal animationType="slide" transparent={true} onRequestClose={this.props.onClose} visible={this.props.visible}>
            <TouchableWithoutFeedback onPress={this.props.onClose}>
                <View style={styles.background}>
                    <View style={styles.wrapper}>
                        <CalendarWrapper {...this.props} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    }
}

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
        padding: 12,
        elevation: 8,
        borderTopWidth: 1,
        borderTopColor: colors.borders_dark,
        backgroundColor: colors.main,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start'
    },
});