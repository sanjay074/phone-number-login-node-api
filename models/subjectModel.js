const{Schema,model} =require("mongoose");
const subjectSchema =Schema({
    subjectName:{
        type:String,
        required:true
    }  
},{timestamps:true})
    
module.exports.Subject = model('Subject',subjectSchema);