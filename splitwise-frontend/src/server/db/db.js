const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:admin@splitwise.ojcpf.mongodb.net/main?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
