const admfbase = require('firebase-admin');
const serviceAccount = require("./keys/firebservicekey.json");

console.log("Working");

admfbase.initializeApp({
   credential: admfbase.credential.applicationDefault()
});

const db = admfbase.firestore();

var t = "1232";

var r  = {
            name : "Rajeev",
            age : 17,
}

db.doc("users/" + t).set(r).catch(err => console.log(err));
