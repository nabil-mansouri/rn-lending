import { Type } from "class-transformer";


export class Picture {//"data:image/jpeg;base64,"
  uri: string;
}
export class User {
  _id: string;
  phone: string;
  imei: string;
  fullname: string;
  email: string;
  push: boolean;
  @Type(() => Picture) picture: Picture = new Picture;
  get avatar() {
    return this.picture && this.picture.uri;
  }
  get shortName() {
    if (this.fullname) {
      const splits = this.fullname.split(/\s+/);
      if (splits.length == 0) {
        return ".";
      } else if (splits.length == 1) {
        return splits[0];
      } else {
        return splits[0] + " " + splits[1].slice(0, 1) + ".";
      }
    } else {
      return ".";
    }
  }
}