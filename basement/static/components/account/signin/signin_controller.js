"use strict";

app.controller("SignInController", function (Auth, $scope) {

  function constructor() {
    $scope.auth = Auth;
    $scope.form = {};
  }

  constructor();
});
