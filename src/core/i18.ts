import moment from "moment";
import I18n from 'react-native-i18n'; 
export function getLocale(): string {
    return I18n.currentLocale()
}
let configured = false;
export function autoConfigure() {
    if (configured) {
        return;
    }
    configured = true;
    try { 
        const locale = getLocale().toLowerCase(); 
        switch (locale) {
            case "en":
            case "en-gb":
                require('moment/locale/en-gb');
                moment.locale('en')
                break;
            case "es":
            case "es-es":
                require('moment/locale/es');
                moment.locale('es')
                break;
            case "fr":
            case "fr-fr": 
                require('moment/locale/fr');
                moment.locale('fr')
                break;
        }
    } catch (e) {
        //TODO
    }
}