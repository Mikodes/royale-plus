"use strict";

app.service("Account", function (ENV) {
  return function (data) {

    var defaultImage = "static/assets/img/avatar.png?v=" + ENV.VERSION;

    this.get = data;

    this.username = this.get.username;

    this.image = this.get.image || defaultImage;
  };
});
