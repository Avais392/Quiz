
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var cors = require("cors");
// const creds = require("./config");

var transport = {
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "avais392@gmail.com",
    pass: "Born2Win"
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

router.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.description;
  var message = req.body.heading;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: name,
    to: "avais392@gmail.com", // Change to email address that you want to receive messages on
    subject: "New Submission from the Online Quiz",
    text: content
  };
console.log(req.body)
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail"
      });
    } else {
      res.json({
        status: "success"
      });
      transporter.sendMail(
        {
          from: "avais392@gmail.com",
          to: "avais392@gmail.com",
          subject: "Congrtulation!!!",
          text: `Thank you taking quiz with us!\n\nForm details\nName: ${name}\n Email: ${email}\n Message: `,
         
        },
        function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: " + info.response);
          }
        }
      );
    }
  });
});

// router.get("/a", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
const app = express();
var path = require("path");

const bodyParser = require('body-parser');
const { Button } = require("@material-ui/core");
const { Link } = require("react-router-dom");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3001);
