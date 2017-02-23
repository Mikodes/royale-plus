"use strict";

app.controller("MemberController", function (Member, $scope, $http, $window, $state, $stateParams) {

  $scope.id = "damn";
  function constructor() {

    $scope.member = $stateParams.member;

    // Get member (if not given)
    if (!$scope.member) {
      $http.get("assets/data/members.json").then(function (data) {
        angular.forEach(data.data, function (data) {
          if (data.name === $stateParams.name) {
            $scope.member = new Member(data.name, data.role, data.rarity, data.donation, data.tags);
          }
        });
        if (!$scope.member) {
          $window.alert("This member doesn't exist, or has been removed!");
          $state.go("app.home");
        }
      });
    }
  }

  constructor();
});
