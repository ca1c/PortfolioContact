require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'https://portfolio-ca1c.vercel.app/'
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
        subject: `${fName} ${lName} - Portfolio Contact`,
        text: bodyText,
    });

    console.log("Message sent: %s", info.messageId);
}

app.get('/', (req, res) => {
    res.send('');
})

app.post('/sendMessage', (req, res) => {
    sendMessage(req.body.fName, req.body.lName, req.body.email, req.body.bodyText)
        .then(() => {
            res.send({success: true, message: "Message Sent!"});
        })
        .catch(console.error());

})

app.listen(process.env.PORT || 3000);