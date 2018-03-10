"use strict";

app.controller("MainController", function (ENV, Auth, API, $scope, $rootScope, $state) {

  /**
   * Get user data
   */
  function getUserData() {

    // Store data
    $scope.auth = Auth;
    $scope.user = Auth.getAuth();

    // Update auth
    if (Auth.isAuth()) {
      API.Users.get({ username: Auth.getAuth().username }, function (data) {
        Auth.updateAuth(data);
      });
    }
  }

  function constructor() {

    // Get auth
    getUserData();

    // Get state
    $scope.state = $state;

    // Get cards
    if (!localStorage.getItem("cards") || localStorage.getItem("version") != ENV.VERSION_STORAGE) {
      API.Cards.query({}, function (data) {
        localStorage.setItem("cards", JSON.stringify(data));
        localStorage.setItem("version", ENV.VERSION_STORAGE);
        $rootScope.$broadcast("royaleClan.MainController:loadedCards", data);
      });
    }
  }

  // Update user data
  $scope.$on("royaleClan.Auth:setAuth", getUserData);
  $scope.$on("royaleClan.Auth:updateAuth", getUserData);
  $scope.$on("royaleClan.Auth:unAuth", getUserData);

  constructor();
});
