"use strict";

app.controller("DeckListController", function (API, Main, Pagination, Deck, toaster, $scope, $state, $stateParams) {

  function constructor() {

    $scope.params = $stateParams;

    /**
     * Filter
     *
     * @type {object}
     */
    $scope.deckFilter = {
      arena: -1,
      kind: -1
    };

    /**
     * Modes
     *
     * @type {Array<object>}
     */
    $scope.modes = [{
      key: "mode_1v1",
      label: "1v1"
    }, {
      key: "mode_2v2",
      label: "2v2"
    }, {
      key: "mode_2x",
      label: "2x Elixir"
    }, {
      key: "mode_3x",
      label: "3x Elixir"
    }];

    angular.forEach($scope.modes, function (value) {
      $scope.deckFilter[value.key] = false;
    });

    /**
     * All decks to show
     *
     * @type {Array<Deck>}
     */
    $scope.decks = [];

    /**
     * All areans
     *
     * @type {Array<string>}
     */
    $scope.deckArenas = Main.deck.arena;

    /**
     * All type of decks
     *
     * @type {Array<string>}
     */
    $scope.deckKinds = Main.deck.kind;

    /**
     * APY payload
     *
     * @type {object}
     */
    $scope.payload = {
      limit: 9
    };

    /**
     * If there's user in URL param, then update payload
     */
    if ($stateParams.id) {
      $scope.payload.user = $stateParams.id;
    }

    /**
     * @type {Pagination}
     */
    $scope.pagination = new Pagination(API.Decks.get, $scope.payload);
  }

  $scope.filter = function (key) {

    // Check for value
    if ($scope.deckFilter[key] !== -1) {
      $scope.payload[key] = $scope.deckFilter[key];
    }

    // Check for bool
    if ($scope.deckFilter[key] == false) {
      $scope.payload[key] = null;
    }

    $scope.decks = [];
    $scope.pagination = new Pagination(API.Decks.get, $scope.payload);
  };

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
