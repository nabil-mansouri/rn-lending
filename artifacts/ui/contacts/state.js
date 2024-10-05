export * from "./models";
export class COState {
    constructor() {
        this.selected = [];
        this.contacts = [];
        this.loading = true; //INIT LOADING
        this.searching = false;
        this.error = false;
        this.canValid = false;
        this.single = false;
    }
}
export const initialCOState = new COState();
//# sourceMappingURL=state.js.map