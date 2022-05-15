const mongoose=require('mongoose');
const TaskSchema= new mongoose.Schema({
    title:{
        type : String,
        minlenght:1,
        trim:true
    },
    listId :mongoose.Types.ObjectId,
    label :String,
    description :String,
    type:String,
    dueDate :Date
    
})
const Task = mongoose.model('Task', TaskSchema);
module.exports={Task}