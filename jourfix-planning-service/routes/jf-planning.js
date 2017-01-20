var express = require('express');
var router = express.Router();
var fs = require('fs');

var data;
fs.readFile('./data/data.json', 'utf-8', function readData(err, file){
  if(err) {
    console.log(err);
  } else {
    try {
      data = JSON.parse(file);
    } catch (err) {
      console.log(err);
    }
  }
});



router.route('/jf/entry')
  .post(function(req, res, next) {
  try {
    var entry = req.body;
    console.log(req.body);
    data.data.push(entry);//(entry);
    console.log(entry);

    var dataToWrite = JSON.stringify(data);
    fs.writeFile('./data/data.json', dataToWrite, 'utf-8', function callback(){
      res.send('ok');
    });
  } catch (err) {
    console.log(err);
    res.send('err');
  }
})


.get(function(req, res, next) {
  res.json(data);
});

module.exports = router;
