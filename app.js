const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyparser.urlencoded({extended : true}));


//---------------Mongoose Set-up
mongoose.connect("mongodb+srv://hsam:lXZkeArAfdvRoqmG@cluster0.7ddj5.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });

const signupSchema = {
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
}

const signupmodel = mongoose.model("studentsignup",signupSchema);

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

    signupmodel.findOne({username:uname},function(err,data){
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

  const signupdata = new signup_model({
     username : uname,
     password : pass
  });

  signupdata.save(function(err){
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
