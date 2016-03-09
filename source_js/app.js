var app = angular.module('mp3',['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/gallery', {
			templateUrl : 'partials/gallery.html',
			controller: 'galleryController'
		})
		.when('/list', {
			templateUrl : 'partials/list.html',
			controller : 'listController'
		})
		.when('/details/:rank', {
			templateUrl : 'partials/details.html',
			controller : 'detailsController'
		})
		.otherwise({ // if url doesn't exist, go to /gallery
			redirectTo: '/gallery'
		});
})
