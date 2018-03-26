"use strict";

app.controller("TournamentNewController", function (API, Auth, $scope) {

  var user = Auth.getAuth();

  function constructor() {

    /**
     * Tournament form
     *
     * @type {object}
     */
    $scope.form = {
      loading: false,
      errors: [],
      data: {
        name: "My New Tournament",
        prize: 100
      }
    };

    /**
     * Available participants to select
     * @type {Array}
     */
    $scope.participants = [];

    /**
     * @type {string}
     */
    $scope.participantToAdd = "";

    /**
     * Add self as available participants
     */
    $scope.participants.push({
      id: user.id,
      username: user.username,
      add: true
    });

    /**
     * Add all followings to participants
     */
    API.Follow.get({ following: user.id }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.participants.push({
          username: result.user.username,
          id: result.user.id,
          add: false
        });
      });
    });
  }

  $scope.create = function () {
    $scope.form.loading = true;
  };

  constructor();
});
