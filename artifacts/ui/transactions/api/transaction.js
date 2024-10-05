import * as model from "../models";
export class TransactionService {
    computeMaxStepAmount(tr) {
        let value = tr.moneyDetail.diff || 0;
        return Math.max(value, 0);
    }
    changeType(tr, type) {
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
    validate(tr) {
        let errors = new model.TransactionErrors;
        errors.subject = tr.moneyDetail == null && tr.goodDetail == null ? { empty: true } : null;
        errors.other = tr.receiver && tr.receiver.recordId ? null : { empty: true };
        errors.type = tr.direction == null ? { empty: true } : null;
        if (tr.hasSubject) {
            errors.expireOn = tr.expireOnMS > 0 ? null : { empty: true };
            if (tr.money) {
                errors.amount = tr.amount > 0 ? null : { empty: true };
            }
            else if (tr.goodDetail) {
                errors.title = tr.goodDetail.title && tr.goodDetail.title.length > 1 ? null : { empty: true };
            }
        }
        return errors;
    }
    validateStep(step) {
        let errors = new model.StepErrors;
        errors.amount = step.amount > 0 ? null : { empty: true };
        errors.expireOn = step.expireOn > 0 ? null : { empty: true };
        return errors;
    }
    fetch(__, _) {
        return new Promise((___, _) => {
            //TODO
        });
    }
    get(__) {
        return new Promise((___, _) => {
            //TODO
        });
    }
    create(_, __) {
        return new Promise((___, _) => {
            //TODO
        });
    }
    finish(tr) {
        tr.finish();
        return new Promise((___, _) => {
            //TODO
        });
    }
    cancel(tr) {
        tr.cancel();
        return new Promise((__, _) => {
            //TODO
        });
    }
}
//# sourceMappingURL=transaction.js.map