const express =require('express');
const app=express();
const {mongoose}=require('./db/mongoose')
const bodyParser=require('body-parser');

/**middleware   */
/*  load midleware for using json forma  */
app.use(bodyParser.json());
// 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//verify refresh token 
app.use((req,res,next)=>{
    let refreshToken=req.header('x-refresh-token');
    let _id=req.header('_id');

    User.findByIdAndToken(_id,token).then((user)=>{
        if(!user){
            return Promise.reject({
                "error":"user not found , make sure that the refresh token and user id  are correct"
            });
        }
        // if the reaches here - the user was found 
        //theerefor the refresh token exists in the database , but we still have to check expired or not

        req.user_id=user._id;
        req.refreshToken=refreshToken;
        let isSessionValid=false;
        user.sessions.forEach((session)=>{
            if(session.token===refreshToken){
                if(user.hasRefreshTokenExpired(session.expiresAt)===false){
                    //refresh token has not expired
                    isSessionValid=true;
                }
            }
        });
        if(isSessionValid){
            //the session valid call next() to coninue process
            next();
        }else{
            // session not valid
            return Promise.reject({
                "error":"Refresh token has expired or the session invalid"
            })
        }
    })
})
/** end middleware   */


/* load the mongoose models */
const {Day, Task, User} =require('./db/models');
const { user } = require('./db/models/user.model');


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


/************** user routes ****** */

/**post /users
 * purpose: sign up
 */
app.post('/users',(req,res)=>{
    //user register
    let body =req.body;
    let newUser=new User(body)
    newUser.save().then(()=>{
        return newUser.createSession();
    }).then((refreshToken)=>{
            
        //session created successfully  = refreshToken returned
        // we generate an access auth token for user

        return newUser.generateAccessAuthToken().then((accessToken)=>{
            return {accessToken,refreshToken}
        });
    }).then((authTokens)=>{
        res
            .header('x-refresh-token',authTokens.refreshToken)
            .header('x-access-token',authTokens.refreshToken)
            .send(newUser);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


/**post /users
 * purpose: sign in
 */
app.post('/users/login',(req,res)=>{
    //user login
    let email =req.body.email;
    let password=req.body.password;
    User.findByCredentials(email,password).then((user)=>{
        return user.createSession().then((refreshToken)=>{
            //session created successfully -refreshtoken returned
            //now ze generate an auth token for the user
            return user.generateAccessAuthToken().then((accessToken)=>{
                return {accessToken,refreshToken}
            });
        }).then((authTokens)=>{
            res
                .header('x-refresh-token',authTokens.refreshToken)
                .header('x-access-token',authTokens.accessToken)
                .send(user);

        })
    }).catch((e)=>{
        res.status(400).send(e);
    });
})



/**generate and return acces token */

app.get('/users/me/access-token',(req,res)=>{
    /**create middlewwre  */

})


app.listen(3000,() =>{
    console.log("the server is listening on port 3000");
})



// install nodemon ( is a tool that helps  node.js to automatically restarting the node application)