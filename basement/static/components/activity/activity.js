"use strict";

app.service("Activity", function (Main) {
  return function (data) {

    var activityKindIcon = [
      "flag",
      "info",
      "user-plus",
      "cube"
    ];

    this.get = data;

    this.getKind = function () {
      return Main.activity.kind[this.get.kind];
    };

    // Get ui-sref
    this.getLink = function () {

      if (this.getKind() == "User") {
        if (this.get.content.indexOf("commented") === 0) {
          return "app.user({username: activity.get.issued})";
        }

        if (this.get.content.indexOf("joined") === 0) {
          return "app.user({username: activity.get.issuer})";
        }
      }

      if (this.getKind() == "Deck") {
        return "app.deck({id: activity.get.issued})";
      }
    };

    this.getIcon = function () {
      if (this.get.kind == 2) {
        if (this.get.content.indexOf("commented") === 0) {
          return "comment-alt";
        }

        if (this.get.content.indexOf("joined") === 0) {
          return "user-plus ";
        }
      }

      return activityKindIcon[this.get.kind];
    };

    this.hasUser = function () {
      return this.getKind() === "User" || this.getKind() === "Deck";
    };
  };
});
