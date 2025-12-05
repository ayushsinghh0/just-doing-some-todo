const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const mongoose = require("mongoose");
const JWT_SECRET = "ayushsingh";
const { UserModel, TodoModel } = require("./db");

const app = express();
app.use(express.json());
// Remove "&directConnection=true" from the end of the string
mongoose.connect("mongodb+srv://admin:ayushsingh@cluster0.puqfpej.mongodb.net/todo-ayush-22?retryWrites=true&w=majority")
.then(()=>console.log("connected to data base"))
.catch(err=>console.log("not connected some error happened",err));

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const newpassword=await bcrypt.hash(password,5);

  try {await UserModel.create({
    email: email,
    password: newpassword,
    name: name,
  });
}
catch(err){
    res.json({
        msg:"something happened"
    })
}

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
        id: user._id.toString(),
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

app.post("/todos",auth,async function(req,res){
    const title=req.body.Description;
    const newdate=new Date();
    await TodoModel.create({
        title : title,
        done: false,
        time :newdate,
        userId:req.userId
    })
    res.json({
        msg:"todo succesfully created"
    })
})

function auth(req,res,next){

    const token=req.headers.token;

    const decodedData=jwt.verify(token,JWT_SECRET);

    if(decodedData){
        req.userId=decodedData.id;
        next();
    }
    else{
        res.status(403).json({
            msg:"incorrect authentication"
        })
    }
}

app.listen(3000);
