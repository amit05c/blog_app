const {Router}= require("express")
const { BlogModel } = require("../models/blog.model")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const blogRoutes= Router()


blogRoutes.get("/",async(req,res)=>{
    //  let {status,}= req.query
  
       
      if(req.query){

          let allBlog= await BlogModel.find({...req.query})
          res.send({"message": allBlog})
      }else{
        let allBlog= await BlogModel.find()
        res.send({"message": allBlog})
      }
      
    
      
  })


blogRoutes.post("/create", async(req,res)=>{

    //  console.log(req.body)
    
   
          let {title,category,author,content,userId}= req.body
          let newBlog= new BlogModel({
            userId,
           title,
           category,
           author,
           content

          })
       await newBlog.save()
            res.send({"message":newBlog})
       
})


blogRoutes.delete("/delete/:_id",async(req,res)=>{
    
          let {_id}=req.params
          let {userId}= req.body
          // console.log(_id)
          // console.log(userId)
          let x= await BlogModel.findOneAndDelete({_id,userId})
          
          if(x){
              res.send({"message":"deleted"})

          }else{
            res.send({"message":"You are not authorised"})
          }
          

       
})




blogRoutes.patch("/update/:_id",async(req,res)=>{

    
        let {userId}= req.body
        let {_id}= req.params
        // console.log(req.body)
         let x= await BlogModel.findOneAndUpdate({userId,_id},{...req.body})
         
          let updatedData= await BlogModel.findOne({userId,_id})
        
          if(x){
            res.send({"message":updatedData})
          }else{
            res.send({
              "message": "not authorised"
            })
          }
          
          
  
})









module.exports={
    blogRoutes
}