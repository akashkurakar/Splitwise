const kafka = require("kafka-node");
const uuid = require("uuid");

// var client = new kafka.KafkaClient();
const client = new kafka.KafkaClient("http://localhost:9092", "splitwise", {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2,
});

const producer = new kafka.HighLevelProducer(client);

var topicsToCreate = [
  {
    topic: "user",
    partitions: 1,
    replicationFactor: 2,
  },
  {
    topic: "group",
    partitions: 5,
    replicationFactor: 3,
  },
  {
    topic: "transaction",
    partitions: 1,
    replicationFactor: 2,
  },
  {
    topic: "activities",
    partitions: 1,
    replicationFactor: 2,
  },
];

producer.on("ready", function () {
  console.log("Kafka Producer is connected and ready.");
});
producer.on("error", function (error) {
  console.error(error);
});
/*producer.createTopics(topicsToCreate, true, function (err, data) {
  if (err) throw err;
  console.log(data);
});

producer.createTopics(topicsToCreate, (error, result) => {
  if (error) throw console.error();
  console.log(result);
});*/

const KafkaService = {
  sendRecord: ({ topic, data }, callback = () => {}) => {
    const event = {
      id: uuid.v4(),
      timestamp: Date.now(),
      data: data,
    };

    const buffer = new Buffer.from(JSON.stringify(event));

    // Create a new payload
    const record = [
      {
        topic: topic,
        messages: buffer,
        attributes: 1 /* Use GZip compression for the payload */,
      },
    ];

    //Send record to Kafka and log result/error
    producer.send(record, callback);
  },
};

module.exports = KafkaService;
