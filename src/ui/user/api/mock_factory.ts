import { User, Picture } from "../models";

export function user(): User {
    let user = new User;
    user.picture = new Picture;
    user.picture.uri = "https://enc";
    user.fullname = "Nabil Mansouri";
    user.email = "nabil.mansouri@test.com";
    user.phone = "0000000000";
    user.push = true;
    return user;
}