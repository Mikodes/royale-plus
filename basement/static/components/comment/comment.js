"use strict";

app.service("Comment", function (Account, Main, API, toaster, $rootScope) {
  return function (data) {

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {Account}
     */
    this.user = data.user ? new Account(data.user) : null;

    /**
     * @type {string}
     */
    this.comment = this.get.comment;

    /**
     * @type {number}
     */
    this.kind = this.get.kind;

    /**
     * @type {string}
     */
    this.object = this.get.kind;

    /**
     * Used for API calls
     *
     * @type {boolean}
     */
    this.loading = true;

    /**
     * @type {function}
     */
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
