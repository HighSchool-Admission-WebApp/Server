const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyparser.urlencoded({extended : true}));


//---------------Mongoose Set-up
//mongoose.connect("mongodb+srv://hsam:lXZkeArAfdvRoqmG@cluster0.7ddj5.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });

mongoose.connect("mongodb+srv://Admin_Aditya:123-aditya@cluster0.qxxwb.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser : true});

const signupSchema = {
    email : {
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

    const email = req.body.email;
    const password = req.body.password;

    signupmodel.findOne({email:email},function(err,founduser){
      if(err){
        console.log(err);
      }else{
        if(!founduser){
         console.log("Signup first!");
        }else{
          bcrypt.compare(password,founduser.password,function(err,result){
              if(result==true){
                console.log("Login Sucessfully!");
              }else{
                console.log("Wrong Password!");
              }
          });
        }
      }

    });

});



//--------------Sign-up Route
app.post("/studentsignup",function(req,res){

  const email = req.body.email;
  //const password = req.body.password;

    bcrypt.hash(req.body.password,saltRounds,function(err,hash){
      const signupdata = new signupmodel({
         email : email,
         password : hash
      });

      signupdata.save(function(err){
        if(!err){
          console.log("Data Added Sucessfully!");
        }else{
          console.log(err);
        }
      });
    });

});



app.listen("8000",function(){
   console.log("your server stared on port 8000");
});
