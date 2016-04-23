angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc) {
    $scope.addPost = function() {
        // 새로운 글을 $scope.posts에 추가한다.
        if($scope.post.body) {
            PostsSvc.create({
                //username: 'dickeyxxx',
                body : $scope.post.body
            })
 //           .then(function (post)
 //           {
                //$scope.posts.unshift(post);
                // 입력 필드를 지운다
 //               $scope.postBody = null
 //           });
           .then(function() {
            $scope.postBody = null
           }) 
           }
       }
    $scope.$on('ws:new_post', function(_, post) {
        $scope.$apply(function() {
            $scope.posts.unshift(post)
        })
    })
    // 데이터 시작
    PostsSvc.fetch()
    .then(function (posts) {
        $scope.posts = posts;
    });
    
    
    
})