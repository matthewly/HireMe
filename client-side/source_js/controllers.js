var HireMeControllers = angular.module('HireMeControllers', ['ngCookies']);

HireMeControllers.controller('homeController', ['$scope','$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.search_query = {};
	
	$scope.search_submit = function() {
		//console.log("before putting to cookie: " + $scope.search_query.title + " " + $scope.search_query.location);
		$cookies.put('title_cookie', $scope.search_query.title);
		$cookies.put('location_cookie', $scope.search_query.location);
		$location.url('/search');	
	}
}]);

HireMeControllers.controller('searchController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	//alert($cookies.get('search_cookie').title);
	$scope.title = $cookies.get('title_cookie');
	$scope.location = $cookies.get('location_cookie');
	
}]);

HireMeControllers.controller('internshipController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	$scope.overall_rating = "test";

	$http.get('data/internships.json').success(function(data) {
		$scope.items = data.items;

		// for (var i = 0; i < items.length; i++) {
		// 	if (items[i].displayLink ==)
		// }

		$http.jsonp('http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=69178&t.k=k0TM4AtrHme&action=employers&userip=88.192.249.8&useragent=Mozilla/%2F5.0"&q=riot games&callback=JSON_CALLBACK').success(function(data) {
			console.log(data);
			$scope.overall_rating = data.response.employers[0].overallRating;
			console.log($scope.overall_rating);
		}).error(function(err) {
			console.log(err);
		});
	
	}).error(function (err) {
		console.log(err);
	});

}]);