const kafka = require('kafka-node');

(async () => {

  const kafkaClientOptions = { sessionTimeout: 0, spinDelay: 0, retries: 2 };
  const kafkaClient = new kafka.KafkaClient({kafkaHost: 'kafka:9092'}, kafkaClientOptions);

  const topics = [
    { 
      topic: 'amazon-topic',
      offset: 0,
      partition: 0      
    }
  ];
  
  const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    commitOffsetsOnFirstJoin: true
  };

  const kafkaConsumer = new kafka.Consumer(kafkaClient, topics, options);
  kafkaConsumer.on('message', async function(message) {
    console.log('>>> Message received:', message);
  });
  
  kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
  kafkaConsumer.on('error', (error) => console.error('Kafka consumer error:', error));
})();