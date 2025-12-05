const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="ayushsingh";
const {UserModel,TodosModel}=require("./db");

const app=express();
app.use(express.json());

 app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.insert({
        email: email,
        password: password,
        name: name
    })

    res.json({
        msg: "you are logge"
    })
});

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user=await UserModel.findOne({
        email:email,
        password:password
    })
    if(user){
        const token=jwt.sign({
            id:user._id
        });
        res.json({
            token: token
            
        })
    }
    else{
        res.status(403).json({
            msg:"incorrect credential"
        })
    }

})

app.post("/todo",function(req,res){

})

app.get("/todos",function(req,res){

})

app.listen(3000);// testing push
