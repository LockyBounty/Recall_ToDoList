var express = require('express');
var router = express.Router();
let mongodb = require("mongodb");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//function req= request, res= response
router.get('/thelist', function(req, res){
  let MongoClient = mongodb.MongoClient;
  
  var url= 'mongodb://localhost:27017/samplesite';

  MongoClient.connect(url, function(err, db){
    if(err){

      console.log('unable to connect');
    }else{
      console.log('Connection established');

      let collection = db.collection('students');
      collection.find({}).toArray(function(err, result){
        if(err){
          res.send(err);

        }else if(result.length){
          res.render('studentlist',{
            "studentlist": result
          });
        } else {
          res.send('No document found Bitch!');
        }
        db.close();
      });
    }
  })
});

//dans newstudent.jade qu'on doit creer dans dossier views
router.get('/newstudent', function(req, res){
  res.render('newstudent',{title:'Add Student Bitch'})
}
);

module.exports = router;
