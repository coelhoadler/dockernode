const kafka = require('kafka-node');

module.exports = {
    sendToKafka: (deskObj) => {
        const kafkaClientOptions = { sessionTimeout: 0, spinDelay: 0, retries: 2 };
        const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' }, kafkaClientOptions);
        const kafkaProducer = new kafka.Producer(kafkaClient);

        kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
        kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

        const payload = [{
            topic: 'amazon_desk-topic',
            messages: deskObj,
            attributes: 1
        }];

        kafkaProducer.send(payload, function (error, result) {
            console.info(`Sent payload to amazon_desk-topic on Kafka:`);
            if (error) {
                console.error('Sending payload failed:', error);
            } else {
                console.log('Sending payload result:', result);
            }
        });
    }
}