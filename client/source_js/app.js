var app = angular.module('HireMe', ['ngRoute', 'HireMeControllers', 'HireMeServices']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl : 'partials/home.html',
			controller : 'homeController',
		})
		.when('/search', {
			templateUrl : 'partials/search.html',
			controller : 'searchController'
		})
        .when('/internships', {
        	templateUrl : 'partials/internships.html',
        	controller : 'internshipController'
        })
        .when('/fulltime', {
        	templateUrl : 'partials/fulltime.html',
        	controller : 'fulltimeController'
        })
        .when('/entry', {
        	templateUrl : 'partials/entry.html',
        	controller : 'entryController'
        })
		.otherwise({ // if url doesn't exist, go to /home
			redirectTo: '/home'
		});
});


