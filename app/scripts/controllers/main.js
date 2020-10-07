/*jshint sub:true*/
'use strict';

/**
 * @ngdoc function
 * @name searchVizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchVizApp
 */
angular.module('searchVizApp')
  .controller('MainCtrl', ['$scope', 'solr', function ($scope, solr) {
    $scope.docs = [];
    $scope.queryText = '';

    // Boosts
    $scope.boosts = [
      {label: 'Action', boost: 5},
      {label: 'Comedy', boost: 5},
      {label: 'Romance', boost: 5},
      {label: 'Horror', boost: 5},
      {label: 'Drama', boost: 5}
    ];

    // Graph data variables
    $scope.genreBar = {};
    $scope.movieDates = {};
    $scope.radar = {};

    $scope.radarOptions = {
      scale: {
        ticks: {
          beginAtZero: true,
          stepSize: 2,
          max: 10
        }
      }
    };

    $scope.submitSearch = function() {
      var query = $scope.queryText;

      solr.search(query, $scope.boosts).then(
        function(data) {
          $scope.docs = data['response']['docs'];

          $scope.setupGenreBars(data);
          $scope.setupMovieDates(data);
        },
        function() {
          // Don't care for this app
        });
    };


    // Genre bar graph setup
    $scope.setupGenreBars = function(data) {
      $scope.genreBar.labels = [];
      $scope.genreBar.data = [];

      $scope.genreBar.options = {
        onClick: function(e, chart) {
          $scope.queryText += " genres:" + chart[0]._model.label;
          $scope.queryText = $scope.queryText.trim();
          $scope.submitSearch();
        }
      };

      angular.forEach(data['facet_counts']['facet_fields']['genres_s'], function(count, genre) {
        $scope.genreBar.labels.push(genre);
        $scope.genreBar.data.push(count);
      });
    };

    // Movie date setup
    $scope.setupMovieDates = function(data) {
      $scope.movieDates.labels = [];
      $scope.movieDates.data = [];

      angular.forEach(data['facet_counts']['facet_ranges']['release_date']['counts'], function(count, date) {
        $scope.movieDates.labels.push(date.substring(0, 4));
        $scope.movieDates.data.push(count);
      });
    };

    // Boost graph hook
    $scope.updateBoosts = function() {
      $scope.radar.labels = [];
      $scope.radar.data = [];

      angular.forEach($scope.boosts, function(boost) {
        $scope.radar.labels.push(boost.label);
        $scope.radar.data.push(boost.boost);
      });

      $scope.submitSearch();
    };


    // Page load calls
    $scope.updateBoosts();
  }]);
