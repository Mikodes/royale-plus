"use strict";

app.service("Account", function (ENV) {
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
    this.isSameUser = function (user) {
      return this.username === user.username;
    };

    /**
     * @type {function}
     *
     * @param {Account} user
     */
    this.follow = function (user) {

      // @todo check auth (with toast)

      // Check if following self
      if (this.isSameUser(user)) {
        // @todo Toast here
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
      if (this.isSameUser(user)) {
        // @todo Toast here
        return;
      }

      // @todo unfollow here (with toast)
    };
  };
});
