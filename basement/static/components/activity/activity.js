"use strict";

app.service("Activity", function (Main) {
  return function (data) {

    var activityKindIcon = [
      "info-circle",
      "upload",
      "user-plus",
      "cube"
    ]

    this.get = data;

    this.getKind = function () {
      return Main.activity.kind[this.get.kind];
    }

    this.getIcon = function () {
      return activityKindIcon[this.get.kind]
    }

    this.hasUser = function () {
      return this.getKind() === "User" || this.getKind() === "Deck";
    }
  };
});
