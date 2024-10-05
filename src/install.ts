import { autoConfigure } from './core/i18';
import * as tr from "./ui/transactions";
import * as us from "./ui/user";
import { GlobalState } from "./ui/state"
//

export function install() {
    //
    autoConfigure();
    //
    tr.install({
        selector: (sta: GlobalState) => {
            return sta.transactions;
        }
    })
    us.install({
        selector: (sta: GlobalState) => sta.users
    })
}