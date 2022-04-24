<<<<<<< HEAD
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
=======
<<<<<<< HEAD
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
=======
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const multer = require("multer");
const docmodel = require("./models/documentschema.js");
const upload = require("./middleware/documents.js");
const router = require("./Routes/routes.js");
var cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || "8080";

app.use(bodyparser.urlencoded({ extended: true }));
app.use("/poststudentinfo", express.static("Middleware/Uploads"));

//--------------Atlas Connection
mongoose.connect("mongodb+srv://HSAM:Pass_123@cluster0.x4isl.mongodb.net/HSAMDB?retryWrites=true&w=majority", { useNewUrlParser: true });

router(app);

app.listen((port), (req, res) => {
  console.log("Server started on " + port);
});


>>>>>>> 52ff412 (Handel api request)
>>>>>>> 87b54d0 (First commit)
