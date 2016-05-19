// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

// Models
var Llama = require('./models/llama');
var User = require('./models/user');
var Task = require('./models/task');


//replace this with your Mongolab URL
mongoose.connect('mongodb://mmly2:mmly2123@ds031832.mlab.com:31832/mp4');

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


/* USERS */
var usersRoute = router.route('/users');
 
usersRoute.get(function(req, res) {
	var whereParam = null;
	var sortParam = null;
	var selectParam = null;
	var skipParam = null;
	var limitParam = null;
	var countParam = null;

	if (req.query.where)
		whereParam = eval("("+req.query.where+")");

	if (req.query.sort)
		sortParam = eval("("+req.query.sort+")");

	if (req.query.select)
		selectParam = eval("("+req.query.select+")");

	if (req.query.skip)
		skipParam = eval("("+req.query.skip+")");

	if (req.query.limit)
		limitParam = eval("("+req.query.limit+")");

	if (req.query.count)
		countParam = eval("("+req.query.count+")");

	User.find(function(err, users) {
		if (err) {
			res.status(500).json({message: 'Error in finding users.', data: []});
		}

		else {
			res.status(200).json({ message: 'OK', data: users});
		}
	}).find(whereParam).sort(sortParam).select(selectParam).skip(skipParam).limit(limitParam).count(countParam);
});

usersRoute.post(function(req, res) {
	var user = new User();
 
 	user.name = req.body.name;
	user.email = req.body.email;

	console.log("user.name: " + user.name);
	console.log("user.email: " + user.email);

	if (req.body.pendingTasks == null) 
		user.pendingTasks = [];

	else
		user.pendingTasks = req.body.pendingTasks;

	user.dateCreated = Date.now();
 
	user.save(function(err) {
    	if (err) {
    		if (user.email == null || user.name == null)
    			res.status(500).json({ message: 'Validation Error: A name is required! An email is required!', data: []});
    		else if (User.find({email: {$exists: true}}))
    			res.status(500).json({message: 'Email already exists.', data: []});
    		else
        		res.status(500).json({message: 'Error in creating user.', data: []});
    	}
 
 		else
    		res.status(201).json({ message: 'User created.', data: user });
    });
});

usersRoute.options(function(req, res){
    res.writeHead(200);
    res.end();
});

/* USER/:id */

var userRoute = router.route('/users/:id');

userRoute.get(function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if (err)
			res.status(505).json({message: 'Internal Server Error.', data: []});

		else if (user == null)
			res.status(404).json({message: 'User not found.', data: []});

		else
			res.status(200).json({message: 'OK', data: user});
	});
});

userRoute.put(function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if (err)
			res.status(505).json({message: 'Internal Server Error.', data: []});

		else if (user == null)
			res.status(404).json({message: 'User not found.', data: []});

		else {
			user.name = req.body.name;
			user.email = req.body.email;
			user.pendingTasks = req.body.pendingTasks;
			user.dateCreated = Date.now();
	
			user.save(function(err) {
				if (err)
					res.status(500).json({message: 'Error in updating user.', data: []});
	
				else
					res.status(200).json({ message: 'User updated!', data: user });
			});
		}
		
	});
});

userRoute.delete(function(req, res) {
	var userID = {_id: req.params.id}
	User.findByIdAndRemove(userID, function(err, user) {
		if (err)
			res.status(500).json({message: 'Internal server error.', data: []});

		else if (user == null)
			res.status(404).json({message: 'User not found.', data: []});

		else
			res.status(200).json({message: 'User deleted!', data: []});

	});
});

/* TASKS */

var tasksRoute = router.route('/tasks');

tasksRoute.get(function(req, res) {
	var whereParam = null;
	var sortParam = null;
	var selectParam = null;
	var skipParam = null;
	var limitParam = null;
	var countParam = null;

	if (req.query.where)
		whereParam = eval("("+req.query.where+")");

	if (req.query.sort)
		sortParam = eval("("+req.query.sort+")");

	if (req.query.select)
		selectParam = eval("("+req.query.select+")");

	if (req.query.skip)
		skipParam = eval("("+req.query.skip+")");

	if (req.query.limit)
		limitParam = eval("("+req.query.limit+")");

	if (req.query.count)
		countParam = eval("("+req.query.count+")");
	
	Task.find(function(err, tasks) {
		if (err)
			res.status(500).json({message: 'Error in finding tasks.', data: []});

		else
			res.status(200).json({ messages: 'success', data: tasks });
	}).find(whereParam).sort(sortParam).select(selectParam).skip(skipParam).limit(limitParam).count(countParam);;
});

tasksRoute.post(function(req, res) {
	var task = new Task();

	task.name = req.body.name;
	task.description = req.body.description;
	task.deadline = req.body.deadline;
	task.completed = req.body.completed;
	task.assignedUser = req.body.assignedUser;
	task.assignedUserName = req.body.assignedUserName;
	task.dateCreated = Date.now();

	task.save(function(err) {
		if (err) {
			if (task.name == null || task.deadline == null)
				res.status(500).json({ message: 'Validation Error: A name is required! A deadline is required!', data: []});
			else
				res.status(500).json({message: 'Error in creating task.', data: []});
		}

		else
			res.status(201).json({ message: 'Task created.', data:task });
	});
});

tasksRoute.options(function(req, res){
    res.writeHead(200);
    res.end();
});


/* TASK/:id */

var taskRoute = router.route('/tasks/:id');

taskRoute.get(function(req, res) {
	Task.findById(req.params.id, function(err, task) {
		if (err)
			res.status(404).json({message: 'Error in finding task.', data: []});

		else
			res.status(200).json({message: 'OK', data: task});
	});
});

taskRoute.put(function(req, res) {
	Task.findById(req.params.id, function(err, task) {
		if (err)
			res.status(404).json({message: 'Task not found.', data: []});

		task.name = req.body.name;
		task.description = req.body.description;
		task.deadline = req.body.deadline;
		task.completed = req.body.completed;
		task.assignedUser = req.body.assignedUser;
		task.assignedUserName = req.body.assignedUserName;
		task.dateCreated = Date.now();

		task.save(function(err) {
			if (err)
				res.status(500).json({message: 'Error in updating task.', data: []});

			else
				res.status(200).json({ message: 'Task updated!', data: task });
		});
	});
});

taskRoute.delete(function(req, res) {
	var taskID = {_id: req.params.id}
	Task.findByIdAndRemove(taskID, function(err, user) {
		if (err)
			res.status(500).json({message: 'Internal server error.', data: []});

		else if (user == null)
			res.status(404).json({message: 'Task not found.', data: []});

		else
			res.status(200).json({message: 'Task deleted!', data: []});

	});
});
// llamasRoute.get(function(req, res) {
// 	var sort = eval("("+req.query.sort+")");
// 	Llama.find()
// 	.sort(sort)
// 	.exec(function(err, llamas) {
// 		if (err)
// 			res.send(err);

// 		res.json(llamas);
// 	});
// });

// var llamaRoute = router.route('llamas/:llama_id');

// llamaRoute.get(function(req, res) {
// 	Llama.findById(req.params.llama_id, function(err, llama) {
// 		if (err)
// 			res.send(err);

// 		res.json(llama);
// 	});
// });

// llamaRoute.delete(function(req, res) {
// 	Llama.findByIdAndRemove(req.params.llama_id, function(err) {
// 		if (err)
// 			res.send(err);

// 		res.json({ message: 'Llama deleted from the database!' });
// 	});
// });


// All our routes will start with /api
app.use('/api', router);

//Add more routes here

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
