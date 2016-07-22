'use strict';

/**
 * @ngdoc function
 * @name ngSpotifyApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ngSpotifyApp
 */
angular.module('ngSpotifyApp')
  .controller('HomeCtrl', function ($scope, Spotify, ngAudio, $window) {
    
    var currentTrack;
    var bTrackPlaying = false;

    function searchArtist() {
      if($scope.searchStr.length) {
        Spotify.search($scope.searchStr, 'artist')
          .then(function(response) {
            $scope.artistResults = response.artists.items;
          });
      $scope.currentArtist = null;
      }
    }

    function goToArtist(artist) {
      $scope.searchStr = '';
      Spotify.getArtist(artist.id)
        .then(function(response) {
          // console.log('response: ', response);
          $scope.currentArtist = response;
        });
      // Spotify.getArtistAlbums(artist.id)
      //   .then(function(data) {
      //     $scope.currentArtistAlbums = data.items;
      //   });
      Spotify.getArtistTopTracks(artist.id, 'US')
        .then(function(data) {
          $scope.artistTopTracks = data.tracks;
          console.log('data: ', $scope.artistTopTracks);
        });
      Spotify.getRelatedArtists(artist.id)
        .then(function(res) { 
          $scope.relatedArtists = res.artists;
          console.log('artists: ', $scope.relatedArtists);
        })
    }

    function goToSpotifyPage() {
      $window.open($scope.currentArtist.external_urls.spotify, '_blank');
    }

    function playTrack(track) {
      currentTrack = ngAudio.load(track.preview_url);
      currentTrack.play();
      bTrackPlaying = true;
    }

    function stopTrack(track) {
      currentTrack.stop();
      currentTrack = null;
      bTrackPlaying = false;
    }

    function isPlaying() {
      return bTrackPlaying;
    }


    // function albumDetails(album) {
    //   Spotify.getAlbum(album.id)
    //     .then(function(response) {
    //       $scope.albumResults = response;
    //       $scope.albumTracks = response.tracks.items;
    //       if(currentTrack && currentTrack.progress || isTrackPlaying) {
    //         currentTrack.stop();
    //         isTrackPlaying = false;
    //       }
    //       currentTrack = ngAudio.load(response.tracks.items[0].preview_url);
    //       currentTrack.play();
    //       isTrackPlaying = true;
    //     });
    // }

    $scope.isPlaying = isPlaying;
    $scope.stopTrack = stopTrack;
    $scope.playTrack = playTrack;
    $scope.artistTopTracks = [];
    // $scope.albumDetails = albumDetails;
    $scope.goToSpotifyPage = goToSpotifyPage;
    $scope.searchArtist = searchArtist;
    $scope.goToArtist = goToArtist;
    $scope.searchStr = '';
    $scope.artistResults = [];
    $scope.currentArtist = '';

  });
