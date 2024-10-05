import * as model from "./models";
export * from "./models";

export class USState {
    loading = true;//INIT WITH LOADING
    user = new model.User;
    error = false;
    errorBody: string;
    errorTitle: string;
    signInPhone: string;
    signInCode: string;
    signInState: "phone" | "code"
}

export const initialState = new USState();