import { configureUser } from "./selectors"
import { USState } from "./state"

export interface InstallOptions {
    selector: (state: any) => USState;
}
export function install(opts: InstallOptions) {
    configureUser(opts.selector);
}