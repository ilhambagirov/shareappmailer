"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const amqplib_1 = __importDefault(require("amqplib"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, fastify_1.default)();
const opt = { credentials: amqplib_1.default.credentials.plain('test-user', 'test-user') };
(() => __awaiter(void 0, void 0, void 0, function* () {
    const queue = 'mail';
    const conn = yield amqplib_1.default.connect('amqp://localhost:5672', opt);
    const mc = yield conn.createChannel();
    console.log("channel");
    yield mc.assertQueue(queue);
    console.log("queue");
    // Listener
    mc.consume(queue, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg !== null) {
            console.log('Received:', JSON.parse(msg.content.toString()));
            yield sendmail(JSON.parse(msg.content.toString()).mails[0], JSON.parse(msg.content.toString()).tagger);
            mc.ack(msg);
        }
        else {
            console.log('Consumer cancelled by server');
        }
    }));
}))();
function sendmail(to, tagger) {
    return __awaiter(this, void 0, void 0, function* () {
        var transport = nodemailer_1.default.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: "5d8890c3ddafcba1ad97ed2ae7626a98"
            }
        });
        try {
            const mailOptions = {
                from: 'mailtrap@demomailtrap.com',
                to,
                subject: "Info",
                text: tagger + ' has mentioned you in his post. Interact with the post quickly!',
            };
            const info = yield transport.sendMail(mailOptions);
            if (info.accepted)
                console.log("Urraaaa!!");
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    });
}
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: 3000 });
        console.log('Server listening on port 3000');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
start();
