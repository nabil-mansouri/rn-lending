import * as model from "./models";
const Contacts = require('react-native-contacts')
import Permissions from 'react-native-permissions'


export interface IContactService {
    contains(contact: model.Contact, all: model.Contact[]): boolean;
    add(contact: model.Contact, all: model.Contact[]): model.Contact[];
    remove(contact: model.Contact, all: model.Contact[]): model.Contact[];
    hasPermission(): Promise<boolean>;
    requestPermission(): Promise<boolean>;
    fetch(search?: string): Promise<model.ContactRecord[]>
    toContact(add: model.ContactRecord): model.Contact;
}



function equals(c1: model.Contact, c2: model.Contact) {
    return c1.recordId == c2.recordId;
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

export class ContactService implements IContactService {
    cache: model.ContactRecord[] = null;
    toContact(add: model.ContactRecord): model.Contact {
        let c = new model.Contact;
        c.picture.uri = add.thumbnailPath;
        c.email = add.emailAddresses && add.emailAddresses.length && add.emailAddresses[0].email;
        c.fullname = add.givenName;
        c.recordId = add.recordID;
        c.phone = add.phoneNumbers && add.phoneNumbers.length && add.phoneNumbers[0].number;
        return c;
    }
    containRecords(contact: model.ContactRecord, all: model.Contact[]): boolean {
        let temp: any = { recordId: contact.recordID };
        return all.filter(co => equals(co, temp)).length > 0;
    }
    contains(contact: model.Contact, all: model.Contact[]): boolean {
        return all.filter(co => equals(co, contact)).length > 0;
    }
    add(contact: model.Contact, all: model.Contact[]): model.Contact[] {
        if (!this.contains(contact, all)) {
            all.push(contact);
        }
        return all;
    }
    remove(contact: model.Contact, all: model.Contact[]): model.Contact[] {
        return all.filter(co => !equals(co, contact));
    }
    filter(search?: string) {
        if (search) {
            search = toTitleCase(search);
            return this.cache.filter(co => co.givenName && co.givenName.startsWith(search));
        } else {
            return this.cache
        }
    }
    fetch(search?: string): Promise<model.ContactRecord[]> {
        if (this.cache) {
            return Promise.resolve(this.filter(search));
        } else {
            return new Promise((resolve, reject) => {
                Contacts.getAll((err, contacts: model.ContactRecord[]) => {
                    this.cache = contacts.map(c => {
                        c.givenName = toTitleCase(c.givenName)
                        return c;
                    }).sort((c1, c2) => {
                        if (c1.givenName < c2.givenName)
                            return -1
                        if (c1.givenName > c2.givenName)
                            return 1
                        return 0
                    })
                    //
                    if (err === 'denied') {
                        reject(err);
                    } else {
                        resolve(this.filter(search));
                    }
                })
            })
        }
    }
    hasPermission(): Promise<boolean> {
        return Permissions.check("contacts").then(response => {
            return response == "authorized";
        });
    }
    requestPermission(): Promise<boolean> {
        return Permissions.request('contacts').then(response => {
            return response == "authorized";
        });
    }
}
export const coService = new ContactService();