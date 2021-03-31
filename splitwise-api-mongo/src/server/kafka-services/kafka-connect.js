const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "splitwise",
  brokers: ["localhost:9092", "localhost:9092"],
});
const producer = kafka.producer();

const connect = async () => {
  await producer.connect();
};

module.exports = producer;
