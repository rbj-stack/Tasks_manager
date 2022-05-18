const express =require('express');
const app=express();
const {mongoose}=require('./db/mongoose')
const bodyParser=require('body-parser');
/*  load midleware for using json forma  */
app.use(bodyParser.json());
// 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


/* load the mongoose models */
const {Day, Task} =require('./db/models');


/* Get   
   for get list of all days
*/
app.get('/days', (req, res)=> {
    // get the array days from database
    Day.find({}).then((days)=>{
        res.send(days);
    });
})

/* Post   
   for Add new days 
*/

app.post('/days', (req, res)=> {
    // create new days for add tasks ,and retuen new day to user with the id
    let title=req.body.title;

    let newDay=new Day({
        title
    });
    newDay.save().then((dayDoc)=>{
        // returned day document (inc,id)
        res.send(dayDoc);
    });

})
/* patch   
   update day by id
*/

app.patch('/days/:id', (req, res)=> {
    // update the days , use id to specify day
    Day.findOneAndUpdate({_id:req.params.id},{
        $set: req.body}).then(()=>{
            res.sendStatus(200);
        });
})

/* delete   
   delete day by id
*/

app.delete('/days/:id', (req, res)=> {
    // delete the days , use id to specify day
    Day.findByIdAndRemove({_id:req.params.id}).then((removeDayDoc)=>{
            res.send(removeDayDoc);
        });
})



 /* get tasks list for day by the id day */

app.get('/days/:dayId/tasks', (req, res)=> {
    //get tsks bellong to day by id
    Task.find({dayId:req.params.dayId}).then((tasks)=>{
            res.send(tasks);
        });
});

 /* get task specified by id day */

 app.get('/days/:dayId/tasks/:taskId', (req, res)=> {
    //get tsks bellong to day by id
    Task.findOne({
        _id:req.params.taskId,
        _dayId:req.params.dayId
    }).then((task)=>{
            res.send(task);
    });
});
 /* add  tasks belong to day by id specified */

app.post('/days/:dayId/tasks', (req, res)=> {
    // create new tasks for a specific day 
    let label=req.body.label;
    let description=req.body.description;
    let type=req.body.type;
    let dueDate=req.body.dueDate;
    let _dayId=req.params.dayId;

    let newTask=new Task({
 
        label,
        description,
        type,
        dueDate,
        _dayId
        
    });
    newTask.save().then((dayTask)=>{
        // returned day document (inc,id)
        res.send(dayTask);
    });
});


 /* updatee task belong to day by id specified */
app.patch('/days/:dayId/tasks/:taskId', (req, res)=> {
    // create new tasks for a specific day 

    Task.findByIdAndUpdate({_id:req.params.taskId,_dayId:req.params.dayId},{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200);
    })
});

 /* delete task belong to day by id specified */

 app.delete('/days/:dayId/tasks/:taskId', (req, res)=> {
    // create new tasks for a specific day 

    Task.findByIdAndRemove({_id:req.params.taskId,_dayId:req.params.dayId},{
        $set:req.body
    }).then((removetaskDoc)=>{
        res.send(removetaskDoc);
    })
});


app.listen(3000,() =>{
    console.log("the server is listening on port 3000");
})



// install nodemon ( is a tool that helps  node.js to automatically restarting the node application)