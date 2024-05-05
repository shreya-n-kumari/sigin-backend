const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://shreyankumari:m7UJBZv8cg2nOU6M@cluster0.0pnk9bm.mongodb.net/User_registration"
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => req.json(user))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
