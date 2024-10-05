import * as model from "./models";
export * from "./models";

export class LOSTate {
    error: boolean = false;
    errorBody: string;
    criteria: string;
    errorTitle: string;
    hasPermission: boolean;
    needRequest: boolean;
    selected: model.Address;
    results: model.Address[] = [];
}
export const initialLOSTate = new LOSTate(); 