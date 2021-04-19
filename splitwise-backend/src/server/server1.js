const connection = new require("./kafka-services/connection");
//topics files
//var signin = require('./services/signin.js');
const userlogin = require("./modules/userloginmodule");
const usersignup = require("./modules/usersignupmodule");
const usersudpate = require("./modules/userprofilemodule");
const getgroup = require("./modules/getgroupmodule");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:admin@splitwise.ojcpf.mongodb.net/main?retryWrites=true&w=majority";

mongoose.connect(uri, {
  poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to Mongo");
});

async function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = await connection.getConsumer(topic_name);
  var producer = await connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest("login", userlogin);
handleTopicRequest("getgroup", getgroup);
handleTopicRequest("signup", usersignup);
// handleTopicRequest("profileupdate", usersudpate);
