import * as mock from "./mock_factory";
import { TransactionService } from "./transaction";
export class TransactionServiceMock extends TransactionService {
    constructor() {
        super(...arguments);
        this.all = mock.generate(20);
    }
    fetch(current, search) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                if (current) {
                    let filtered = this.all.filter(a => !a.finished);
                    if (search) {
                        search = search.toLowerCase();
                        filtered = filtered.filter(a => a.fullTitle.toLowerCase().startsWith(search));
                    }
                    resolve(filtered);
                }
                else {
                    let filtered = this.all.filter(a => a.finished);
                    if (search) {
                        search = search.toLowerCase();
                        filtered = filtered.filter(a => a.fullTitle.toLowerCase().startsWith(search));
                    }
                    resolve(filtered);
                }
            }, 1500);
        });
    }
    get(tr) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 1500);
        });
    }
    create(tr, __) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 1500);
        });
    }
    finish(tr) {
        tr.finish();
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 3000);
        });
    }
    cancel(tr) {
        tr.cancel();
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(tr);
            }, 3000);
        });
    }
}
//# sourceMappingURL=mock_service.js.map