"use strict";

app.filter("underspace", function () {
  return function (input) {
    if (input) {
      return input.replace(/_/g, " ");
    }
  };
});
