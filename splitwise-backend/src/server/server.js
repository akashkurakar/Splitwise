var connection = new require("./kafka-services/connection");
//topics files

var userlogin = require("./modules/userloginmodule");
var usersignup = require("./modules/usersignupmodule");
var usersudpate = require("./modules/userprofilemodule");
var getgroup = require("./modules/getgroupmodule");
var gettransaction = require("./modules/gettransactionmodule");
var getgroupbalances = require("./modules/getgroupbalancesmodule");
var getcomments = require("./modules/getcommentsmodule");
var deletecomments = require("./modules/deletecommentsmodule");
var addcomment = require("./modules/addcommentsmodule");
var creategroup = require("./modules/creategroupmodule");
var approvegrouprequest = require("./modules/approvegrouprequestmodule");
var leavegroup = require("./modules/leavegroupmodule");
var updategroup = require("./modules/updategroupmodule");
var getbalances = require("./modules/getbalancesmodule");
var addtransaction = require("./modules/addtransactionmodule");
var gettotalpaidowedtransaction = require("./modules/gettotalpaidowedtransactions");
var settletransaction = require("./modules/transactionsettle");
var updatetransaction = require("./modules/updatetransaction");
var getactivities = require("./modules/getactivitiesmodule");
var getactivitiesbygroup = require("./modules/getactivitiesbygroupmodule");
var signup = require("./modules/usersignupmodule");
var profileupdate = require("./modules/userprofilemodule");

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

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
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
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login", userlogin);
handleTopicRequest("signup", signup);
handleTopicRequest("profileupdate", profileupdate);

/* Transaction */
handleTopicRequest("gettransaction", gettransaction);
handleTopicRequest("getgroupbalances", getgroupbalances);
handleTopicRequest("getbalances", getbalances);
handleTopicRequest("addtransaction", addtransaction);
handleTopicRequest("gettotalpaidowedtransaction", gettotalpaidowedtransaction);
handleTopicRequest("settletransaction", settletransaction);
handleTopicRequest("updatetransaction", updatetransaction);

/* Comment */
handleTopicRequest("getcomments", getcomments);
handleTopicRequest("deletecomments", deletecomments);
handleTopicRequest("addcomment", addcomment);

/* Group */
handleTopicRequest("creategroup", creategroup);
handleTopicRequest("getgroup", getgroup);
handleTopicRequest("approvegrouprequest", approvegrouprequest);
handleTopicRequest("leavegroup", leavegroup);
handleTopicRequest("updategroup", updategroup);

/* Activites */
handleTopicRequest("getactivities", getactivities);
handleTopicRequest("getactivitiesbygroup", getactivitiesbygroup);
