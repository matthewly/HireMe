var app = angular.module('HireMe', ['ngRoute', 'HireMeControllers', 'HireMeServices']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl : 'partials/home.html',
			controller : 'homeController'
		})
		.when('/search', {
			templateUrl : 'partials/search.html',
			controller : 'searchController'
		})
        .when('/internships', {
            templateUrl : 'partials/internships.html',
            conroller : 'internshipController'
        })
		.otherwise({ // if url doesn't exist, go to /home
			redirectTo: '/home'
		});
});


