"use strict";

app.controller("SettingsController", function (Auth, API, Account, toaster, $scope, $rootScope, $state) {

  var user = Auth.getAuth();

  function constructor() {
    $scope.userInstance = new Account(Auth.getAuth);
    $scope.avatars = new Array(100);

    API.Users.get({ username: user.username }, function (data) {
      $scope.form.data = {
        email: data.email,
        about: data.about,
        member: data.member,
        link: data.link,
        nationality: data.nationality,
        picture: data.picture,
        username: data.username
      };
    });
  }

  /**
   * @desc Set avatar and update
   * @param picture number
   */
  $scope.setAvatar = function (picture) {
    $scope.form.data.picture = picture;
    $scope.update($scope.form);
  };

  $scope.update = function (form) {
    form.loading = true;

    // Remove hash from player tag
    if (form.data.member && form.data.member.indexOf("#") !== -1) {
      form.data.member = form.data.member.replace("#", "");
    }

    API.Settings.put({}, form.data,
      function (data) {
        form.loading = false;
        form.error = null;
        form.data = data;
        toaster.info("Updated", "Your pofile settings are updated.");

        // Broadcast user update
        $rootScope.$broadcast("royalePlus.Auth:updateAuth");
      },
      function (data) {
        form.loading = false;
        form.error = data.data;
      }
    );
  };

  constructor();
});
