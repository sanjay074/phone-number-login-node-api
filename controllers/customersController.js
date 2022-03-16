const Joi =require("joi");
const {Customer} =require("../models/customerModel");
module.exports.register = async(req,res)=>{
    try{
        const exist = await Customer.exists({email:req.body.email});
        if(exist){
            return  res.status(400).send("User already registered!");
        }
    }catch(err) {
        res.status(500).json(err)
    }  
    const {name ,email}= req.body ;
    const newCustomer = new Customer({
        name,
        email
    });
    try{
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
    }catch(err){
        res.status(500).json(err)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns json
 * @description Add Customer and findCustomer
 * @date 16/03/2022
 * @author Sanjay kuamr
 */

module.exports.findCustomer= async(req ,res)=>{
    try{
    const customerFind = await Customer.find();
    res.status(200).json(customerFind);
    }catch(err){
        res.status(500).json(err)
    }
} 
module.exports.updated =async(req ,res)=>{
    try{
    const  updatedUser = await Customer.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
     res.status(200).json(updatedUser)
    }catch(err){
     res.status(500).json(err)   
    }
}