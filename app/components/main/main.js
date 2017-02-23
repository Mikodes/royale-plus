"use strict";

app.controller("MainController", function ($scope, $rootScope, $state, $http) {

  function constructor() {
    $scope.state = $state;

    if (!localStorage.cards) {
      $http.get("http://www.clashapi.xyz/api/cards").then(function (data) {
        localStorage.cards = JSON.stringify(data.data);
        $rootScope.$broadcast("donateClan.MainController:loadedCards", data.data);
      });
    }
  }

  constructor();
});
