"use strict";

app.service("Tournament", function (Account, Main) {
  return function (data) {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {number}
     */
    this.id = data.id;

    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {Account}
     */
    this.user = data.user ? new Account(data.user) : null;

    /**
     * @type {Array<Account>}
     */
    this.participants = [];

    /**
     * @type {number}
     */
    this.status = data.status;

    /**
     * @type {number}
     */
    this.prize = data.prize;

    /**
     * @type {function}
     * @returns {string}
     */
    this.getStatus = function () {
      return Main.tournament.status[this.status];
    };

    /**
     * @private
     * @type {function}
     */
    function constructor() {
      // Instantiate all users
      for (var i in self.get.participants) {
        self.participants.push(new Account(self.get.participants[i]));
      }
    }

    constructor();
  };
});
