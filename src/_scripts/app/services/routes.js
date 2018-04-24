"use strict";

angular.module("app.configuration")

.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider

	.when("/melbourne", {
		templateUrl:"",
		controller: "weatherCtrl"
	})
	.when("/sydney", {
		templateUrl:"",
		controller: "weatherCtrl"
	})
	.when("/brisbane", {
		templateUrl:"",
		controller: "weatherCtrl"
	});
	

  $routeProvider.otherwise({redirectTo: "/melbourne"});
    
}]);