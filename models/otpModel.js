const {Schema , model} = require('mongoose');
module.exports.Otp =model('Otp',Schema({
       number:{
           type:String,
           required:true
       },
       otp:{
           type:String,
           required:true,
       },
       createdAT:{type:Date,default:Date.now,index:{expires:300}}
},{timestamps:true}))