import { QuestionRecord } from '../skuilder-base/BaseClasses'
import * as pouch from 'pouchdb-browser'
// import * as auth from 'pouchdb-authentication'

pouch.plugin(require('pouchdb-authentication'))

const auth = require('pouchdb-authentication');

const key = 'record';
const localDB: PouchDB.Database<PouchDB.Core.Encodable> = new pouch(key);
const remoteDB: PouchDB.Database<PouchDB.Core.Encodable> = new pouch(
    'https://' +
    'nilock.cloudant.com/' +
    key, {
        skip_setup: true
    }
);

localDB.sync(remoteDB, {
    live: true,
    retry: true
})


// works - need a login/register page. Still waiting on per-user dbs
// remoteDB.signup('newUser', 'password', function (err, resp) {
//     if (err) {
//         console.log("Signup error:" + err.name);
//     } else {
//         console.log("Signup success!" + resp.name);
//     }
// })

export default class Recorder {
    private static localDB: PouchDB.Database<PouchDB.Core.Encodable> = localDB;
    private static remoteDB: PouchDB.Database<PouchDB.Core.Encodable> = remoteDB;

    private static record: Array<any> = new Array<any>();

    static init(): void {
        console.log("Recorder initializing");
        Recorder.localDB.allDocs({
            include_docs: true
        }).then(
            (docs: PouchDB.Core.AllDocsResponse<PouchDB.Core.Encodable>) => {
                docs.rows.forEach((row) => {
                    // console.log("Adding " + row + " to in-memory records.");
                    Recorder.record.push(row.doc);
                });
            }
            ).catch((err) => {
                console.log(err);
            });
    }

    static getRecord(): Array<any> {
        return Recorder.record;
    }

    static addRecord(record: QuestionRecord) {
        console.log("Adding a record...");

        record._id = new Date().toJSON();

        // add record to in-memory records
        Recorder.record.push(record);
        // add record to db - syncs with cloudant
        Recorder.localDB.put(record);
    }



}