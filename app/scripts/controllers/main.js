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

    // Boosts
    $scope.boosts = [
      {label: 'action', boost: 5},
      {label: 'comedy', boost: 5},
      {label: 'romance', boost: 5},
      {label: 'horror', boost: 5},
      {label: 'drama', boost: 5}
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

      solr.search(query).then(
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

      angular.forEach(data['facet_counts']['facet_fields']['genres'], function(count, genre) {
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
    };
  }]);
