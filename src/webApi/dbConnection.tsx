var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/postsDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Successfuly connected to postsDB");
  db.close();
});