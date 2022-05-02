const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const Studentroutes = require("./routes/Studentroutes.js")
const Adminroutes = require("./routes/Adminroutes.js");


const app = express();


app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json()); 
app.use(cors());

//---------------Mongoose Set-up
 mongoose.connect("mongodb+srv://HSAM:HSAM_123@cluster0.x4isl.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });



app.use("/poststudentinfo", express.static("Middleware/Uploads"));
  


app.use("/admin",Adminroutes);
app.use("/getstudentdata",Adminroutes);
app.use("/getstudentinfo/:id",Studentroutes);
app.use("/poststudentinfo",Studentroutes);
//app.use("/deletestudentinfo",Studentroutes);


app.listen("8080",function(){
   console.log("your server stared on port 8080");
});
