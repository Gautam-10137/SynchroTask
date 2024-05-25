const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','manager','team_member'],
        default:'team_member'
    }
});

const User=mongoose.model('User',userSchema);

module.exports=User;