(async()=>{

const Database = require("@replit/database")
const db = new Database()

const MongoClient = require('mongodb').MongoClient;

var user = await db.get("MONGO_USER")
var pass = await db.get("MONGO_PASS")

var uri = `mongodb+srv://${user}:${pass}@dbase.oj0xm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    client.db("carrybot").collection("users").createIndex({"discord_id":1}, {unique:true}).then(()=>{
        client.close();
    })
});

/* MongoClient.connect(uri, function(err, client) {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    client.db("users").collection("details").createIndex({"email":1}, {unique:true}).then(()=>{
        client.close();
    })
}); */

})();