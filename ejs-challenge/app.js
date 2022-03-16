//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
 const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
 const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://admin-Rohan:test1234@cluster0.shkqb.mongodb.net/blogDB")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
 postTitle : String,
 postBody: String
})

const Blog = mongoose.model("Blog", blogSchema)

app.get("/", function(req,res){
  Blog.find({}, function (err, blogList) {
    if(err){
      console.log(err)
    }
    else{
      res.render("home",{homeContent:homeStartingContent, posts:blogList})
    }
    })


  

  
})

app.get("/about", function (req,res) {

      res.render("about",{aboutContent:aboutContent})
  
 
  })

app.get("/contact", function (req,res) {

      res.render("contact",{contactContent:contactContent})

  })

app.get("/compose",function (req,res) {

  res.render("compose")

  })

app.get("/posts/:postid", function (req,res) {
  postT = req.params.postid
  Blog.findOne({_id:postT}, function (err, blog) {
     if(err){
       console.log(err)
     }
     else{
      res.render("post", {post: blog});
     }
    })
  
  // let k=0
  // console.log(req.params.postid)
  // posts.forEach(function(post){
  //   if(_.lowerCase(post.postTitle) === _.lowerCase(req.params.postid)){
  //     console.log("match found!!")
  //      k=1
  //      res.render("post",{post:post})
  //   }
    

  // })
  // if(k==0){
  //   console.log("not found!")
  //   res.redirect("/")
  // }


})


app.post("/compose", function (req,res) {
  const post = new Blog ({

    postTitle: req.body.postTitle,
 
    postBody: req.body.postBody
 
  });

  // console.log(post)
  post.save(function (err) {
    if(!err){
      res.redirect("/")
    }
else{
  console.log(err)
}
    })
  
  
  })






let port = process.env.PORT;
if(port == null || port ==""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
