const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
  UID : {
    type : String
  },
   Name : {
     type : String,
   },
   Email : {
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
   CastCertificate :{
     type : String,
   },
   incomeCertificate:{
     type : String,
   }
});


const docmodel = mongoose.model("Studentdoc",docSchema);

module.exports = docmodel;
