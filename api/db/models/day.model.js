const mongoose=require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;


const DaySchema= new Schema({
    title:{
        type: String,
        trim:true
    },
    date: { type: Date, default: Date.now }
})
const Day = mongoose.model('Day', DaySchema);
module.exports={Day}