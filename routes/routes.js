
module.exports = function(app){

const bcrypt = require("bcrypt");
const saltRounds = 10;


const Schemas = require("../schema/Schemas.js");

//----------------------studentsignup model
const studentsignupmodel = Schemas.studentsignup;

//----------------------adminlogin model
const adminloginmodel = Schemas.adminlogin;


//-------------Login Route

app.post("/studentlogin",function(req,res){

    const email = req.body.email;
    const password = req.body.password;

    studentsignupmodel.findOne({email:email},function(err,founduser){
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
      const signupdata = new studentsignupmodel({
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

  adminloginmodel.findOne({email:email},function(err,founddata){
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


}

module.exports = function(app){

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const multer = require("multer");
const docmodel = require("../models/documentschema.js");
const upload = require("../middleware/documents.js");


app.use("/poststudentinfo", express.static("Middleware/Uploads"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
  });
  
  
  
  app.get("/getstudentinfo",(req,res) => {
     docmodel.find({},(err,data) => {
       if(!err){
         console.log(data);
       }else{
         console.log(err);
       }
     });
  });


  // app.post("/poststudentinfo",upload.single("file"),(req,res)=>{
  //    console.log(req.body);
  //    console.log(req.files);
  // });
  
  app.post("/poststudentinfo", upload.fields([{ name: "file" }, { name: "cast_certificate" },{name:"tenth_marksheet"},{name:"tenth_lc"},{name:"domicile"}]), (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.files.file);

    if (req.files) {
      let profile = req.files.file;
      let cast_cert = req.files.cast_certificate;
      let tenth_marksheet = req.files.tenth_marksheet;
      let tenth_lc = req.files.tenth_lc;
      let domicile = req.files.domicile;
  
      profile.forEach(element => {
        profile = element.filename;
      });
  
      cast_cert.forEach(element => {
        cast_cert = element.filename;
      });
      
      tenth_marksheet.forEach(element =>{
        tenth_marksheet = element.filename;
      });
  
      tenth_lc.forEach(element =>{
        tenth_lc = element.filename;
      });
  
      domicile.forEach(element =>{
        domicile = element.filename;
      });
  
      const data = new docmodel({
        name: req.body.name,
        DOB: req.body.dob,
        Address: req.body.address,
        Mobile_No: req.body.mobile,
        Tenth_Marks : req.body.tenth_marks,
        Profile: profile,
        Cast_Certificate: cast_cert,
        Tenth_Marksheet: tenth_marksheet,
        Tenth_LC: tenth_lc,
        Domicile_Certificate: domicile
      });
  
      data.save((err) => {
        if (!err) {
          console.log("sucess!");
        } else {
          console.log(err);
        }
      });
    } else {
      console.log("select files");
    }
  
  });

}
