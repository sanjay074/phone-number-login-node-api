const {Subject} =require("../models/subjectModel");
module.exports.chooseSubject=async(req,res)=>{
    const{subjectName} = req.body;
    const newSubject = new Subject({
        subjectName
    });
    try{
        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject);
    }catch(err){
        res.status(500).json(err)
    }
} 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns json
 * @description Add Subject and findSubjects
 * @date 16/03/2022
 * @author Sanjay kuamr
 */

module.exports.findBooks= async(req ,res)=>{
    try{
    const findBooks = await Subject.find();
    res.status(200).json(findBooks);
    }catch(err){
        res.status(500).json(err)
    }
} 