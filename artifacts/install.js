import { autoConfigure } from './core/i18';
import * as tr from "./ui/transactions";
import * as us from "./ui/user";
//
export function install() {
    //
    autoConfigure();
    //
    tr.install({
        selector: (sta) => {
            return sta.transactions;
        }
    });
    us.install({
        selector: (sta) => sta.users
    });
}
//# sourceMappingURL=install.js.map