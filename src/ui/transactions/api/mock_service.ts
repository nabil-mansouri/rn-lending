import * as mock from "./mock_factory";
import * as model from "../models";
import { TransactionService } from "./transaction";


export class TransactionServiceMock extends TransactionService {
    all = mock.generate(20);
    fetch(current: boolean, search: string) {
        return new Promise<model.Transaction[]>((resolve, _) => {
            setTimeout(() => {
                if (current) {
                    let filtered = this.all.filter(a => !a.finished);
                    if (search) {
                        search = search.toLowerCase();
                        filtered = filtered.filter(a => a.fullTitle.toLowerCase().startsWith(search))
                    }
                    resolve(filtered);
                } else {
                    let filtered = this.all.filter(a => a.finished);
                    if (search) {
                        search = search.toLowerCase();
                        filtered = filtered.filter(a => a.fullTitle.toLowerCase().startsWith(search))
                    }
                    resolve(filtered);
                }
            }, 1500)
        })
    }
    get(tr: model.Transaction): Promise<model.Transaction> {
        return new Promise<model.Transaction>((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 1500)
        })
    }
    create(tr: model.Transaction, __: boolean): Promise<model.Transaction> {
        return new Promise<model.Transaction>((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 1500)
        })
    }
    finish(tr: model.Transaction) {
        tr.finish();
        return new Promise<model.Transaction>((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 3000)
        })
    }
    cancel(tr: model.Transaction) {
        tr.cancel(); return new Promise<model.Transaction>((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 3000)
        })
    }
}