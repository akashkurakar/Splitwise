const { Kafka } = require("kafkajs");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

const kafka = new Kafka({
  clientId: "splitwise",
  brokers: ["localhost:9092", "localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

consumer.connect();
consumer.subscribe({ topic: "user-signup" });

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
    try {
      let userObj = JSON.parse(message.value.toString());
      var password = bcrypt.hashSync(userObj.password, salt);
      userObj.password = password;
      const usr = new User(userObj);
      usr.save((err, user) => {
        if (err) {
          console.log("Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
});
