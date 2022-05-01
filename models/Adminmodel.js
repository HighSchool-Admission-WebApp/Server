const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
   Email:{
       type : String,
       required:true
   },
   Password:{
       type : String,
       required:true
   }
});

const Adminmodel = mongoose.model("Admindata",AdminSchema);

module.exports = Adminmodel;