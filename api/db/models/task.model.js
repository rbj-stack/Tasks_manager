const mongoose=require('mongoose');
const TaskSchema= new mongoose.Schema({

    label:{
        type : String,
        minlenght:1,
        trim:true
    },
    description:{
        type : String,
        minlenght:3,
        trim:true
    },
    type: String,
    dueDate: Date,
    _dayId:{
        type: mongoose.Types.ObjectId
    }
    
})




const Task = mongoose.model("Task", TaskSchema);
module.exports={Task}