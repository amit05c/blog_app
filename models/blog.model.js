const mongoose= require("mongoose")

const blogSchema= new mongoose.Schema({
    
    title: String,
    category: String,
    author: String,
    content: String,
    userId: String
})

const BlogModel= mongoose.model("blog",blogSchema)

module.exports= {
    BlogModel
}