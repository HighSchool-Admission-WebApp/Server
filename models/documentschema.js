const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
   Name : {
     type : String,
   },
   DOB : {
     type : Date,
   },
   Address : {
     type : String,
   },
   Mobile_No :{
     type : Number,
     maxLength:10,
     minLength:10
   },
   Tenth_Marks :{
     type : Number,
   },
   Profile : {
     type : String,
   },
   Cast_Certificate :{
     type : String,
   },
   Tenth_Marksheet:{
     type : String,
   },
   Tenth_LC:{
     type : String,
   },
   Domicile_Certificate:{
     type : String,
   }
});


const docmodel = mongoose.model("StudentDoc",docSchema);

module.exports = docmodel;
