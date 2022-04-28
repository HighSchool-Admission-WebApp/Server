const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyparser.urlencoded({extended : true}));

//---------------Mongoose Set-up
 mongoose.connect("mongodb+srv://HSAM:HSAM_123@cluster0.x4isl.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });

const Routes = require(__dirname + "/routes/Studentroutes.js")

Routes(app);

app.listen("8080",function(){
   console.log("your server stared on port 8080");
});
