const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function sendMessage(fName, lName, email, bodyText) {

    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    }));

    let info = await transporter.sendMail({
        from: email,
        to: process.env.MAIL_USER,
        subject: `${fName} ${lName} - ${email} - Portfolio Contact`,
        text: bodyText,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
}

exports.sendMessage = sendMessage;
