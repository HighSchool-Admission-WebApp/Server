
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Studentmodel = require("../models/Studentmodel.js");
const upload = require("../middleware/documents.js");
const acceptmodel = require("../models/Accepedtstudent.js");
const rejectmodel = require("../models/Rejectedstudent.js");

router.route("/:id")
  .get((req, res) => {
    console.log(req.params.id)
    Studentmodel.find({ UID: req.params.id }, (err, data) => {
      if (!err) {
        if (data) {
          res.status(200).send({
            StudentData: data,
            msg: "Sucess"
          });
          console.log("Sucess!");
        } else {
          acceptmodel.find({ UID: req.params.id }, (err, data) => {
            if (data) {
              res.status(200).send({
                StudentData: data,
                msg: "Sucess"
              });
              console.log("Sucess!");
            } else {
              rejectmodel.find({ UID: req.params.id }, (err, data) => {
                if (data) {
                  res.status(200).send({
                    StudentData: data,
                    msg: "Sucess"
                  });
                  console.log("Sucess!");
                }
              });
            }
          });
        }
      } else {
        res.status(400).send({
          msg: "Error in database! try agian"
        });
        console.log(err);
      }
    });
  })


router.route("/")
  .post(upload.fields([{ name: "markSheet10th" }, { name: "incomeCertificate" }, { name: "castCertificate" },{ name: "leavingCertificate" }]), (req, res) => {

    console.log(req.body);
    let tenthmarksheet;
    let incomeCertificate;
    let castCertificate;
    let leavingCertificate;

    Studentmodel.findOne({ UID: req.body.uid }, (err, result) => {
      if (!result) {
        console.log("user not found");

        console.log(req.files.incomeCertificate);

        tenthmarksheet = req.files.markSheet10th;
        incomeCertificate = req.files.incomeCertificate;
        castCertificate = req.files.castCertificate;
        leavingCertificate = req.files.leavingCertificate;

        
        tenthmarksheet.forEach(element => {
          tenthmarksheet = element.filename;
        }); 

        incomeCertificate.forEach(element => {
          incomeCertificate = element.filename;
        });

        leavingCertificate.forEach(element=>{
          leavingCertificate = element.filename;
        });

        if (req.body.cast != "open") {
          castCertificate.forEach(element => {
            castCertificate = element.filename;
          });
        } else {
          castCertificate = "NULL";
        } 

        const data = new Studentmodel({
          UID: req.body.uid,
          Name: req.body.name,
          DOB: req.body.birthDate,
          Gender: req.body.gender,
          MobileNo:req.body.studentMobNo,
          Email: req.body.email,
          FatherName: req.body.fatherName,
          FatherMobile: req.body.fatherMobNo,
          Address: req.body.address,
          SchoolName: req.body.schoolName,
          TenthMarks: req.body.marks10th,
          TenthMarksheet: tenthmarksheet,
          LeavingCertificate: leavingCertificate,
          Cast: req.body.cast,
          CastCertificate: castCertificate,
          AnnualIncome: req.body.annualIncome,
          incomeCertificate: incomeCertificate,
        });

        data.save((err) => {
          if (!err) {
            res.status(200).send({
              msg: "UserData Uploaded Sucessfully"
            });
            console.log("Data Uploaded Sucessfully!");
          } else {
            res.status(500).send({
              msg: "Somthing went wrong try agian!"
            });
            console.log(err);
          }
        });
        console.log(req.body.fatherName);
      } else {

        if (req.files) {
          console.log("Hello");

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
            MobileNo:req.body.studentMobNo,
            Email: req.body.email,
            FatherName: req.body.fatherName,
            FatherMobile: req.body.fatherMobNo,
            Address: req.body.address,
            SchoolName: req.body.schoolName,
            TenthMarks: req.body.marks10th,
            TenthMarksheet: tenthmarksheet,
            LeavingCertificate: leavingCertificate,
            Cast: req.body.cast,
            CastCertificate: castCertificate,
            AnnualIncome: req.body.annualIncome,
            incomeCertificate: incomeCertificate,
          }
        };
        Studentmodel.updateMany({ UID: req.body.uid }, data, (err, result) => {
          if (!err) {
            res.status(200).send({
              msg: "User Updated Sucessfully"
            });
            console.log("User Updated Sucessfully!");
          } else {
            res.status(400).send({
              msg: "Somthing went wrong try agian!"
            });
            console.log(err);
          }
        });
      }
    });


  });

// router.route("/:id")
//   .get((req, res) => {
//     //const id = "6266becab1350c2800ae4702";
//     const id = (req.params.id);
//     Studentmodel.findByIdAndDelete(id, (err, docs) => {
//       if (!err) {
//         console.log(docs);
//       } else {
//         console.log(err);
//       }
//     });
//   });


module.exports = router;

