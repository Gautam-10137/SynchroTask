const User = require("../model/User");
const bcrypt = require("bcryptjs");
const Token = require("../model/Token");
const crypto = require("crypto");
require('dotenv').config();
const AuthServices = {
  register: async (detail) => {
    try {
      const { name, email, password } = detail;
      const user = User.findOne({ email: email });
      if (user) return {message:'A User with given email Already Exists!',user:user};

      const newUser = new User({ name, email, password });

      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        newUser.password = hashedPassword;
        await newUser.save();
      });

    //   const token= this.generateToken();


    //   const link= `http://localhost:6000/api/user/confirm/${token.token}`;
    //   await this.verifyEmail(email,link);
    //   return {message:"Email sent. Check your mail",user:newUser};
    return newUser;
    } 
    catch (e) {
      consolr.error(`Error Regitering the new user : ${e.message}`);
    }
  },
  generateToken: async()=>{
    try{
        const token = new Token({
            userId: newUser._id,
            token: crypto.randomBytes(16).toString("hex"),
          });
          await token.save();
          console.log(token);
          return token;
    }
    catch(err){
        console.error({message:'Error Generating token'});
    }
  },
  verifyEmail: async(email,link)=>{
     try{
        let transporter=nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user: process.env.EmailUSER,
                password: process.env.EMAILPASSWORD
            }
        });
       
        // send email
        let info=await transporter.sendMail({
            from: process.env.User,   // sender mail
            to:email,                 // receiver
            subject:"Account Verification",
            text:"Welcome",
            html:`
               <div>
                    <a href=${link}> Click here to Verify your email</a>
               </div>
            `   // mail body
        });
        console.log("mail send successfully"); 
     }
     catch(err){
        console.error(`Error sending mail :${err.message}`);
     }
  },
  activeAccount: async(token)=>{

  } 
};

module.exports = AuthServices;
