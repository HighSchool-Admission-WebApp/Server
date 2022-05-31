const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    UID : {
        type : String
    }
});

const Adminmodel = mongoose.model("Admindata",AdminSchema);

module.exports = Adminmodel;