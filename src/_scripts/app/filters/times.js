"use strict";

angular.module("app.filters")
//filter to convert api times to am / pm
.filter("times", [function(){
	return function(val) {
		if(val != undefined){
			var time = ""
			if(val > 1200){
				val = val - 1200;
				return time = val.toString().slice(0,-2) + " pm";
			}
			else{
				return time = val.toString().slice(0,-2) + " am";
			}		
		}
		else{
			return;
		}
	};
}]);