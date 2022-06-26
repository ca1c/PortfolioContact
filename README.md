# Portfolio Contact Server

The server behind the contact page on my portfolio

## Usage

If you want to use this server yourself here are the steps:

1. create a `.env` file in the root of the project and fill it with this text:

```
MAIL_USER=example@gmail.com
MAIL_PASS=Email_Password
PORT=3000
```

*The `PORT` variable is optional (the default port is 3000)*

2. Make a request to the Server

You can do this using a [REST client](https://install.advancedrestclient.com/install) or [curl](https://curl.se/)

Here is how you can create a pull request in javascript using [axios](https://axios-http.com/).

```javascript
axios.post('http://localhost:3000/sendMessage', {
  fName: "First",
  lName: "Last",
  email: "example@gmail.com",
  bodyText: "Example body text."
})
.then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(error);
})
```

The second parameter of the `axios.post` method is the data you are sending in your post request. Follow the data structure as follows or change the required data structure in the `app.js` file here:

```javascript
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
```
