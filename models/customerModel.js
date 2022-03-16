const{Schema,model} =require("mongoose");
const customerSchema =Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
},{timestamps:true})
    
module.exports.Customer = model('Customer',customerSchema);