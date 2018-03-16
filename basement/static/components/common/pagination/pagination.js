"use strict";

app.service("Pagination", function ($resource, $rootScope) {
  return function (call, payload) {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {object}
     */
    this.payload = payload;

    /**
     * @type {string}
     */
    this.next = null;

    /**
     * @type {boolean}
     */
    this.loading = true;

    /**
     * @type {function}
     *
     * @param {function} call
     */
    this.constructor = function (call) {
      call(this.payload, this.loaded);
    };

    /**
     * @type {function}
     */
    this.loadMore = function () {
      $resource(this.next).get(this.payload, this.loaded);
    };

    /**
     * @type {function}
     */
    this.loaded = function (data) {
      self.loading = false;
      self.next = data.next;
      $rootScope.$broadcast("royalePlus.Pagination:loaded", data);
    };

    this.constructor(call);
  };
});
