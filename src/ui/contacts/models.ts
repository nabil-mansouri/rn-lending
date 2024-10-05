import { User } from "../commons/model";

export class Contact extends User {
  recordId: string;
}

export interface ContactRecord {
  recordID: string, 
  selected:boolean;
  company: string,
  emailAddresses: {
    label: string,
    email: string,
  }[],
  familyName: string,
  givenName: string,
  jobTitle: string,
  middleName: string,
  phoneNumbers: {
    label: string,
    number: string,
  }[],
  hasThumbnail: true,
  thumbnailPath: string,
  postalAddresses: {
    street: string,
    city: string,
    state: string,
    region: string,
    postCode: string,
    country: string,
    label: string
  }[],
  birthday: { year: number, month: number, day: number }
}