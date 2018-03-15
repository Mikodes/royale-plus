"use strict";

app.controller("UserController", function (Member, API, toaster, Activity, $scope, $state, $stateParams) {

  function constructor() {

    // Get user from param
    $scope.user = $stateParams.user;

    /**
     * @type {Array<Activity>}
     */
    $scope.activities = [];

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

    // Get activities
    API.Activities.get({ limit: 20, issuer: $stateParams.username }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.activities.push(new Activity(result));
      });
    });
  }

  constructor();
});
