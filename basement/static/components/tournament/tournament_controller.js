"use strict";

app.controller("TournamentController", function (API, Tournament, TournamentMatch, $scope, $stateParams) {

  function constructor() {

    /**
     * @type {Tournament}
     */
    $scope.tournament = null;

    /**
     * @type {Array<TournamentMatch>}
     */
    $scope.tournamentMatches = [];

    /**
     * Get tournament
     */
    API.Tournaments.get({ id: $stateParams.id }, function (data) {
      $scope.tournament = new Tournament(data);
    });

    /**
     * Get tournament matches
     */
    API.TournamentMatches.get({ tournament: $stateParams.id }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.tournamentMatches.unshift(new TournamentMatch(result));
      });
    });
  }

  constructor();
});
