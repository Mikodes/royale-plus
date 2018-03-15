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
    this.create = function () {
      API.Comments.save({
          kind: this.kind,
          object: this.object,
          comment: this.comment
        },
        function (data) {
          $rootScope("royalePlus.Comment:create", data);
          toaster("Done", "Succesfully commented.");
          this.loading = false;
        },
        function () {
          toaster("Ops", "Failed to comment, try again later.");
          this.loading = false;
        }
      );
    };
  };
});
