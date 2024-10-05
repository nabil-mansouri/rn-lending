import * as model from "./models";
export * from "./models";
export class USState {
    constructor() {
        this.loading = true; //INIT WITH LOADING
        this.user = new model.User;
        this.error = false;
    }
}
export const initialState = new USState();
//# sourceMappingURL=state.js.map