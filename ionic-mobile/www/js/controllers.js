angular.module('starter.controllers', [])


.controller('SongsCtrl', function($scope, Songs) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.songs = Songs.all();
  $scope.remove = function(song) {
    Songs.remove(song);
  };
})

.controller('CameraCtrl', ['$scope', '$cordovaCapture', '$ionicPlatform',
  function($scope, $cordovaCapture, $ionicPlatform) {


    console.log("IN VIDEO")
    cordova.plugins.camerapreview.startCamera({x: 0, y: 50, width: 300, height:300}, "front", true, true, true)
    // $scope.captureVideo = function () {
    //   $ionicPlatform.ready(function() {
    //     console.log('CLICKED CAPTURE VIDEO')
    //     var options = { limit: 3, duration: 15 }

    //     $cordovaCapture.captureVideo(options).then(function(videoData) {
    //       // Success! Video data is here
    //       console.log(videoData)
    //     }, function(err) {
    //       console.log(err)
    //       // An error occurred. Show a message to the user
    //     })
    //   })
    // }

    // $scope.captureImage = function() {
    //   var options = { limit: 3 }

    //   $cordovaCapture.captureImage(options).then(function(imageData) {
    //     // Success! Image data is here
    //   }, function(err) {
    //     // An error occurred. Show a message to the user
    //   })
    // }
}])

.controller('SongViewCtrl', function($scope, $stateParams, Songs) {
  $scope.song = Songs.get($stateParams.songId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
