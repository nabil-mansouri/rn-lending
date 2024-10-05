export class StepErrors {
    hasErrors() {
        return Object.keys(this).filter(key => this[key] != null).length > 0;
    }
}
export class TransactionErrors {
    hasErrors() {
        return Object.keys(this).filter(key => this[key] != null).length > 0;
    }
}
//# sourceMappingURL=errors.js.map