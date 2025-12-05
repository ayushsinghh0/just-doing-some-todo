const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "ayushsingh";
const { UserModel, TodosModel } = require("./db");

const app = express();
app.use(express.json());
// Remove "&directConnection=true" from the end of the string
mongoose.connect("mongodb+srv://admin:ayushsingh@cluster0.puqfpej.mongodb.net/todo-ayush-22?retryWrites=true&w=majority");

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    msg: "you are logged",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      msg: "incorrect credential",
    });
  }
});

app.listen(3000);
