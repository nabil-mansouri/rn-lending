import { StyleSheet, } from 'react-native';
export const colors = {
    main_light: "#B2DFDB",
    main: "rgb(70,168,155)",
    main_op7: "rgba(70,168,155,0.7)",
    main_op4: "rgba(70,168,155,0.4)",
    main_dark: "#00695C",
    inverse: "#FFAB00",
    separator: "rgb(56,134,124)",
    background: "rgb(236,238,241)",
    textDark: "rgb(84,85,85)",
    borders: "rgb(250,250,250)",
    borders_drak80: "rgb(155,155,155)",
    borders_dark: "rgb(209,209,209)",
    black: "rgb(74,74,74)",
    errors: "#FF5252"
};
export const statusBar = {
    color: "rgba(0,0,0,0.2)",
    style: "light-content"
};
export const stylesGlobal = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        backgroundColor: 'rgb(255,235,59)',
    },
    tabbar: {
        backgroundColor: colors.main
    },
    tabbartext: {
        fontFamily: "MaterialIcons-Regular",
        color: "white",
        fontSize: 24,
        paddingBottom: 8
    },
    appbar: {
        backgroundColor: colors.main,
        height: 80,
        color: "white",
        paddingTop: 40,
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        elevation: 4
    },
    appbar_back: {
        backgroundColor: colors.main,
        height: 80,
        elevation: 4
    },
    appbar_text: {
        color: "white",
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        top: 40,
        position: "absolute"
    },
    appbar_lefticon: {
        color: "white",
        fontFamily: "MaterialIcons-Regular",
        fontSize: 32,
        width: 32,
        height: 32,
        top: 36,
        position: "absolute",
        left: 16
    },
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
export class contants {
}
contants.pictureHeight = 50;
contants.blockRowHeight = 52;
contants.avatarHeight = 40;
export const stylesForm = StyleSheet.create({
    block_action: {
        fontSize: 14,
        lineHeight: 48,
        width: "100%",
        textAlign: "center",
        color: colors.main
    },
    block_action_sep: {
        borderTopWidth: 1,
        borderTopColor: colors.borders_dark,
    },
    header: {
        fontFamily: "Roboto",
        color: colors.textDark,
        fontSize: 18,
        paddingTop: 14,
        paddingLeft: 16,
        paddingBottom: 16
    },
    block_wrapper: {
        backgroundColor: colors.borders,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.borders_dark,
        flexDirection: "column"
    },
    block_wrapper_last: {
        marginBottom: 16
    },
    block_row: {
        height: contants.blockRowHeight,
        marginLeft: 16,
        marginRight: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.borders_dark,
        alignItems: "center",
        flexDirection: "row"
    },
    block_row_last: {
        borderBottomWidth: 0
    },
});
//# sourceMappingURL=styles.js.map