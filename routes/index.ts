import fastify from 'fastify';
import amqplib from "amqplib"
import sendmail from "../utils/send-mail"

const app = fastify();

const opt = { credentials: amqplib.credentials.plain('test-user', 'test-user') };

(async () => {
    const queue = 'mail';
    const conn = await amqplib.connect('amqp://localhost:5672', opt);

    const mc = await conn.createChannel();

    await mc.assertQueue(queue);

    // Listener
    mc.consume(queue, async (msg) => {
        if (msg !== null) {
            const { mails, tagger } = JSON.parse(msg.content.toString())
            await sendmail(mails, tagger)
            mc.ack(msg);
        } else {
            console.log('Consumer cancelled by server');
        }
    });
})();


const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('Server listening on port 3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
