import * as trNav from "./transactions/navigation";
import * as usNav from "./user/navigation";

export class Routes {
    static PROFILE = "TabProfile";
    static TRANSACTIONS = trNav.Routes.TRANSACTION;
    static HISTORY = trNav.Routes.HISTORY;
    static CREATE = trNav.Routes.CREATE;
    static TAB_BAR = "Tabs";
}
export const ExternalRoutes = { ...usNav.Routes, ...trNav.Routes }