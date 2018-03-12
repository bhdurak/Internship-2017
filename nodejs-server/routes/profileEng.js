var express = require('express');
var router = express.Router();
var multer = require('multer');

//exec is for executing commands, to make it synchronous and wait for output,
//we use execSync
var execSync = require('child_process').execSync;
var finalName = "";   //the finalname of the uploaded file
 fn = "";

child = "";     //to store output

//the storage details
var storage = multer.diskStorage({
  //upload destination (in a folder named uploads in the same directory)
  destination: function (req, file, cb) {
    cb(null, '../neuraltalk2-master/vis/imgs')
  },
  //the name of the saved file after upload
  filename: function (req, file, cb) {
   //finalname is taken from the fileName member of upload options from ionic app's camera page.
    //using date, each picture will have unique name.
    //Encoding specified as png in Camera options in ionic app's camera page therefore extension is .png
    this.finalName = file.originalname+ Date.now() + '.jpg'
    fn = this.finalName;
    cb(null, this.finalName)

    //to execute python command , child is output

    //If no cd, it's the folder of app.js
    
  }
})
//Upload fnc with key 'image'
var uploadEng = multer({ storage: storage }).single('image-Eng');

//upload post request handler
//since we upload to the profile page '/' is used. Current page.
router.post('/', function (req, res) {
  //console.log("ret: " + this.ret);
  uploadEng(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      var empty = execSync('cd ../neuraltalk2-master/vis/imgs && rm '+fn)
      var hata = execSync('cd ../ && echo Bad Image Error: '+err+' >> log.txt')
      return
    }
    child = execSync('cd ../neuraltalk2-master && th eval.lua -model ./model/model_id1-501-1448236541.t7_cpu.t7 -image_folder ./vis/imgs/ -num_images 1 -gpuid -1')
      console.log(child.toString())  
    res.json({
      //The json formatted response.
      //child (the output of Python program sent as response) after being cast to String
      
      message:child.toString(),
    });
    // Everything went fine
    var empty = execSync('cd ../neuraltalk2-master/vis/imgs && mv '+fn+' z')

  })
})


//important export.
module.exports = router;
