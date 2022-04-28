const multer = require("multer");

const storage = multer.diskStorage({
   destination : function(req, file, cb){
     cb(null, "./Uploads");
   },
   filename : function(req, file, cb){
     cb(null, Date.now()+"-"+file.originalname);
   }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png","application/pdf"];
  if(allowedFileTypes.includes(file.mimetype)) {
    console.log("true");
      cb(null, true);
  } else {
      console.log("false");
      cb(null, false);
  }
}

const upload = multer({
   storage,fileFilter
});

module.exports = upload;
