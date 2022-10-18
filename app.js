const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.firstNameInput;
  const lastName = req.body.lastNameInput;
  const email = req.body.emailInput;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/116c6e1868";

  const options = {
    method: "POST",
    auth: "vaguliyev@gmail.com:9458f86fbb15b031d023c7a2c7bebc87-us11"
  };

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on Port: 3000");
});
