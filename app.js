const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyparser.urlencoded({extended : true}));


//---------------Mongoose Set-up
mongoose.connect("mongodb://localhost:27017/HM",{useNewUrlParser : true});

const signup_Schema = {
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
}

const signup_model = mongoose.model("stud_signup",signup_Schema);

//-------------Home Route
app.get("/",function(req,res){
  res.sendFile(__dirname + "/studentsignup.html");
});



//-------------Login Route

app.get("/studentlogin",function(req,res){
   res.sendFile(__dirname + "/studentlogin.html")
});

app.post("/studentlogin",function(req,res){

    const uname = req.body.username;
    const pass = req.body.password;

    signup_model.findOne({username:uname},function(err,data){
       if(!data){
        console.log("Signup first!");
       }else{
         if(data.username==uname && data.password==pass){
           console.log("Login Sucessfully!");
         }else{
           console.log("Wrong Password!");
         }
       }
    });

});



//--------------Sign-up Route
app.post("/studentsignup",function(req,res){

  const uname = req.body.username;
  const pass = req.body.password;

  const signup_data = new signup_model({
     username : uname,
     password : pass
  });

  signup_data.save(function(err){
    if(!err){
      console.log("Data Added Sucessfully!");
    }else{
      console.log(err);
    }
  });


});



app.listen("3000",function(){
   console.log("your server stared on port 3000");
});
