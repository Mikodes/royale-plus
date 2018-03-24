"use strict";

app.controller("DeckListController", function (API, $scope) {

  function constructor() {

    /**
     * Get tournaments
     */
    API.Tournaments.get({}, function (data) {
      $scope.tournaments = data.results;
    });
  }

  constructor();
});
