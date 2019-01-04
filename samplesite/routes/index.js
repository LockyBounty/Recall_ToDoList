var express = require('express');
var router = express.Router();
let mongodb = require("mongodb");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){
  let MongoClient = mongodb.MongoClient;
  
  var url= 'mongodb://localhost:27017/samplesite';
  MongoClient.connect(url, function(err, db){
    if(err){

      console.log(unable to connect)
    }else{
      console.log('Connection established');
    }
  })
});

module.exports = router;
