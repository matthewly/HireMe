var HireMeServices = angular.module('HireMeServices', []);

HireMeServices.factory('Jobs', function($http, $window) {

var baseUrl = 'http://localhost:4000';//'http://107.170.217.181:4000';
    return {
        updateList : function(data) {
          return $http.post(baseUrl+'/api/update', data);
        }
    }
});