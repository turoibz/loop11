"use strict";

angular.module("app.controllers")

.controller("weatherCtrl", ["$rootScope", "$scope", "$location", "server", "$q", function ($rootScope, $scope, $location, server, $q) {
	
	$scope.weather = {
		location : "",
		postCode : "",
		current : {},
		forecast : [],
		loading : true,
	}
	
	//Grab location change
	$rootScope.$on("$locationChangeStart", function() {
		var urlPath = $location.$$path;
		$scope.weather.loading = true;
		//object & view uptades on based on location selected
		switch(urlPath){
			case "/melbourne":
				$scope.weather.location = "Melbourne"
				$scope.weather.postCode = "au.3000"
				//using jQuery
				$('.tab_nav_link').removeClass('active')
				$('a[href$="/#/melbourne"]').addClass('active')
				break;
			case "/sydney":
				$scope.weather.location = "Sydney"
				$scope.weather.postCode = "au.2000"
				//using jQuery
				$('.tab_nav_link').removeClass('active')
				$('a[href$="/#/sydney"]').addClass('active')
				break;
			case "/brisbane":
				$scope.weather.location = "Brisbane"
				$scope.weather.postCode = "au.4000"
				//using jQuery
				$('.tab_nav_link').removeClass('active')
				$('a[href$="/#/brisbane"]').addClass('active')
				break;
			default:
				$scope.weather.location = "Melbourne"
				$scope.weather.postCode = "au.4000"
		}
		loadWeatherData($scope.weather.postCode);
	});
	
	//Load API data passing location argument
	function loadWeatherData(postCode){
		var currentPromise = server.get("current", postCode);
		var forecastPromise = server.get("forecast", postCode);
		$q.all([currentPromise, forecastPromise])
		.then(function (result) {
			$scope.weather.current = result[0].data;
			$scope.weather.forecast = result[1].data.Days;
			$scope.weather.loading = false;
		})
		.catch(function () {
			//do something if error occurs
		});		
	}


}]);