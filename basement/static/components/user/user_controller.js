"use strict";

app.controller("UserController", function (API, Activity, Account, Auth, Comment, Common, Main, toaster, $scope, $state, $stateParams) {

  function constructor() {

    // Get user from param
    $scope.user = $stateParams.user;

    /**
     * @type {Comment}
     */
    $scope.comment = new Comment({
      target: $stateParams.username,
      kind: Main.comment.kind.indexOf("User")
    });

    /**
     * @type {Array<Activity>}
     */
    $scope.activities = [];

    /**
     * @type {Array<Comment>}
     */
    $scope.comments = [];

    // Get user from API
    if (!$scope.user) {
      API.Users.get({ username: $stateParams.username },
        function (data) {
          $scope.user = new Account(data);
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

    // Get comments
    API.Comments.get({
        limit: 30,
        target: $scope.comment.target,
        kind: $scope.comment.kind
      },
      function (data) {
        angular.forEach(data.results, function (result) {
          $scope.comments.push(new Comment(result));
        });
      }
    );
  }
  /**
   * @param {boolean} showFollowers
   */
  $scope.showFollows = function (showFollowers) {
    var payload = { following: $scope.user.username };
    var usersKey = "user";
    var title = "Followers";

    if (!showFollowers) {
      payload = { user: $scope.user.username };
      usersKey = "following";
      title = "Following";
    }

    API.Follow.get(payload, function (data) {
      var users = [];
      angular.forEach(data.results, function (result) {
        users.push(new Account(result[usersKey], result.id));
      });
      Common.modal("account/user_list/user_list.html", {
        users: users,
        title: title
      });
    });
  };

  $scope.$on("royalePlus.Comment:create", function (event, data) {
    $scope.comments.unshift(new Comment(data));
  });

  constructor();
});
