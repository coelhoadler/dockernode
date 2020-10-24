const kafka = require('kafka-node');

(async () => {

  const kafkaClientOptions = { sessionTimeout: 0, spinDelay: 0, retries: 2 };
  const kafkaClient = new kafka.KafkaClient({kafkaHost: 'kafka:9092'}, kafkaClientOptions);

  const topics = [{ 
      topic: 'amazon-topic',
      offset: 0,
      partition: 0      
    }];
  
  const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    commitOffsetsOnFirstJoin: true
  };

  const kafkaAmazonTopicConsumer = new kafka.Consumer(kafkaClient, topics, options);
  kafkaAmazonTopicConsumer.on('message', async function(message) {
    console.log('>>> Message received:', message);
  });

  kafkaAmazonTopicConsumer.on('error', (error) => console.error('Kafka consumer error:', error));

  // amazon_desk-topic
  // const kafkaAmazonTopicConsumer = new kafka.Consumer(kafkaClient, topics[1], options);
  // kafkaAmazonTopicConsumer.on('message', async function(message) {
  //   console.log('>>> Message received:', JSON.parse(message));
  // });

  // kafkaAmazonTopicConsumer.on('error', (error) => console.error('Kafka consumer error:', error));  

  kafkaClient.on('error', (error) => console.error('Kafka client error:', error));  
})();