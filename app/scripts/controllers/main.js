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

    $scope.genreBar = {};
    $scope.movieDates = {};

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
  }]);
