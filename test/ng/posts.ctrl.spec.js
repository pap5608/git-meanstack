describe('posts.ctrl', function() {
	beforeEach(module('app'))
	var $scope
	var mockPostsSvc = {}
	beforeEach(inject(function ($q){
		mockPostsSvc.fetch = function() {
			var deferred = $q.defer()
			deferred.resolve([
			{username: 'jinsan', body: 'first post'},
			{username: 'jinsan', body: 'second post'}
			])
			return deferred.promise
		}
		mockPostsSvc.create = function() {
			var deferred = $q.defer()
			deferred.resolve()
			return deferred.promise
		}
	}))

	beforeEach(inject(function ($rootScope, $controller){
		$scope = $rootScope.$new()
		$controller('PostsCtrl', {
			$scope: $scope,
			PostsSvc: mockPostsSvc
		})

	}))
	it('load posts from the service', function() {
		$scope.$digest()
		expect($scope.posts).to.have.length(2)
	})

	it('sends a new post to the service', function() {
	
	sinon.spy(mockPostsSvc, 'create')
	$scope.post = {body: 'my new post'}
	$scope.addPost()
	expect(mockPostsSvc.create).to.have.been.calledWith({body: 'my new post'})
	})
})


