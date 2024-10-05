import * as model from "../models";

export interface ITransactionService {
    computeMaxStepAmount(tr: model.Transaction): number;
    changeType(tr: model.Transaction, type: "money" | "good"): model.Transaction
    validate(tr: model.Transaction): model.TransactionErrors;
    validateStep(step: model.Step): model.StepErrors;
    fetch(current: boolean, criteria?: string): Promise<model.Transaction[]>
    get(tr: model.Transaction): Promise<model.Transaction>
    finish(tr: model.Transaction): Promise<model.Transaction>
    cancel(tr: model.Transaction): Promise<model.Transaction>
    create(tr: model.Transaction, ishare: boolean): Promise<model.Transaction>
}

export interface IPhotoService {
    pick(fromLib: boolean): Promise<model.Picture[]>;
    hasPermission(): Promise<boolean>;
    requestPermission(): Promise<boolean>;
}