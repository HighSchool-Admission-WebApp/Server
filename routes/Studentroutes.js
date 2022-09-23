require('dotenv').config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Studentmodel = require("../models/Studentmodel.js");
const upload = require("../middleware/documents.js");
const acceptmodel = require("../models/Accepedtstudent.js");
const rejectmodel = require("../models/Rejectedstudent.js");

router.route("/:id")
  .get((req, res) => {
    console.log(req.params.id);
    Studentmodel.findOne({ UID: req.params.id }, (err, data) => {
      if (!err) {
        if (data) {
          res.json({
            StudentData: data,
            state: "No Action"
          });
          console.log("Sucess");
        }else{
          acceptmodel.findOne({ UID: req.params.id }, (err, data) => {
            if (data) {
              res.json({
                StudentData: data,
                state: "Accepted"
              });
              console.log("Sucess!");
            }else{
              rejectmodel.findOne({ UID: req.params.id }, (err, data) => {
                if (data) {
                  res.json({
                    StudentData: {
                         UID :"",
                         Name :"",
                         DOB :"",
                         Gender :"",
                         MobileNo :"",
                         Email :"",
                         FatherName :"",
                         FatherMobile :"",
                         Address :"",
                         SchoolName :"",
                         TenthMarks :"",
                         TenthMarksheet :"",
                         LeavingCertificate :"",
                         Program :"",
                         Cast :"",
                         CastCertificate :"",
                         AnnualIncome :"",
                         incomeCertificate:"",
                      },
                      state:"Rejected"
                  });
                  console.log("Sucess!");
                }else{
                  res.json({
                    state:""
                  });
                }
            });
          }
        });
      }
      }else {
        res.json({
          msg: "Error in database! try agian"
        });
        console.log(err);
      }
    });
  });


router.route("/")
  .post(upload.fields([{ name: "markSheet10th" }, { name: "incomeCertificate" }, { name: "castCertificate" }, { name: "leavingCertificate" }]), (req, res) => {

    var tenthmarksheet;
    var incomeCertificate;
    var castCertificate;
    var leavingCertificate;


    Studentmodel.findOne({ UID: req.body.uid }, (err, result) => {
      if (!result) {
        console.log("user not found");

        if (req.files) {

          tenthmarksheet = req.files.markSheet10th;
          incomeCertificate = req.files.incomeCertificate;
          castCertificate = req.files.castCertificate;
          leavingCertificate = req.files.leavingCertificate;

          if (tenthmarksheet != undefined && incomeCertificate != undefined && leavingCertificate != undefined) {
            tenthmarksheet.forEach(element => {
              tenthmarksheet = element.filename;
            });
            
            incomeCertificate.forEach(element => {
              incomeCertificate = element.filename;
            });

            leavingCertificate.forEach(element => {
              leavingCertificate = element.filename;
            });

          }

          if (req.body.cast != "open") {
            if (castCertificate != undefined) {
              castCertificate.forEach(element => {
                castCertificate = element.filename;
              });
            }
          } else {
            castCertificate = "NULL";
          }
        } else {
          res.json({
            msg: "Please Select All Required Files!"
          })
        }

        const data = new Studentmodel({
          UID: req.body.uid,
          Name: req.body.name,
          DOB: req.body.birthDate,
          Gender: req.body.gender,
          MobileNo: req.body.studentMobNo,
          Email: req.body.email,
          FatherName: req.body.fatherName,
          FatherMobile: req.body.fatherMobNo,
          Address: req.body.address,
          SchoolName: req.body.schoolName,
          TenthMarks: req.body.marks10th,
          TenthMarksheet: tenthmarksheet,
          LeavingCertificate: leavingCertificate,
          Program : req.body.program,
          Cast: req.body.cast,
          CastCertificate: castCertificate,
          AnnualIncome: req.body.annualIncome,
          incomeCertificate: incomeCertificate,
        });
     console.log(req.body.program);
        data.save((err) => {
          if (!err) {
            res.json({
              msg: "UserData Uploaded Sucessfully"
            });
            console.log("Data Uploaded Sucessfully!");
          } else {
            res.json({
              msg: "Somthing went wrong try agian!"
            });
            console.log(err);
          }
        });
      } else {
        console.log("by");
        if (req.files) {
          tenthmarksheet = req.files.markSheet10th;
          incomeCertificate = req.files.incomeCertificate;
          castCertificate = req.files.castCertificate;

          if (tenthmarksheet != undefined) {
            tenthmarksheet.forEach(element => {
              tenthmarksheet = element.filename;
            });
          }

          if (incomeCertificate != undefined) {
            incomeCertificate.forEach(element => {
              incomeCertificate = element.filename;
            });
          }

          if (leavingCertificate != undefined) {
            leavingCertificate.forEach(element => {
              leavingCertificate = element.filename;
            });
          }

          if (req.body.cast != "open") {
            if (castCertificate != undefined) {
              castCertificate.forEach(element => {
                castCertificate = element.filename;
              });
            }
          } else {
            castCertificate = "NULL";
          }

        }
        let data = {
          $set: {
            UID: req.body.uid,
            Name: req.body.name,
            DOB: req.body.birthDate,
            Gender: req.body.gender,
            MobileNo: req.body.studentMobNo,
            Email: req.body.email,
            FatherName: req.body.fatherName,
            FatherMobile: req.body.fatherMobNo,
            Address: req.body.address,
            SchoolName: req.body.schoolName,
            TenthMarks: req.body.marks10th,
            TenthMarksheet: tenthmarksheet,
            LeavingCertificate: leavingCertificate,
            Program : req.body.program,
            Cast: req.body.cast,
            CastCertificate: castCertificate,
            AnnualIncome: req.body.annualIncome,
            incomeCertificate: incomeCertificate,
          }
        };
        Studentmodel.updateMany({ UID: req.body.uid }, data, (err, result) => {
          if (!err) {
            res.json({
              msg: "User Updated Sucessfully"
            });
            console.log("User Updated Sucessfully!");
          } else {
            res.json({
              msg: "Somthing went wrong try agian!"
            });
            console.log(err);
          }
        });
      }
    });


  });


module.exports = router;

