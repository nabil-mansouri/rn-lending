import { User, Picture } from "../models";
export function user() {
    let user = new User;
    user.picture = new Picture;
    user.picture.uri = "https://encr";
    user.fullname = "Nabil";
    user.email = "nabil.mansouri@test.com";
    user.phone = "0000000000";
    user.push = true;
    return user;
}
//# sourceMappingURL=mock_factory.js.map