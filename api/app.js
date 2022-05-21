const express =require('express');
const app=express();
const {mongoose}=require('./db/mongoose')
const bodyParser=require('body-parser');
const jwt = require('jsonwebtoken');
const { Day, Task, User} =require('./db/models');

/**middleware   */
/*  load midleware for using json forma  */
app.use(bodyParser.json());



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});
//chack jwt access token 

let authenticate= () => {
    jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{
        if(err){
            // there was an error
            res.status(401).send(err);
        }else{
            req.user_id=jwt.decoded._id;
            next();
        }
    });
}


// verify refresh token 
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. please Make sure that user id are correct !!'
            });
        }


     
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expireAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // so the session is  valid - call next() to continue with processing 
            next();
        } else {
            // is not valid
            return Promise.reject({
                'error': 'Refresh token has expired!'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}

/** end  middleware   */







/** end middleware   */

/* load the mongoose models */



/* Get   
   for get list of all days
*/


// when works logiin uncomment this
// app.get('/days', authenticate,(req, res)=> {
//     Day.find({_userId:req.user_id}).then((days)=>{
//         res.send(days);
//     }).catch((e)=>{
//         res.send(e);
//     });
// })

app.get('/days', (req, res)=> {
    // get the array days from database
    Day.find({}).then((days)=>{
        res.send(days);
    }).catch((e)=>{
        res.send(e);
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
            res.send({'message':'Day updated successfully!'});
        });
})

/* delete   
   delete day by id
*/

app.delete('/days/:id', (req, res)=> {
    // delete the days , use id to specify day
    Day.findOneAndRemove({
        _id:req.params.id
    }).then((removeDayDoc)=>{
            res.send(removeDayDoc);
    });

    //delete  all tasks belong to this day
    // console.log(removeDayDoc._dayId);
    // deleteTasksFromDay(removeDayDoc.);
  

        // delete all the tasks that are in the deleted list

})



 /* get tasks list for day by the id day */

app.get('/days/:dayId/tasks', (req, res)=> {
    //get tsks bellong to day by id
    Task.find({_dayId:req.params.dayId}).then((tasks)=>{
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
        res.send({message:'updated successfully !!'});
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
    let newUser=new User(body);
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
            .header('x-access-token',authTokens.accessToken)
            .send(newUser);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


/**post /users
 * purpose: sign in
 */
 app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            console.log('helloo');
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
 
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
 app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user is authenticated
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})









let deleteTasksFromDay=(_dayId)=>{
    Task.deleteMany({
        _dayId
    }).then(()=>{
        console.log("tasks deleted from"+_dayId+"defenitly!")
    })
}







app.listen(3000,() =>{
    console.log("the server is listening on port 3000");
})



// install nodemon ( is a tool that helps  node.js to automatically restarting the node application)