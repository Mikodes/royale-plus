"use strict";

app.controller("MainController", function (ENV, Auth, API, $scope, $rootScope, $state) {

  function constructor() {
    // Get state
    $scope.state = $state;

    // Get auth
    $scope.auth = Auth;
    $scope.user = Auth.getAuth();

    // Get cards
    if (!localStorage.getItem("cards") || localStorage.getItem("version") != ENV.VERSION_STORAGE) {
      API.Cards.query({}, function (data) {
        localStorage.setItem("cards", JSON.stringify(data));
        localStorage.setItem("version", ENV.VERSION_STORAGE);
        $rootScope.$broadcast("royaleClan.MainController:loadedCards", data);
      });
    }
  }

  // Update auth
  $scope.$on("royaleClan.Auth:setAuth", constructor);

  constructor();
});
