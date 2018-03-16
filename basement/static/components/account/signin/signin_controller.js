"use strict";

app.controller("SignInController", function (Auth, API, toaster, $scope, $state) {

  this.signIn = function (form) {
    form.loading = true;
    console.log("ss");

    API.SignIn.post({ username: form.username, password: form.password }, function (data) {
      Auth.setAuth(data.user, data.token);
      form.loading = false;
      toaster.info("Signed in", "Welcome to the awesomeness " + form.username + ".");
      $state.go("app.user", { username: form.username, user: Auth.getAuth() });

    }, function (data) {
      toaster.error("Unable to Sign in", "Incorrect username or password.");
      form.loading = false;
      form.error = data.data;
    });
  };
});
