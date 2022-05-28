const express = require("express");
const router = express.Router();
const adminmodel = require("../models/Adminmodel");
const Studentmodel = require("../models/Studentmodel.js");
const acceptmodel = require("../models/Accepedtstudent.js");
const rejectmodel = require("../models/Rejectedstudent.js");
const mailer = require("../middleware/nodemailer.js");

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
                acceptmodel.findOne({ UID: req.body.UID}, (err, result) => { 
                        if (!result) {  
                            const acceptstud = new acceptmodel({
                                UID: Data.UID,
                                Name: Data.Name,
                                DOB: Data.DOB,
                                Gender: Data.Gender,
                                Email: Data.Email,
                                Address: Data.Address,
                                SchoolName: Data.SchoolName,
                                TenthMarks: Data.TenthMarks,
                                TenthMarksheet: Data.TenthMarksheet,
                                Cast: Data.Cast,
                                CastCertificate: Data.CastCertificate,
                                incomeCertificate: Data.incomeCertificate,
                            });
    
                            acceptstud.save((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    var mailOptions = {
                                        from: 'hsadmissionmanagement@gmail.com',
                                        to: Data.Email,
                                        subject: 'Application Accepted',
                                        text: `Hello!
                                        Thank you for applying for admission through admission management system. We are happy to inform you that your application has been accepted in our highschool.
                                        You will have to visit the college with original documents for further process of admission before 27th May 2022
                                        We wish you the best and look forward interacting with you.
                                
                                        Regards
                                        HSAM`
                                      };
                                      
                                      mailer.sendMail(mailOptions, function(error, info){
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
                            UID: Data.UID,
                            Name: Data.Name,
                            DOB: Data.DOB,
                            Gender: Data.Gender,
                            Email: Data.Email,
                            Address: Data.Address,
                            SchoolName: Data.SchoolName,
                            TenthMarks: Data.TenthMarks,
                            TenthMarksheet: Data.TenthMarksheet,
                            Cast: Data.Cast,
                            CastCertificate: Data.CastCertificate,
                            incomeCertificate: Data.incomeCertificate,
                        });

                        rejectstud.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                var mailOptions = {
                                    from: 'hsadmissionmanagement@gmail.com',
                                    to: Data.Email,
                                    subject: 'Application Rejected',
                                    text: `Hello!
                                    Thank you for applying for admission through admission management system. We are sorry to inform you that your application has been REJECTED in our highschool.
                                    We wish you the best for your future applications and you can reapply for CAP-2 before 27th May 2022
                                    
                                    Regards
                                    HSAM`
                                  };
                                  
                                  mailer.sendMail(mailOptions, function(error, info){
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
