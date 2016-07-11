var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
// };


// app.use(allowCrossDomain);

var port = process.env.PORT || 3000;
console.log("Express server running on " + port);

app.listen(process.env.PORT || port);
