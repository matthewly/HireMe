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

HireMeControllers.controller('fulltimeController', ['$scope', '$http', function($scope, $http) {
	
	$http.get('data/fulltime.json').success(function(data) {
		$scope.items = data.items;
		$scope.postings = [];

		for (var i = 0; i < 25; i++) {
			var snippet = $scope.items[i].snippet;
			var image_link = $scope.items[i].image_link;
			var link = $scope.items[i].link;
			var industry = $scope.items[i].industry;
			var numberOfRatings = $scope.items[i].numberOfRatings;
			var overallRating = $scope.items[i].overallRating;
			var website = $scope.items[i].website;
			var job_title = $scope.items[i].job_title;
			var company_name = $scope.items[i].company_name;

			if (job_title != null && !company_name.includes("...")) {

				var posting = {
					'snippet': snippet,
					'image_link': image_link,
					'link': link,
					'industry': industry,
					'numberOfRatings': numberOfRatings,
					'overallRating': overallRating,
					'website': website,
					'job_title': job_title,
					'company_name': company_name
				};

				$scope.postings.push(posting);
			}
		}
	}).error(function (err) {
		console.log(err);
	});
}]);


HireMeControllers.controller('internshipController', ['$scope', '$http', function($scope, $http) {

	$http.get('data/internships.json').success(function(data) {
		$scope.items = data.items;
		$scope.postings = [];

		for (var i = 0; i < 25; i++) {
			var snippet = $scope.items[i].snippet;
			var image_link = $scope.items[i].image_link;
			var link = $scope.items[i].link;
			var industry = $scope.items[i].industry;
			var numberOfRatings = $scope.items[i].numberOfRatings;
			var overallRating = $scope.items[i].overallRating;
			var website = $scope.items[i].website;
			var job_title = $scope.items[i].job_title;
			var company_name = $scope.items[i].company_name;

			if (job_title != null && !company_name.includes("...")) {

				var posting = {
					'snippet': snippet,
					'image_link': image_link,
					'link': link,
					'industry': industry,
					'numberOfRatings': numberOfRatings,
					'overallRating': overallRating,
					'website': website,
					'job_title': job_title,
					'company_name': company_name
				};

				$scope.postings.push(posting);
			}
		}
	}).error(function (err) {
		console.log(err);
	});
}]);