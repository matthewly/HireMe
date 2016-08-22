var HireMeServices = angular.module('HireMeServices', []);

HireMeServices.factory('Jobs', function($http, $window) {

var baseUrl = 'http://localhost:4000';//'http://104.236.106.65:4000';
    return {
        updateList : function(data) {
          return $http.post(baseUrl+'/api/update', data);
        }
    }
});