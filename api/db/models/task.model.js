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

    dueDate: String,
    type: String,
    _dayId:{
        type: mongoose.Types.ObjectId
    },
    completed :{
        type:Boolean,
        default:false
    }
    
})




const Task = mongoose.model("Task", TaskSchema);
module.exports={Task}