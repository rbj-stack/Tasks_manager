const express =require('express');
const app=express();
const {mongoose}=require('./db/mongoose')
const bodyParser=require('body-parser');
//load midleware 
app.use(bodyParser.json());

//load the mongoose models 
const {Day, Task} =require('./db/models');


/* Get   
   for get list of all days
*/
app.get('/days', (req, res)=> {
    // get the array days ffrom database
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
})

/* delete   
   delete day by id
*/

app.delete('/days/:id', (req, res)=> {
    // delete the days , use id to specify day
})

app.listen(3000,() =>{
    console.log("the server is listening on port 3000");
})



// install nodemon ( is a tool that helps  node.js to automatically restarting the node application)