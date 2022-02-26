
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
