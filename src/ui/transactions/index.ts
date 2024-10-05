import { configure, TRStates } from "./selectors"

export interface InstallOptions {
    selector: (state: any) => TRStates;
}
export function install(opts: InstallOptions) {
    configure(opts.selector);
}