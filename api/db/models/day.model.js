const mongoose=require('mongoose');
// import mongoose from 'mongoose';
// const { Schema } = mongoose;


const DaySchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true
    },
    _userId:{
        type:String,
        // required:true
    }
    // date: { type: Date }
})
const Day = mongoose.model("Day", DaySchema);
module.exports={Day}


