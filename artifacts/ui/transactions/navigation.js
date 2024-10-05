// Screens
import { Details } from './views/details';
import { ContactList } from '../contacts/view';
import { Locations } from '../locations/view';
import { StepForm } from './views/steps';
export class Routes {
}
Routes.TRANSACTION = "Transactions";
Routes.HISTORY = "TransactionHistory";
Routes.CREATE = "TransactionCreate";
Routes.DETAILS = "Details";
Routes.CREATE_CONTACT = "Contact";
Routes.CREATE_TELLTALE = "Telltales";
Routes.CREATE_LOCATION = "Locations";
Routes.CREATE_STEP = "Step";
//
export const StackTransactions = {
    Details: { screen: Details },
    Contact: { screen: ContactList },
    Telltales: { screen: ContactList },
    Locations: { screen: Locations },
    Step: { screen: StepForm }
};
//# sourceMappingURL=navigation.js.map