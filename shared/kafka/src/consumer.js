const kafka = require('kafka-node');
const conn = require('./config/db');

(async () => {

  const kafkaClientOptions = { sessionTimeout: 0, spinDelay: 0, retries: 2 };
  const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' }, kafkaClientOptions);

  const amazon_topic = [{
    topic: 'amazon-topic',
    offset: 0,
    partition: 0
  }];

  const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'buffer',
    commitOffsetsOnFirstJoin: true
  };

  // amazon-topic
  const kafkaAmazonTopicConsumer = new kafka.Consumer(kafkaClient, amazon_topic, options);
  kafkaAmazonTopicConsumer.on('message', async function (message) {
    console.log('>>> Message received:', message);
  });

  kafkaAmazonTopicConsumer.on('error', (error) => console.error('Kafka consumer error:', error));

  // amazon_desk-topic
  const amazon_desk_topic = [{
    topic: 'amazon_desk-topic',
    offset: 0,
    partition: 0
  }];

  const kafkaAmazonDeskTopicConsumer = new kafka.Consumer(kafkaClient, amazon_desk_topic, options);
  kafkaAmazonDeskTopicConsumer.on('message', async function (deskObj) {
    console.log('Message received', deskObj);
    // const { userId, deskDesc, deskDate } = deskObj.value;

    conn.query(`INSERT INTO Desk (UserId, DeskDesc, DeskDate) VALUE (1, 'Test kafka listner', NOW())`, (error, results, fields) => {
        if (error) {
          console.log(`Error on insert in Desk table.`);
        } else {
          console.log(`Inserted in Desk table`);
        }
    });
    
  });

  kafkaAmazonDeskTopicConsumer.on('error', (error) => console.error('Kafka consumer error:', error));

  kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
})();