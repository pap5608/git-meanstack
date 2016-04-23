angular.module('app')
.run(function ($rootScope, $window) {
	var host
	if($window.location.protocol === "https:") {
			host =  "wss://" + window.location.host
		} else {
			host = "ws://" + window.location.host
	}
	
	var connection = new WebSocket(host)

	connection.onopen = function() {
		console.log('Web Socket Connected')
	}
	
	connection.onmessage = function(e) {
			console.log(e)
			var payload = JSON.parse(e.data)
			$rootScope.$broadcast('ws:'+payload.topic, payload.data)
		}
	})