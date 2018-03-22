"use strict";

app.service("Activity", function (Main) {
  return function (data) {

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {function}
     * @returns {string}
     */
    this.getKind = function () {
      return Main.activity.kind[this.get.kind];
    };

    /**
     * @type {function}
     * @returns {string|null}
     */
    this.getLink = function () {
      // User activity
      if (this.getKind() == "User") {
        // Comment
        if (this.get.content.indexOf("commented") === 0) {
          return "app.user({username: activity.get.issued})";
        }
        // Register
        if (this.get.content.indexOf("joined") === 0) {
          return "app.user({username: activity.get.issuer})";
        }
      }
      // Deck activity
      if (this.getKind() == "Deck") {
        return "app.deck({id: activity.get.issued})";
      }
    };

    /**
     * @type {function}
     * @returns {string}
     */
    this.getIcon = function () {
      // User activity
      if (this.getKind() === "User") {
        // Comment
        if (this.get.content.indexOf("commented") === 0) {
          return "comments";
        }
        // Register
        if (this.get.content.indexOf("joined") === 0) {
          return "user-plus";
        }
      }
      // Deck activity
      if (this.getKind() === "Deck") {
        return "cube";
      }
      // Default
      return "info-circle";
    };

    /**
     * @type {function}
     * @returns {boolean}
     */
    this.hasUser = function () {
      return this.getKind() === "User" || this.getKind() === "Deck";
    };
  };
});
