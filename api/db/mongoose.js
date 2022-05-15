const mongoose = require("mongoose");
mongoose.Promise=global.Promise ;  

mongoose.connect('mongodb://localhost:27017/TaskManager',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("You're connected to mongodb ^_^ !");
}).catch((e)=>{
    console.log("Failed connection To mongodb -_- !");
    console.log(e);
})
/* mongoose.set('UseCreateIndex',true);
// mongoose.set('UserFindAndModify',false);*/

module.exports={
    mongoose
}