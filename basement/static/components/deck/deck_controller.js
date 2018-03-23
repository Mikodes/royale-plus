"use strict";

app.controller("DeckController", function (API, Deck, toaster, Comment, Main, $scope, $state, $stateParams) {

  function constructor() {

    /**
     * @type {Deck}
     */
    $scope.deck = $stateParams.deck;

    /**
     * @type {Comment}
     */
    $scope.comment = new Comment({
      target: $stateParams.id,
      kind: Main.comment.kind.indexOf("Deck")
    });

    /**
     * @type {Array<Comment>}
     */
    $scope.comments = [];

    /**
     * Get deck via API
     */
    if (!$scope.deck) {
      API.Decks.get({ id: $stateParams.id },
        function (data) {
          $scope.deck = new Deck().import(data);
        },
        function () {
          toaster.error("Unable to Access", "Deck doesn't exist or you don't have access to update it.", 10000);
          $state.go("app.deck-list");
        }
      );
    }

    // Get comments
    API.Comments.get({
        limit: 30,
        target: $scope.comment.target,
        kind: $scope.comment.kind
      },
      function (data) {
        angular.forEach(data.results, function (result) {
          $scope.comments.push(new Comment(result));
        });
      }
    );
  }

  $scope.$on("royalePlus.Comment:create", function (event, data) {
    $scope.comments.unshift(new Comment(data));
  });

  $scope.$on("royalePlus.MainController:loadedCards", constructor);

  constructor();
});
