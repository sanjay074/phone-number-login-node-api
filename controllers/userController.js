const bcrypt = require("bcrypt");
const _= require('lodash');
const jwt =require('jsonwebtoken');
const otpGenerator=require('otp-generator');
const{User} =require('../models/userModel');
const{Otp} =require('../models/otpModel');
module.exports.signUp =async(req,res)=>{
    const exist =await User.exists({number:req.body.number});
    if(exist){
        return res.status(400).send("User already registered!");
    };
    const OTP =otpGenerator.generate(6, {digits:true , upperCaseAlphabets: false, specialChars: false });
    const number = req.body.number;
    console.log(OTP);
    const otp = new Otp({ number: number ,otp: OTP});
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp,salt);
    const result = await otp.save();
    //console.log(result)
    return res.status(200).send("Otp sent successfully!");
} 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns json
 * @description User signup & login API
 * @date 16/03/2022
 * @author Sanjay kuamr
 */

module.exports.login = async(req,res)=>{
   const otpHolder = await Otp.find({
       number: req.body.number
   });
   if(otpHolder.length === 0) return res.status(400).send("You use an Expired OTP");
   const rightOtpFind = otpHolder[otpHolder.length - 1];
   const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
   if(rightOtpFind.number === req.body.number && validUser){
       const user =new User(_.pick(req.body ,["number"]));
       const token = user.generateJWT();
       const result = await user.save();
       const OPTDelete =await Otp.deleteMany({
           number:rightOtpFind.number
       });
       return res.status(200).send({
           message: "User login Sussessfull",
           token:token,
           data:result
       });
   }else{
       return res.status(400).send("OTP IS wrong")
   }
}

