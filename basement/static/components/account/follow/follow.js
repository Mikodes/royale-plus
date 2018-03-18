"use strict";

app.service("Follow", function (API, Auth, toaster) {
  return function (user) {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {Account}
     */
    this.user = user;

    /**
     * @type {number|boolean}
     */
    this.id = this.user.get.get_follow_id;

    /**
     * @type {function}
     */
    this.follow = function () {

      // Check if user is not authenticated
      if (!Auth.isAuth()) {
        toaster.error("Unable to follow", "You need to be a member to follow.");
        return;
      }

      // Check if following self
      if (this.user.isSameUser()) {
        toaster.error("Unable to follow", "You can't follow yourself");
        return;
      }

      // Follow
      API.Follow.save({ following: this.username },
        function (data) {
          console.log(data);
        },
        function (data) {
          console.log(data);
          toaster.error("Oops", "Somthing went wrong");
        }
      );
    };

    /**
     * @type {function}
     *
     * @param {Account}
     */
    this.unfollow = function (user) {

      // @todo check auth (with toast)

      // Check if unfollowing self
      if (this.user.isSameUser()) {
        // @todo Toast here
        return;
      }

      // @todo unfollow here (with toast)
    };
  };
});
