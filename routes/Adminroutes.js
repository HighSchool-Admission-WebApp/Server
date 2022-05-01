const express = require("express");
const router = express.Router();
const adminmodel = require("../models/Adminmodel");
const Studentmodel = require("../models/Studentmodel.js");

router.get("/", (req, res) => {
   Studentmodel.find({},(err,result)=>{
      if(!err){
          if(result){
            res.status(200).send({
                result
             });
             console.log(result);
          }else{
            res.status(403).send({
                msg : "No any Student Data Found!"
             });
          }
      }else{
        res.status(400).send({
            msg : "Something went wrong !Pls Try Agian Later"
         });
      }
   });
});

router.post("/", (req, res) => {
    
    adminmodel.findOne({Email:req.body.Email, Password:req.body.Password}, (err, result) => {
        if (result) {
            res.status(200).send({
                ID : result._id,
                msg : "Valid Username And Password"
            });
            console.log("Login Sucessfully!");
        }else{
            res.status(401).send({
                msg : "Invalid Username Or Password"
            });
            console.log("Invalid username or password");
        }
      });
});

module.exports = router;