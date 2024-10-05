export class StepErrors {
    amount?: {
        empty: boolean
    } | null;
    expireOn?: {
        empty: boolean
    } | null;
    hasErrors() {
        return Object.keys(this).filter(key => this[key] != null).length > 0;
    }
}
export class TransactionErrors {
    subject?: {
        empty: boolean
    } | null;
    type?: {
        empty: boolean
    } | null;
    amount?: {
        empty: boolean
    } | null;
    title?: {
        empty: boolean
    } | null;
    other?: {
        empty: boolean
    } | null;
    expireOn?: {
        empty: boolean
    } | null;
    hasErrors() {
        return Object.keys(this).filter(key => this[key] != null).length > 0;
    }
}