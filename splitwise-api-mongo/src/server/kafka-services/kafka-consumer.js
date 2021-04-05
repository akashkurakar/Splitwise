const kafka = require("kafka-node");

const client = new kafka.KafkaClient("http://localhost:9092");

const topics = [
  {
    topic: "user",
  },
];
const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer",
};

const consumer = new kafka.Consumer(client, topics, options);

consumer.on("message", function (message) {
  // Read string into a buffer.
  var buf = new Buffer(message.value, "binary");
  var decodedMessage = JSON.parse(buf.toString());
  console.log(decodedMessage);
  //Events is a Sequelize Model Object.
  /* return Events.create({
    id: decodedMessage.id,
    type: decodedMessage.type,
    userId: decodedMessage.userId,
    sessionId: decodedMessage.sessionId,
    data: JSON.stringify(decodedMessage.data),
    createdAt: new Date(),
  });*/
});

consumer.on("error", function (err) {
  console.log("error", err);
});

process.on("SIGINT", function () {
  consumer.close(true, function () {
    process.exit();
  });
});
