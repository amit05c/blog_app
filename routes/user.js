const {Router}= require("express")
const { UserModel } = require("../models/user.model")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const userRoutes= Router()

userRoutes.get("/",(req,res)=>{
    res.send("This is home")
})

userRoutes.post("/signup",(req,res)=>{
    let {name,email,password}= req.body

    
    
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.status(500).send({"Error":"someting error"})
        }else{
            
        
            const newUser= new UserModel({name,email,password: hash})
            await newUser.save()
            res.status(200).send({"message":"successfully registered"})
        }
    });
    
})


userRoutes.post("/login",async(req,res)=>{
    let {email,password}= req.body
    let user= await UserModel.findOne({email})
    let hash= user.password
    bcrypt.compare(password, hash, async function(err, result) {
    
        if(result){
        //     console.log(result)
        //    console.log(user)

        var token =  jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET);
        // console.log(token)
         res.status(200).send({
            message: "login successful",
            token
         })

       }else{
          res.status(500).send({"Error":"invalid credential"})
       
       }
    });
})


module.exports={
    userRoutes
}