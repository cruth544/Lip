'use strict'
var app = angular.module('Lip', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', MainRouter])
  .run(['$rootScope', '$state', runFunction])

function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/song-list.html',
      params: null,
      controller: 'SongCtrl'
    })
    .state('record', {
      url: '/record',
      templateUrl: 'templates/record-view.html',
      params: null,
      controller: 'CameraCtrl'
    })
    .state('friends', {
      url: '/friends',
      templateUrl: 'templates/friends-list.html',
      params: null,
      controller: 'FriendsCtrl'
    })

  $urlRouterProvider.otherwise('/')
}

function runFunction($rootScope, $state) {
  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
      console.log('Previous state:'+$rootScope.previousState)
      console.log('Current state:'+$rootScope.currentState)
  })

  $rootScope.back = function () {
    var audio = console.log(document.getElementById('song-preview'))
    if (audio) {
      audio.src = ''
      console.log("in Back function: ", audio)
    }
    if ($rootScope.previousState) {
      $state.go($rootScope.previousState)
    } else {
      $state.go('home')
    }
  }
}
