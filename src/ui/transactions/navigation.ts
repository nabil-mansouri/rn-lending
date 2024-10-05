import { NavigationRouteConfigMap } from 'react-navigation';

// Screens
import { Details } from './views/details'
import { ContactList } from '../contacts/view'
import { Locations } from '../locations/view'
import { StepForm } from './views/steps'


export class Routes {
    static TRANSACTION = "Transactions";
    static HISTORY = "TransactionHistory";
    static CREATE = "TransactionCreate";
    static DETAILS = "Details";
    static CREATE_CONTACT = "Contact";
    static CREATE_TELLTALE = "Telltales";
    static CREATE_LOCATION = "Locations";
    static CREATE_STEP = "Step";
}
//
export const StackTransactions: NavigationRouteConfigMap = {
    Details: { screen: Details },
    Contact: { screen: ContactList },
    Telltales: { screen: ContactList },
    Locations: { screen: Locations },
    Step: { screen: StepForm }
}