"use strict";

app.controller("HomeController", function (Member, Deck, Card, $scope, $http) {

  function constructor() {

    $scope.discussion = false;

    $scope.members = [];

    $scope.deck = new Deck("Generated Deck", []);

    // Get members
    $http.get("assets/data/members.json").then(function (data) {
      angular.forEach(data.data, function (data) {
        var member = new Member(data.name, data.role, data.rarity, data.donation, data.tags);
        $scope.members.push(member);
      });
    });

    // Get random deck
    $scope.generateDeck();
  }

  $scope.joinDiscussion = function () {
    $scope.discussion = true;
  };

  $scope.generateDeck = function () {
    $scope.generating = true;
    $http.get("http://www.clashapi.xyz/api/random-deck").then(function (data) {
      $scope.deck.cards = [];
      angular.forEach(data.data, function (card) {
        $scope.deck.addCard(
          new Card(
            card._id, card.idName, card.name, card.arena, card.description,
            card.elixirCost, card.order, card.rarity, card.type
          )
        );
      });
      $scope.generating = false;
    });
  };

  constructor();
});
