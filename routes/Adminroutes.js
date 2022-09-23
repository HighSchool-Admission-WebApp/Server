require('dotenv').config();

const express = require("express");
const router = express.Router();
const adminmodel = require("../models/Adminmodel");
const Studentmodel = require("../models/Studentmodel.js");
const acceptmodel = require("../models/Accepedtstudent.js");
const rejectmodel = require("../models/Rejectedstudent.js");
const mailer = require("../middleware/nodemailer.js");
const AcceptText = require("../MailMessage/acceptmessage.js");
const RejectText = require("../MailMessage/rejectmessage.js");

// Get All Students Route
router.get("/getAllStudents", (req, res) => {
    Studentmodel.find({}, (err, result) => {
        if (!err) {
            if (result) {
                res.json(
                    result
                );
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

// Get Accepted and Rejected Students Routes
router.get("/getallacceptedstudents", (req, res) => {
    acceptmodel.find({}, (err, result) => {
        if (!err) {
            if (result) {
                res.json(
                    result
                );
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


router.get("/getallrejectedstudents", (req, res) => {
    rejectmodel.find({}, (err, result) => {
        if (!err) {
            if (result) {
                res.json(
                    result
                );
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


// Get Students with uid
router.route("/getStudent/:id")
    .get((req, res) => {
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
    });


// Get Rejected Students with uid

    router.route("/getrejectedstudent/:id")
    .get((req, res) => {
        console.log("id ->rejected")
        rejectmodel.findOne({ UID: req.params.id }, (err, data) => {
            console.log(req.params.id);
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
    });
    



//Hsam-admin Login
router.post("/hsam-admin", (req, res) => {
    adminmodel.findOne({ UID: req.body.UID }, (err, result) => {
        if (result) {
            res.json({
                msg: "True"
            })
            console.log("Login Sucessfully!");
        } else {
            res.json({
                msg: "False"
            })
            console.log("Invalid username or password");
        }
    });
});


//Accepte is Students Route

router.post("/student/accept", (req, res) => {
    // console.log(req.body.UID);
    Studentmodel.findOne({ UID: req.body.UID }, (err, Data) => {
        if (!err) {
            if (Data) {
                console.log(Data.UID);
                acceptmodel.findOne({ UID: req.body.UID }, (err, result) => {
                    if (!result) {
                        const acceptstud = new acceptmodel({ 
                            UID: Data.UID,
                            Name: Data.Name,
                            DOB: Data.DOB,
                            Gender: Data.Gender,
                            MobileNo: Data.MobileNo,
                            Email: Data.Email,
                            FatherName: Data.FatherName,
                            FatherMobile: Data.FatherMobile,
                            Address: Data.Address,
                            SchoolName: Data.SchoolName,
                            TenthMarks: Data.TenthMarks,
                            TenthMarksheet: Data.TenthMarksheet,
                            LeavingCertificate: Data.LeavingCertificate,
                            Program : Data.Program,
                            Cast: Data.Cast,
                            CastCertificate: Data.CastCertificate,
                            AnnualIncome: Data.AnnualIncome,
                            incomeCertificate: Data.incomeCertificate,
                        });

                        acceptstud.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                var mailOptions = {
                                    from: process.env.USER,
                                    to: Data.Email,
                                    subject: 'Application Accepted',
                                    text: AcceptText,
                                };

                                mailer.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                res.json({
                                    state:true
                                })
                                console.log("Save");
                            }
                        });
                    }

                })
            } else {
                res.json({
                    state:false
                })
            }
        } else {
            res.json({
                state:false
            })
            console.log(err);
        }
    });

    Studentmodel.deleteOne({ UID: req.body.UID }, (err) => {
        if (!err) {
            console.log("Data Remove!");
        } else {
            console.log(err);
        }
    });
});



//Students is rejected Route

router.post("/student/reject", (req, res) => {

    Studentmodel.findOne({ UID: req.body.UID }, (err, Data) => {
        if (!err) {
            if (Data) {
                 console.log(Data);
                rejectmodel.findOne({ UID: req.body.UID }, (err, data) => {
                    if (!data) {
                        const rejectstud = new rejectmodel({
                            UID: Data.UID,
                            Name: Data.Name,
                            DOB: Data.DOB,
                            Gender: Data.Gender,
                            MobileNo: Data.MobileNo,
                            Email: Data.Email,
                            FatherName: Data.FatherName,
                            FatherMobile: Data.FatherMobile,
                            Address: Data.Address,
                            SchoolName: Data.SchoolName,
                            TenthMarks: Data.TenthMarks,
                            TenthMarksheet: Data.TenthMarksheet,
                            LeavingCertificate: Data.LeavingCertificate,
                            Program : Data.Program,
                            Cast: Data.Cast,
                            CastCertificate: Data.CastCertificate,
                            AnnualIncome: Data.AnnualIncome,
                            incomeCertificate: Data.incomeCertificate,
                        });

                        rejectstud.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                var mailOptions = {
                                    from: process.env.USER,
                                    to: Data.Email,
                                    subject: 'Application Rejected',
                                    text: RejectText
                                };

                                mailer.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                res.json({
                                    state:true
                                })
                                console.log("Save");
                            }
                        });
                    }
                });
            } else {
                res.json({
                    state:false
                })
            }
        } else {
            res.json({
                state:false
            })
            console.log(err);
        }
    });

    Studentmodel.deleteOne({ UID: req.body.UID }, (err) => {
        if (!err) {
            console.log("Data Remove!");
        } else {
            console.log(err);
        }
    });

});


module.exports = router;
