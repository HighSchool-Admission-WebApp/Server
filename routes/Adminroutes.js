require('dotenv').config();

const express = require("express");
const router = express.Router();
const adminmodel = require("../models/Adminmodel");
const Studentmodel = require("../models/Studentmodel.js");
const acceptmodel = require("../models/Accepedtstudent.js");
const rejectmodel = require("../models/Rejectedstudent.js");
const mailer = require("../middleware/nodemailer.js");
const AcceptText = require("../MailMessage/acceptmessage.js");
const RejectText = require("../MailMessage/rejectmessage.js")

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
            res.json({
                Id: result._id,
                msg: "valid usrname and password"
            })
            console.log("Login Sucessfully!");
        } else {
            res.json({
                Id: null,
                msg: "Invalid username or password"
            })
            console.log("Invalid username or password");
        }
    });
});

router.post("/student/accept", (req, res) => {
    // console.log(req.body.UID);
    Studentmodel.findOne({ UID: req.body.UID }, (err, Data) => {
        if (!err) {
            if (Data) {
                console.log(Data.UID);
                acceptmodel.findOne({ UID: req.body.UID }, (err, result) => {
                    if (!result) {
                        const acceptstud = new acceptmodel({
                            UID: req.body.uid,
                            Name: req.body.name,
                            DOB: req.body.birthDate,
                            Gender: req.body.gender,
                            MobileNo: req.body.studentMobNo,
                            Email: req.body.email,
                            FatherName: req.body.fatherName,
                            FatherMobile: req.body.fatherMobNo,
                            Address: req.body.address,
                            SchoolName: req.body.schoolName,
                            TenthMarks: req.body.marks10th,
                            TenthMarksheet: tenthmarksheet,
                            LeavingCertificate: leavingCertificate,
                            Cast: req.body.cast,
                            CastCertificate: castCertificate,
                            AnnualIncome: req.body.annualIncome,
                            incomeCertificate: incomeCertificate,
                        });

                        acceptstud.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                var mailOptions = {
                                    from: process.env.USER,
                                    to: Data.Email,
                                    subject: 'Application Accepted',
                                    text: AcceptText
                                };

                                mailer.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                                console.log("Save");
                            }
                        });
                    }

                })
            } else {
                res.json({
                    mag: "Studnet Not Found"
                });
            }
        } else {
            res.json({
                msg: "error in database!"
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

router.post("/student/reject", (req, res) => {

    Studentmodel.findOne({ UID: req.body.UID }, (err, Data) => {
        if (!err) {
            if (Data) {
                //  console.log(Data);
                rejectmodel.findOne({ UID: req.body.UID }, (err, data) => {
                    if (!data) {
                        // console.log(Data.Name);
                        const rejectstud = new rejectmodel({
                            UID: req.body.uid,
                            Name: req.body.name,
                            DOB: req.body.birthDate,
                            Gender: req.body.gender,
                            MobileNo: req.body.studentMobNo,
                            Email: req.body.email,
                            FatherName: req.body.fatherName,
                            FatherMobile: req.body.fatherMobNo,
                            Address: req.body.address,
                            SchoolName: req.body.schoolName,
                            TenthMarks: req.body.marks10th,
                            TenthMarksheet: tenthmarksheet,
                            LeavingCertificate: leavingCertificate,
                            Cast: req.body.cast,
                            CastCertificate: castCertificate,
                            AnnualIncome: req.body.annualIncome,
                            incomeCertificate: incomeCertificate,
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
                                console.log("Save");
                            }
                        });
                    }
                });
            } else {
                res.json({
                    mag: "Studnet Not Found"
                })
            }
        } else {
            res.json({
                msg: "error in database!"
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
