import nodemailer from 'nodemailer'

export default async function sendmail(to: string, tagger: string) {
    var transport = nodemailer.createTransport({
        host: "your_host",
        port: 587,
        auth: {
            user: "api",
            pass: "your_pass"
        }
    });

    try {
        const mailOptions = {
            from: 'from',
            to,
            subject: "Info",
            text: tagger + ' has mentioned you in his post. Interact with the post quickly!',
        };

        const info = await transport.sendMail(mailOptions);

        if (info.accepted) console.log("Urraaaa!!");

    } catch (error) {
        console.error('Error sending email:', error);
    }
}