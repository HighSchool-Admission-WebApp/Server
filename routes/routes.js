const { findById } = require("../models/documentschema.js");

module.exports = function (app) {

  const express = require("express");
  const mongoose = require("mongoose");
  const bodyparser = require("body-parser");
  const multer = require("multer");
  const docmodel = require("../models/documentschema.js");
  const upload = require("../middleware/documents.js");


  app.use("/poststudentinfo", express.static("Middleware/Uploads"));
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(express.json());


  app.route("/")
  .get((req, res) => {
    res.sendFile(__dirname + "/form.html");
  });


app.route("/getstudentinfo")
  .get((req, res) => {
    docmodel.find({}, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  })

  // app.post("/poststudentinfo",upload.single("file"),(req,res)=>{
  //    console.log(req.body);
  //    console.log(req.files);
  // });

  app.route("/poststudentinfo")
  .post(upload.fields([{ name: "profile" }, { name: "cast_certificate" }, { name: "tenth_marksheet" }, { name: "tenth_lc" }, { name: "domicile" }]), (req, res) => {
    console.log(req.body.name);
   // console.log(req.body.email);
    //console.log(req.files.file);

    if (req.files) {
      let profile = req.files.profile;
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

      tenth_marksheet.forEach(element => {
        tenth_marksheet = element.filename;
      });

      tenth_lc.forEach(element => {
        tenth_lc = element.filename;
      });

      domicile.forEach(element => {
        domicile = element.filename;
      });

      const data = new docmodel({
        Name: req.body.name,
        DOB: req.body.dob,
        Address: req.body.address,
        Mobile_No: req.body.mobile,
        Tenth_Marks: req.body.tenth_marks,
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

  app.route("/deletestudentinfo/:id")
  .get((req,res)=>{
    //const id = "6266becab1350c2800ae4702";
    const id = (req.params.id);
     docmodel.findByIdAndDelete(id,(err,docs)=>{
      if(!err){
        console.log(docs);
      }else{
        console.log(err);
      }
     });
  });

}
