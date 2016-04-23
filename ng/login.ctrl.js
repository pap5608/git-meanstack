angular.module('app')
.controller('LoginCtrl', function($scope, UserSvc){
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
		.then(function (response){
			console.log('before emit')
			$scope.$emit('login',response.data)
			
		})
	}
})