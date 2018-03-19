"use strict";

app.controller("DeckListController", function (API, Pagination, Deck, toaster, $scope, $state, $stateParams) {

  function constructor() {

    $scope.params = $stateParams;

    /**
     * All decks to show
     *
     * @type {Array<Deck>}
     */
    $scope.decks = [];

    /**
     * APY payload
     *
     * @type {object}
     */
    var payload = {
      limit: 9
    };

    /**
     * If there's user in URL param, then update payload
     */
    if ($stateParams.id) {
      payload.user = $stateParams.id;
    }

    /**
     * @type {Pagination}
     */
    $scope.pagination = new Pagination(API.Decks.get, payload);
  }

  /**
   * Loaded decks
   */
  $scope.$on("royalePlus.Pagination:loaded", function (event, data) {
    angular.forEach(data.results, function (result) {
      $scope.decks.push(new Deck().import(result));
    });
    // No decks
    if (!data.count) {
      toaster.error("No Decks", "This user doesn't have any decks.");
      $state.go("app.deck-list", { username: null });
    }
  });

  constructor();
});
