var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Type } from "class-transformer";
export class Picture {
}
export class User {
    constructor() {
        this.picture = new Picture;
    }
    get avatar() {
        return this.picture && this.picture.uri;
    }
    get shortName() {
        if (this.fullname) {
            const splits = this.fullname.split(/\s+/);
            if (splits.length == 0) {
                return ".";
            }
            else if (splits.length == 1) {
                return splits[0];
            }
            else {
                return splits[0] + " " + splits[1].slice(0, 1) + ".";
            }
        }
        else {
            return ".";
        }
    }
}
__decorate([
    Type(() => Picture)
], User.prototype, "picture", void 0);
//# sourceMappingURL=model.js.map