var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Search = require('./models/search');
var PythonShell = require('python-shell');
var router = express.Router();
var app = express();

mongoose.connect('mongodb://admin:master@ds013216.mlab.com:13216/simple_hire',function(err) {
  if(err)
    console.log(err);
  else
    console.log("successfully connected to mongodb");
});

var port = process.env.PORT || 4000;

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


/* HOME */
var updateRoute = router.route('/update');

updateRoute.get(function(req, res) {

  res.status(200).json({ message: 'message', "data":[] });
});

updateRoute.post(function(req, res) {
  var search = new Search();
	search.location = req.body.location;
	search.job_type = req.body.job_type;

  //for mongodb
  //search.save();

  /* SCRIPT 1 */
  var options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: './',
    args: [search.location, search.job_type]
  };


  if (search.job_type == "full_time") {
    PythonShell.run('fulltime.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('full time python script done');
      res.status(200).json({ message: 'message', 'data': [] });
    });
  }

  else if (search.job_type == "internship") {
    PythonShell.run('internship.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('intern python script done');
      res.status(200).json({ message: 'message', 'data': [] });
    });
  }

  else {
    PythonShell.run('entry.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('entry python script done');
      res.status(200).json({ message: 'message', 'data': [] });
    });
  }

  

});

/* API CRUD routes here*/


// All our routes will start with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
