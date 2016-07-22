'use strict';

/**
 * @ngdoc function
 * @name ngSpotifyApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the ngSpotifyApp
 */
angular.module('ngSpotifyApp')
  .controller('ApplicationCtrl', function ($scope, $rootScope, $state, Auth) {
    
    $scope.logOutUser = function() {
      Auth.$unauth();
      return $state.go('login');
    };

  });