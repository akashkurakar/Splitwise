"use strict";
var cors = require("cors");

const client = require("./db/db");

const express = require("express");

const app = express();

const api = require("./api/router.js");

app.use(express.static("./public"));

const port = 3001;

// const connect = require("./kafka-services/kafka-connect");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
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
  app.listen(port, console.log("Ser ver is listening on port :", port));
  app.emit("app_started");
});

//connect();

/* client.connect((err) => {
  const collection = client.db("main");
  // perform actions on the collection object
  app.locals.db = collection;
  console.log("MongoDb Connected");
  //client.close();
}); */

module.exports = app;
