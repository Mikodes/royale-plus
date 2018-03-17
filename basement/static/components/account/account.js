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
  };
});
