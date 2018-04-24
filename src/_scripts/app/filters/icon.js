"use strict";

angular.module("app.filters")
//filter to return icon class name
.filter("icon", [function(){
	return function(val) {
		if(val != undefined){
			return val.slice(0,-4).toLowerCase();
		}
		else{
			return;
		}
	};
}]);