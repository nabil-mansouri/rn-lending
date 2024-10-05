import { NavigationRouteConfigMap } from 'react-navigation';
import { Login } from "./views/login"
// Screens 
export class Routes {
    //NO OTHER ROUTES
    static LOGIN: "User.Login"
}
// 
export const StackLogin: NavigationRouteConfigMap = {
    [Routes.LOGIN]: { screen: Login },
};
