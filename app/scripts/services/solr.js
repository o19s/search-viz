'use strict';

/**
 * @ngdoc function
 * @name searchVizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchVizApp
 */
angular.module('searchVizApp')
  .service('solr', ['$q', '$http', function ($q, $http) {
    var factory = {};

    var SOLR_EP = 'http://solr.quepid.com/solr/tmdb/select?';

    factory.search = function(query) {
      var deferred = $q.defer();

      var qf = "title cast tagline overview directors";

      var params = {
        'defType': 'edismax',
        'facet': 'true',
        'facet.field': 'genres',
        'facet.range': 'release_date',
        'facet.range.start': '1980-01-01T00:00:00Z',
        'facet.range.end': 'NOW/YEAR',
        'facet.range.gap': '+1YEAR',
        'facet.limit': 5,
        'facet.mincount': 1,
        'f.release_date.facet.mincount': 0,
        'json.nl': 'map',
        'q': query,
        'qf': qf,
        'rows': 25,
        'wt': 'json'
      };

      $http.get(SOLR_EP, {params: params})
        .then(function(data) {
          console.log(data.data);
          deferred.resolve(data.data);
        }, function() {
          deferred.reject();
        });

      return deferred.promise;
    };

    return factory;
  }]);
