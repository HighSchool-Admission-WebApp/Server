const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyparser.urlencoded({extended : true}));


//---------------Mongoose Set-up
mongoose.connect("mongodb+srv://hsam:lXZkeArAfdvRoqmG@cluster0.7ddj5.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });

//----------------------studentsignup schema & model
const signupSchema = {
    email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    unique : true

  }
}

const signupmodel = mongoose.model("studentsignupdata",signupSchema);


//----------------------adminlogin schema & model

const adminSchema = {
   email : {
    type : String,
  },
  password :{
    type : String,
  }
}

const adminmodel = mongoose.model("adminlogindata",adminSchema);


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

//---------------------Admin login

app.post("/adminlogin",function(req,res){
   const email = req.body.email;
   const password = req.body.password;

  adminmodel.findOne({email:email},function(err,founddata){
    if(err){
      console.log(err);
    }else{
      if(founddata){
         bcrypt.compare(password,founddata.password,function(err,result){
           if(err){
             console.log(err);
           }else{
             if(result==true){
               console.log("Admin login Sucessfully");
             }else{
               console.log("Incorrect username or password");
             }
           }
         });
      }else{
        console.log("notfound admin!");
      }
    }
  });

});



app.listen("8000",function(){
   console.log("your server stared on port 8000");
});
