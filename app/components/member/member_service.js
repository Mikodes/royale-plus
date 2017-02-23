"use strict";

app.service("Member", function (Scores, Tag) {
  return function (name, role, rarity, donation, tags) {
    var self = this;

    this.name = name;
    this.role = role;
    this.rarity = rarity;
    this.donation = donation;
    this.tags = [];
    this.score = (
      Scores.role[this.role] +
      Scores.donation[this.donation] +
      Scores.rarity[this.rarity] +
      Scores.tag * this.tags.length
    );

    this.hasTag = function (tag) {
      return this.tags ? this.tags.indexOf(tag) !== -1 : false;
    };

    function constructor() {
      angular.forEach(tags, function (tag) {
        self.tags.push(new Tag(tag));
      });
    }

    constructor();
  };
});
