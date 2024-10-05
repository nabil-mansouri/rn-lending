import * as trNav from "./transactions/navigation";
import * as usNav from "./user/navigation";
export class Routes {
}
Routes.PROFILE = "TabProfile";
Routes.TRANSACTIONS = trNav.Routes.TRANSACTION;
Routes.HISTORY = trNav.Routes.HISTORY;
Routes.CREATE = trNav.Routes.CREATE;
Routes.TAB_BAR = "Tabs";
export const ExternalRoutes = Object.assign({}, usNav.Routes, trNav.Routes);
//# sourceMappingURL=routes.js.map