"use strict";

app.service("Account", function (ENV, API, Auth, Follow, toaster) {
  return function (data) {

    /**
     * @private
     */
    var self = this;

    /**
     * @private
     * @type {object}
     */
    var currentUser = Auth.getAuth();

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
     * @type {Follow}
     */
    this.follow = new Follow(this);

    /**
     * @type {function}
     * @returns {boolean}
     *
     * @param {Account} user
     */
    this.isSameUser = function () {
      return this.username === currentUser.username;
    };
  };
});
