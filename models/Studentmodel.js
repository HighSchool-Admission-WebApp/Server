const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
  UID : {
    type : String
  },
   Name : {
     type : String,
   },
   DOB : {
     type: String,
   },
   Gender :{
     type : String,
   },
   MobileNo : {
     type : String,
   },
   Email : {
     type : String,
   },
   FatherName : {
     type : String,
   },
   FatherMobile : {
     type : String,
   },
   Address : {
     type : String,
   },
   SchoolName :{
     type : String,
   },
   TenthMarks :{
     type : Number,
   },
   TenthMarksheet : {
     type : String,
   },
   LeavingCertificate : {
     type : String,
   },
   Program : {
     type : String,
   },
   Cast : {
     type : String,
   },
   CastCertificate :{
     type : String,
   },
   AnnualIncome : {
     type : String,
   },
   incomeCertificate:{
     type : String,
   }
});


const docmodel = mongoose.model("Studentdoc",docSchema);

module.exports = docmodel;
