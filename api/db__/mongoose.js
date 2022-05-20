const mongoose = require("mongoose");
mongoose.Promise=global.Promise;

const url="mongodb+srv://rbj:123rbj123@cluster0.vj7tw.mongodb.net/TaskManager?retryWrites=true&w=majority";
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("You're connected to mongodb ^_^ !");
}).catch((e)=>{
    console.log("Failed connection To mongodb -_- !");
    console.log(e);
});
// mongoose.set('UseCreateIndex',true);
// mongoose.set('UserFindAndModify',false);

module.exports={
    mongoose
}


