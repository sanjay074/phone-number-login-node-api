const express = require("express");
const mongoose =require('mongoose');
const app = express();
app.use(express.json()); 
const userRouter=require('./routers/userRouter');
const customerRouter =require('./routers/customersRouter');
const subjectRouter =require('./routers/subjectRouter');
require('dotenv/config');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
}) 
app.use('/api',userRouter);
app.use('/api',customerRouter);
app.use('/api',subjectRouter);
const PORT =process.env.PORT||3000 ;
app.listen(PORT,()=>{console.log(`App running on port ${PORT}`)});