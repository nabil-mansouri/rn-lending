import * as model from "./models";
const Contacts = require('react-native-contacts');
import Permissions from 'react-native-permissions';
function equals(c1, c2) {
    return c1.recordId == c2.recordId;
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
export class ContactService {
    constructor() {
        this.cache = null;
    }
    toContact(add) {
        let c = new model.Contact;
        c.picture.uri = add.thumbnailPath;
        c.email = add.emailAddresses && add.emailAddresses.length && add.emailAddresses[0].email;
        c.fullname = add.givenName;
        c.recordId = add.recordID;
        c.phone = add.phoneNumbers && add.phoneNumbers.length && add.phoneNumbers[0].number;
        return c;
    }
    containRecords(contact, all) {
        let temp = { recordId: contact.recordID };
        return all.filter(co => equals(co, temp)).length > 0;
    }
    contains(contact, all) {
        return all.filter(co => equals(co, contact)).length > 0;
    }
    add(contact, all) {
        if (!this.contains(contact, all)) {
            all.push(contact);
        }
        return all;
    }
    remove(contact, all) {
        return all.filter(co => !equals(co, contact));
    }
    filter(search) {
        if (search) {
            search = toTitleCase(search);
            return this.cache.filter(co => co.givenName && co.givenName.startsWith(search));
        }
        else {
            return this.cache;
        }
    }
    fetch(search) {
        if (this.cache) {
            return Promise.resolve(this.filter(search));
        }
        else {
            return new Promise((resolve, reject) => {
                Contacts.getAll((err, contacts) => {
                    this.cache = contacts.map(c => {
                        c.givenName = toTitleCase(c.givenName);
                        return c;
                    }).sort((c1, c2) => {
                        if (c1.givenName < c2.givenName)
                            return -1;
                        if (c1.givenName > c2.givenName)
                            return 1;
                        return 0;
                    });
                    //
                    if (err === 'denied') {
                        reject(err);
                    }
                    else {
                        resolve(this.filter(search));
                    }
                });
            });
        }
    }
    hasPermission() {
        return Permissions.check("contacts").then(response => {
            return response == "authorized";
        });
    }
    requestPermission() {
        return Permissions.request('contacts').then(response => {
            return response == "authorized";
        });
    }
}
export const coService = new ContactService();
//# sourceMappingURL=api.js.map