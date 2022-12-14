const express= require("express")
const {connection} = require("./config/db")
const {userRoutes}= require("./routes/user")
const {blogRoutes}= require("./routes/blog")
const {authentication} = require("./middleware/authentication")


var cors = require('cors')
const app= express()
const PORT=process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
  res.status(200).send("Welcome to Blog App")
})
app.use("/user",userRoutes)
app.use(authentication)
app.use("/blog",blogRoutes)
app.listen(PORT, async()=>{
    try{
      await connection;
      console.log("conndected")
    }
    catch(err){
       console.log("something err")
  
    }
    console.log("started")
  })