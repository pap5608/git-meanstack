angular.module('app', [
	'ngRoute'])

angular.module('app')
.controller('ApplicationCtrl',function($scope, $location){
	$scope.$on('login', function(_, user){
		$scope.currentUser = user
		$location.url('/');
	})
})
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
angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc) {
    $scope.addPost = function() {
        // 새로운 글을 $scope.posts에 추가한다.
        if($scope.postBody) {
            PostsSvc.create({
                username: 'dickeyxxx',
                body : $scope.postBody
            }).then(function (post)
            {
                //$scope.posts.unshift(post);
                // 입력 필드를 지운다
                $scope.postBody = null
            });
            
           }
       }
    $scope.$on('ws:new_post', function(_, post) {
        $scope.$apply(function() {
            $scope.posts.unshift(post)
        })
    })
    // 데이터 시작
    PostsSvc.fetch()
    .success(function (posts) {
        $scope.posts = posts;
    });
    
    
    
})
angular.module('app')
.service('PostsSvc', function($http) {
    this.fetch = function() {
        return $http.get('/api/posts')
    }
    this.create = function(post) {
        return $http.post('/api/posts',post)
    }
})
angular.module('app')
.config(function ($routeProvider) {
	$routeProvider
	.when('/',{ controller: 'PostsCtrl', templateUrl:'posts.html'})
	.when('/register', { controller:'RegisterCtrl', templateUrl: 'register.html'})
	.when('/login', {controller:'LoginCtrl', templateUrl: 'login.html'})
})
angular.module('app')
.service('UserSvc', function($http){
	var svc=this
	svc.getUser=function() {
		return $http.get('/api/users')
	}
	svc.login=function(username, password) {
		return $http.post('/api/sessions', {
			username:username, password:password
		}).then(function (val) {
			svc.token=val.data
			$http.defaults.headers.common['x-auth'] = val.data
			return svc.getUser()
		})
	}
})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJsb2dpbi5jdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJvdXRlcy5qcyIsInVzZXIuc3ZjLmpzIiwid2Vic29ja2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcclxuXHQnbmdSb3V0ZSddKVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcsZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pe1xyXG5cdCRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24oXywgdXNlcil7XHJcblx0XHQkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXHJcblx0XHQkbG9jYXRpb24udXJsKCcvJyk7XHJcblx0fSlcclxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlclN2Yyl7XHJcblx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkKSB7XHJcblx0XHRVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcclxuXHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdiZWZvcmUgZW1pdCcpXHJcblx0XHRcdCRzY29wZS4kZW1pdCgnbG9naW4nLHJlc3BvbnNlLmRhdGEpXHJcblx0XHRcdFxyXG5cdFx0fSlcclxuXHR9XHJcbn0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbi5jb250cm9sbGVyKCdQb3N0c0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFBvc3RzU3ZjKSB7XHJcbiAgICAkc2NvcGUuYWRkUG9zdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOyDiOuhnOyatCDquIDsnYQgJHNjb3BlLnBvc3Rz7JeQIOy2lOqwgO2VnOuLpC5cclxuICAgICAgICBpZigkc2NvcGUucG9zdEJvZHkpIHtcclxuICAgICAgICAgICAgUG9zdHNTdmMuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnZGlja2V5eHh4JyxcclxuICAgICAgICAgICAgICAgIGJvZHkgOiAkc2NvcGUucG9zdEJvZHlcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocG9zdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTtcclxuICAgICAgICAgICAgICAgIC8vIOyeheugpSDtlYTrk5zrpbwg7KeA7Jq064ukXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucG9zdEJvZHkgPSBudWxsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAkc2NvcGUuJG9uKCd3czpuZXdfcG9zdCcsIGZ1bmN0aW9uKF8sIHBvc3QpIHtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgLy8g642w7J207YSwIOyLnOyekVxyXG4gICAgUG9zdHNTdmMuZmV0Y2goKVxyXG4gICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKSB7XHJcbiAgICAgICAgJHNjb3BlLnBvc3RzID0gcG9zdHM7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuLnNlcnZpY2UoJ1Bvc3RzU3ZjJywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Bvc3RzJylcclxuICAgIH1cclxuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Bvc3RzJyxwb3N0KVxyXG4gICAgfVxyXG59KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4uY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG5cdCRyb3V0ZVByb3ZpZGVyXHJcblx0LndoZW4oJy8nLHsgY29udHJvbGxlcjogJ1Bvc3RzQ3RybCcsIHRlbXBsYXRlVXJsOidwb3N0cy5odG1sJ30pXHJcblx0LndoZW4oJy9yZWdpc3RlcicsIHsgY29udHJvbGxlcjonUmVnaXN0ZXJDdHJsJywgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJ30pXHJcblx0LndoZW4oJy9sb2dpbicsIHtjb250cm9sbGVyOidMb2dpbkN0cmwnLCB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnfSlcclxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuLnNlcnZpY2UoJ1VzZXJTdmMnLCBmdW5jdGlvbigkaHR0cCl7XHJcblx0dmFyIHN2Yz10aGlzXHJcblx0c3ZjLmdldFVzZXI9ZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJylcclxuXHR9XHJcblx0c3ZjLmxvZ2luPWZ1bmN0aW9uKHVzZXJuYW1lLCBwYXNzd29yZCkge1xyXG5cdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XHJcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLCBwYXNzd29yZDpwYXNzd29yZFxyXG5cdFx0fSkudGhlbihmdW5jdGlvbiAodmFsKSB7XHJcblx0XHRcdHN2Yy50b2tlbj12YWwuZGF0YVxyXG5cdFx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSB2YWwuZGF0YVxyXG5cdFx0XHRyZXR1cm4gc3ZjLmdldFVzZXIoKVxyXG5cdFx0fSlcclxuXHR9XHJcbn0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbi5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICR3aW5kb3cpIHtcclxuXHR2YXIgaG9zdFxyXG5cdGlmKCR3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcclxuXHRcdFx0aG9zdCA9ICBcIndzczovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3RcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhvc3QgPSBcIndzOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdFxyXG5cdH1cclxuXHRcclxuXHR2YXIgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoaG9zdClcclxuXHJcblx0Y29ubmVjdGlvbi5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdXZWIgU29ja2V0IENvbm5lY3RlZCcpXHJcblx0fVxyXG5cdFxyXG5cdGNvbm5lY3Rpb24ub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlKVxyXG5cdFx0XHR2YXIgcGF5bG9hZCA9IEpTT04ucGFyc2UoZS5kYXRhKVxyXG5cdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3dzOicrcGF5bG9hZC50b3BpYywgcGF5bG9hZC5kYXRhKVxyXG5cdFx0fVxyXG5cdH0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
