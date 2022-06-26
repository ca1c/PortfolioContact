require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const email = require('./email.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://portfolio-ca1c.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('');
})

app.post('/sendMessage', (req, res) => {
    if(!req.body) {
      res.send({success: false, message: "No request body."})
    }
    else if(!req.body.fName || !req.body.lName || !req.body.email || !req.body.bodyText || Object.keys(req.body).length !== 4) {
      res.send({success: false, message: "Incomplete or Incorrect data."});
      return;
    }
    else {
      email.sendMessage(req.body.fName, req.body.lName, req.body.email, req.body.bodyText)
          .then(() => {
              res.send({success: true, message: "Message Sent!"});
          })
          .catch(console.error());
    }
})

app.listen(process.env.PORT || 3000);
