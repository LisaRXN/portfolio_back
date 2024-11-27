const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { login, register, users } = require("./auth/auth");
const { sendMail } = require("./auth/mail");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


//routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil !");
});


app.post("/contact", (req, res) => {
  sendMail(req, res);
  console.log(req.body); 
  res.status(200).send("Received");

});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
