var HireMeControllers = angular.module('HireMeControllers', ['ngCookies']);

HireMeControllers.controller('homeController', ['$scope', '$cookies','$location', function($scope, $cookies, $location) {
	$scope.search_query = {};
	$scope.selectedLocation = "Chicago, IL";
	$scope.locations = ["Chicago, IL", "San Francisco, CA", "Los Angeles, CA", "Austin, TX", "New York, NY"];
	$scope.search_full = function() {
		//console.log("before putting to cookie: " + $scope.search_query.title + " " + $scope.search_query.location);
		//$cookies.put('title_cookie', $scope.search_query.title);
		$cookies.put('location_cookie', $scope.selectedLocation);
		$location.url('/fulltime');	
	}

	$scope.search_full_carousel = function(selectedLocation_carousel) {
		$cookies.put('location_cookie', selectedLocation_carousel);
		$location.url('/fulltime');		
	};

	$scope.search_intern_carousel = function(selectedLocation_carousel) {
		$cookies.put('location_cookie', selectedLocation_carousel);
		$location.url('/internships');		
	};

	$scope.search_intern = function() {
		//console.log("before putting to cookie: " + $scope.search_query.title + " " + $scope.search_query.location);
		//$cookies.put('title_cookie', $scope.search_query.title);
		$cookies.put('location_cookie', $scope.selectedLocation);
		$location.url('/internships');	
	}
}]);

HireMeControllers.controller('searchController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	//alert($cookies.get('search_cookie').title);
	$scope.title = $cookies.get('title_cookie');
	$scope.location = $cookies.get('location_cookie');
	
}]);

HireMeControllers.controller('fulltimeController', ['$scope','$cookies', '$http', function($scope, $cookies,$http) {
	$scope.date = "July 29, 2016";

	$scope.location =$cookies.get('location_cookie'); 
	$http.get('data/'+$scope.location+'fulltime.json').success(function(data) {
		$scope.items = data.items;
		$scope.postings = [];

		for (var i = 0; i < data.count; i++) {
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


HireMeControllers.controller('internshipController', ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
	$scope.date = "July 23, 2016";
	
	$scope.location =$cookies.get('location_cookie');
	$http.get('data/'+$scope.location+'internship.json').success(function(data) {
		$scope.items = data.items;
		$scope.postings = [];

		for (var i = 0; i < data.count; i++) {
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