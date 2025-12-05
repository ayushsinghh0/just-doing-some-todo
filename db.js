const mongoose=require("mongoose");
const ObjectId=mongoose.ObjectId;

const Schema=mongoose.Schema;
const User=new Schema({
    email: String,
    password: String,
    name:String
})
//fixing

const Todo=new Schema({
    title:String,
    done:Boolean,
    time: Date,
    userId: ObjectId
})

const UserModel=mongoose.model('users',User);
const TodoModel =mongoose.model('todos',Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}
