import * as model from "../models";
import { ITransactionService } from "./interfaces";


export class TransactionService implements ITransactionService {
    computeMaxStepAmount(tr: model.Transaction): number {
        let value = tr.moneyDetail.diff || 0;
        return Math.max(value, 0)
    }
    changeType(tr: model.Transaction, type: "money" | "good") {
        switch (type) {
            case 'money':
                tr.moneyDetail = new model.Money;
                tr.goodDetail = null;
                break;
            case 'good':
                tr.goodDetail = new model.Good;
                tr.moneyDetail = null;
                break;
        }
        return tr;
    }
    validate(tr: model.Transaction): model.TransactionErrors {
        let errors: model.TransactionErrors = new model.TransactionErrors;
        errors.subject = tr.moneyDetail == null && tr.goodDetail == null ? { empty: true } : null;
        errors.other = tr.receiver && tr.receiver.recordId ? null : { empty: true };
        errors.type = tr.direction == null ? { empty: true } : null;
        if (tr.hasSubject) {
            errors.expireOn = tr.expireOnMS > 0 ? null : { empty: true };
            if (tr.money) {
                errors.amount = tr.amount > 0 ? null : { empty: true }
            } else if (tr.goodDetail) {
                errors.title = tr.goodDetail.title && tr.goodDetail.title.length > 1 ? null : { empty: true }
            }
        }
        return errors;
    }
    validateStep(step: model.Step): model.StepErrors {
        let errors: model.StepErrors = new model.StepErrors;
        errors.amount = step.amount > 0 ? null : { empty: true }
        errors.expireOn = step.expireOn > 0 ? null : { empty: true }
        return errors;
    }
    fetch(__: boolean, _?: string) {
        return new Promise<model.Transaction[]>((___, _) => {
            //TODO
        })
    }
    get(__: model.Transaction): Promise<model.Transaction> {
        return new Promise<model.Transaction>((___, _) => {
            //TODO
        })
    }
    create(_: model.Transaction, __: boolean): Promise<model.Transaction> {
        return new Promise<model.Transaction>((___, _) => {
            //TODO
        })
    }
    finish(tr: model.Transaction) {
        tr.finish();
        return new Promise<model.Transaction>((___, _) => {
            //TODO
        })
    }
    cancel(tr: model.Transaction) {
        tr.cancel(); return new Promise<model.Transaction>((__, _) => {
            //TODO
        })
    }
}