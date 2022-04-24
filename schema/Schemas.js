<<<<<<< HEAD
const mongoose = require("mongoose");

//----------------------studentsignup schema
const signupSchema = {
    email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    unique : true

  }
}


module.exports.studentsignup = mongoose.model("studentsignupdata",signupSchema);



//----------------------adminlogin schema

const adminSchema = {
   email : {
    type : String,
  },
  password :{
    type : String,
  }
}

module.exports.adminlogin = mongoose.model("adminlogindata",adminSchema);
=======
const mongoose = require("mongoose");

//----------------------studentsignup schema
const signupSchema = {
    email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    unique : true

  }
}


module.exports.studentsignup = mongoose.model("studentsignupdata",signupSchema);



//----------------------adminlogin schema

const adminSchema = {
   email : {
    type : String,
  },
  password :{
    type : String,
  }
}

module.exports.adminlogin = mongoose.model("adminlogindata",adminSchema);
>>>>>>> 87b54d0 (First commit)
