"use strict";

app.service("Comment", function (Main) {
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
      return Main.comment.kind[this.get.kind];
    };
  };
});
