const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dbase-oj0xm.mongodb.net/test?retryWrites=true&w=majority`

exports.users = (callback) => {
	MongoClient.connect(uri, function(err, client) {
		if(err) {
	    	console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
	  }
    console.log("connected");
	  callback(client.db("carrybot").collection("users"));
	  client.close();
	})
}