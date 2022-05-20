const mongoose=require('mongoose');
const_ =require('lodash') ;
const jwt=require('jsonwebtoken');
const { reject } = require('lodash');
const crypto=require("crypto");
const { resolve } = require('path');
const bcrypt = require('bcryptjs');
// jwt secret
const jwtSecret="81747420033329035636lkhqgduagupwaplq1262032964";

const UserSchema= new mongoose.Schema({
    email:{
        type: String,
        required :true,
        minlength:1,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        required :true,
        minlength:6
    },
    sessions:[{
        token:{
            type: String,
            required :true
        },
        expireSet:{
            type: Number,
            // required :true        
        }
    }]
});

//instance methode

UserSchema.methods.toJSON= function(){
    const user=this;
    const userObject=user.toObject();
    return _.omit(userObject,['password','sessions']);

    //return document except the password and session
}


UserSchema.methods.generateAccessAuthToken=function(){
    const user=this;
    return new Promise((resolve,reject)=>{
        //create the json web token 
        jwt.sign({_id:user._id.toHexString()},jwtSecret,{expiresIn:"15m"},(err, token)=>{
            if(!err){
                resolve(token);
            }else{
                reject();
            }
        })
    })
}




UserSchema.methods.generateRefreshAuthToken=function(){
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(64,(err,buf)=>{
            if(!err){
                let token= buf.toString();
                return resolve(token);
            }       
        })
    })
}

UserSchema.methods.createSession=function(){
    let  user=this;
    return user.generateRefreshAuthToken().then((refreshToken)=>{
        return saveSessionToDatabase(user,refreshToken);
    }).then((refreshToken)=>{
        return refreshToken;
    }).catch((e)=>{
        return Promise.reject('the session not storred in data . \n'+e)
    })
}



/********* model methods (static methods) ***********/


UserSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}
/***************************************************/
UserSchema.statics.findByIdAndToken = function (_id, token) {
    // finds user by id and token
    // used in auth middleware (verifySession)

    const user = this;

    return user.findOne({
        _id,
        'sessions.token': token
    });
}



UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                else {
                    reject();
                }
            })
        })
    })
}

UserSchema.statics.hashRefreshTokenExpired=(expireAt)=>{
    let secondSinceEpoch=Date.now()/1000;
    if(expireAt >secondSinceEpoch){
        return false;
    }else{
        return true;
    }
}
/**** middelware ***/ 
//before a user doc is saved this code runs
UserSchema.pre('save',function(next){
    let user=this;
    let constFactor =10;

    if(!user.isModified('password')){
        // if the password fuield has been changed then run thi code
        bcrypt.genSalt(constFactor,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                next();
            })

        })
   
    }else{
        next();
    }

});


/************ helper methods **********/
let saveSessionToDatabase=(user,refreshToken)=>{
    return new Promise((resolve,reject)=>{
        let expireAt=generateRefreshTokenExpireTime();
        user.sessions.push({'token':refreshToken,expireAt});

        user.save().then(()=>{
          //save session successfully
            return resolve(refreshToken);
        }).catch((e)=>{
            reject(e);
        });
  

    })
}

let generateRefreshTokenExpireTime=()=>{
    let dayUntilExpire="10";
    let secondUntilExpire=((dayUntilExpire*24)*60)*60;
    return ((Date.now()/1000)+secondUntilExpire);
}


const User=mongoose.model('User',UserSchema);
// module.exports =  mongoose.model('User', UserSchema)

module.exports={User}