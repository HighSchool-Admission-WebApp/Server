const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyparser.urlencoded({extended : true}));

//---------------Mongoose Set-up
 mongoose.connect("mongodb+srv://hsam:lXZkeArAfdvRoqmG@cluster0.7ddj5.mongodb.net/HSAMDB?retryWrites=true&w=majority",{useNewUrlParser:true });

//mongoose.connect("mongodb://localhost:27017/HSAMDB",{useNewUrlParser:true });

const Routes = require(__dirname + "/routes/routes.js")

Routes(app);

app.listen("8000",function(){
   console.log("your server stared on port 8000");
});
