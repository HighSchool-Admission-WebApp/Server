
module.exports = function (app) {

  const express = require("express");
  const mongoose = require("mongoose");
  const bodyparser = require("body-parser");
  const multer = require("multer");
  const cors = require("cors");
  const docmodel = require("../models/Studentmodel.js");
  const upload = require("../middleware/documents.js");

  app.use("/poststudentinfo", express.static("Middleware/Uploads"));
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(cors());
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


  app.route("/poststudentinfo")
  .post(upload.fields([{ name: "markSheet10th" }, { name: "incomeCertificate" }, { name: "castCertificate" }]), (req, res) => {
    console.log(req.body);

    if (req.files) {
      let tenthmarksheet = req.files.markSheet10th;
      let incomeCertificate = req.files.incomeCertificate;
      let castCertificate = req.files.castCertificate;

      tenthmarksheet.forEach(element => {
        tenthmarksheet = element.filename;
      });

      incomeCertificate.forEach(element => {
        incomeCertificate = element.filename;
      });

      castCertificate.forEach(element => {
        castCertificate = element.filename;
      });


      const data = new docmodel({
        UID : req.body.uid,
        Name: req.body.name,
        Email : req.body.email,
        Address: req.body.address,
        SchoolName : req.body.schoolName,
        TenthMarks: req.body.marks10th,
        TenthMarksheet: tenthmarksheet,
        CastCertificate: castCertificate,
        incomeCertificate: incomeCertificate,
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
