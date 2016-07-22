'use strict';

/**
 * @ngdoc overview
 * @name ngSpotifyApp
 * @description
 * # ngSpotifyApp
 *
 * Main module of the application.
 */
angular.module('ngSpotifyApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth', 
    'ngMaterial', 
    'ui.router',
    'spotify',
    'ngAudio'
  ])

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.$waitForAuth();
          }
        }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.$requireAuth();
          }
        }
      })
      .state('artist', {
        ur: '/artist',
        templateUrl: 'views/artist.html',
        controller: 'ArtistCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.$requireAuth();
          }
        }
      });

      $urlRouterProvider
        .otherwise('/home');
  })

.run(function($rootScope, $state, $mdDialog, $mdToast, $timeout) {

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if(error === 'AUTH_REQUIRED') {
        $state.go('login');
        return $timeout(function() {
          $mdToast.show(
            $mdToast
            .simple()
            .content('You must be logged in to view content.')
            .position('bottom right')
          );
        }, 300);
      }
    });

  });

