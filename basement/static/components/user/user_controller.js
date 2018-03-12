"use strict";

app.controller("UserController", function (Member, API, toaster, $scope, $state, $stateParams) {

  function constructor() {

    // Get user from param
    $scope.user = $stateParams.user;

    // Get user from API
    if (!$scope.user) {
      API.Users.get({ username: $stateParams.username },
        function (data) {
          $scope.user = data;
        },
        function () {
          $state.go("app.home");
          toaster.error("User not found", "User '" + $stateParams.username + "' doesn't exist or deleted");
        }
      );
    }
  }

  constructor();
});
