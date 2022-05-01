const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


//---------------Mongoose Set-up
 mongoose.connect("mongodb+srv://HSAM:HSAM_123@cluster0.x4isl.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });

const Studentroutes = require("./routes/Studentroutes.js")
const Adminroutes = require("./routes/Adminroutes.js");


app.use("/poststudentinfo", express.static("Middleware/Uploads"));
app.use(bodyparser.urlencoded({extended : false}));
app.use(cors());

app.use("/adminlogin",Adminroutes);
app.use("/getstudentdata",Adminroutes);
app.use("/getstudentinfo",Studentroutes);
app.use("/poststudentinfo",Studentroutes);
//app.use("/deletestudentinfo",Studentroutes);


app.listen("8080",function(){
   console.log("your server stared on port 8080");
});
