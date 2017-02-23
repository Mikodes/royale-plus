"use strict";

app.service("Tag", function (Tags) {
  return function (name) {
    this.name = name;
    this.font = Tags[name].font;
    this.sentence = Tags[name].sentence;
  };
});
