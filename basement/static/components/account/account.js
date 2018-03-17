"use strict";

app.service("Account", function (ENV, Auth, toaster) {
  return function (data) {

    /**
     * @private
     */
    var self = this;

    /**
     * @private
     * @type {string}
     */
    var defaultImage = "static/assets/img/avatar.png?v=" + ENV.VERSION;

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {string}
     */
    this.username = this.get.username;

    /**
     * @type {string}
     */
    this.picture = this.get.picture || defaultImage;

    /**
     * @type {function}
     * @returns {boolean}
     *
     * @param {Account} user
     */
    this.isSameUser = function () {
      return this.username === Auth.getAuth().username;
    };

    /**
     * @type {function}
     *
     * @param {Account} user
     */
    this.follow = function (user) {

      if (!Auth.isAuth()) {
        toaster.error("Unable to follow", "You need to be a member to follow.");
        return;
      }

      // Check if following self
      if (this.isSameUser()) {
        toaster.error("Unable to follow", "You can't follow yourself");
        return;
      }

      // @todo follow here (with toast)
    };

    /**
     * @type {function}
     *
     * @param {Account}
     */
    this.unfollow = function (user) {

      // @todo check auth (with toast)

      // Check if unfollowing self
      if (this.isSameUser()) {
        // @todo Toast here
        return;
      }

      // @todo unfollow here (with toast)
    };
  };
});
