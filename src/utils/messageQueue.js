const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

// create channel to the message broker rabbitmq server
const createChannel = async ()=> {
    try {
        const connection = await  amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct',  {
            durable: false
        });
        return channel;

    } catch (error) {
        throw error;
    }
}

// get message from rabbitmq server's queue
const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_NAME');
        await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
        // console.log(channel);
        await channel.consume(applicationQueue.queue, (msg) => {
          console.log("recieved data");
          console.log(msg.content.toString());
          const payload = JSON.parse(msg.content.toString());
          service(payload);
          //* service(payload); pass service function where you 
          //* you want to use this payload came from the rabitmq 
          //* e.g. you want to send email and when call pass that service as argument

          channel.ack(msg);
        }); 
    } catch (error) {
        console.log("error in subscribeMessage");
        throw error;
    }
   
}

// publish message to rabbitmq servers queue
const publishMessage = async ( channel, binding_key, message) => {
    try {
        await channel.assertQueue("REMINDER_NAME");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));

    } catch (error) {
        throw error;
    }
        

}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}