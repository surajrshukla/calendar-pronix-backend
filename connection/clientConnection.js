const MongoClient = require('mongodb').MongoClient;

const db = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true })
  return client.db("calendar");
}


module.exports =  db;