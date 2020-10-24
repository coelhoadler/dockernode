const kafka = require('kafka-node');

module.exports = {
    sendToKafka: () => {
        console.log('>>> Emitindo pro Kafka >>>');
        const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
        const kafkaClient = new kafka.KafkaClient({kafkaHost: 'host.docker.internal:9092'}, kafkaClientOptions);
        const kafkaProducer = new kafka.Producer(kafkaClient);

        kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
        kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

        const payload = [{
            topic: 'amazon-topic',
            messages: '[SEND PAYLOAD TO KAFKA BROKER]',
            attributes: 1
        }];

        kafkaProducer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka:', payload);
            if (error) {
                console.error('Sending payload failed:', error);
                // res.status(500).json(error);
            } else {
                console.log('Sending payload result:', result);
                // res.status(202).json(result);
            }
        });
    }
}