const express = require("express");
const router = express.Router();
const adminmodel = require("../models/Adminmodel");
const Studentmodel = require("../models/Studentmodel.js");

router.get("/getAllStudents", (req, res) => {
    Studentmodel.find({}, (err, result) => {
        if (!err) {
            if (result) {
                res.json(
                    result
                );
                // console.log(result);
            } else {
                res.json({
                    msg: "No any Student Data Found!"
                });
            }
        } else {
            res.json({
                msg: "Something went wrong !Pls Try Agian Later"
            });
        }
    });
});


router.route("/getStudent/:id")
    .get((req, res) => {
        // console.log(req.params.id)
        Studentmodel.findOne({ UID: req.params.id }, (err, data) => {
            if (!err) {
                if (data) {
                    res.json({
                        StudentData: data,
                        msg: "Sucess"
                    });
                } else {
                    res.json({
                        msg: "No Student Found in database!"
                    })
                }
            } else {
                res.json({
                    msg: "Error in database! try agian"
                });
                console.log(err);
            }
        });
    })

router.post("/hsam-admin", (req, res) => {
    // console.log(req)
    adminmodel.findOne({ Email: req.body.email, Password: req.body.password }, (err, result) => {
        console.log(req.body)
        if (result) {
            // res.status(200).send({
            //     ID : result._id,
            //     msg : "Valid Username And Password"
            // });
            res.json({
                Id: result._id,
                msg: "valid usrname and password"
            })
            console.log("Login Sucessfully!");
        } else {
            // res.status(401).send({
            //     msg : "Invalid Username Or Password"
            // });
            res.json({
                Id: null,
                msg: "Invalid username or password"
            })
            console.log("Invalid username or password");
        }
    });
});

module.exports = router;
