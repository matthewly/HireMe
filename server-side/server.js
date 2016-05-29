// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

// Models


//replace this with your Mongolab URL
mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@ds031832.mlab.com:31832/mp4');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
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
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.status(200).json({ message: 'Nothing here. Go to /users or /tasks to play with the API.!', "data":[] });
});


/* API CRUD routes here*/


// All our routes will start with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
