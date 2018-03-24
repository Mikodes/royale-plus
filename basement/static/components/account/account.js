"use strict";

app.service("Account", function (API, Auth, toaster) {
  return function (data, followedId) {

    /**
     * @private
     */
    var self = this;

    /**
     * @private
     * @type {object}
     */
    var currentUser = Auth.getAuth();

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {string}
     */
    this.id = this.get.id;

    /**
     * @type {string}
     */
    this.username = this.get.username;

    /**
     * @type {function}
     * @returns {boolean}
     *
     * @param {Account} user
     */
    this.isSameUser = function () {
      return this.username === currentUser.username;
    };

    /**
     * @type {function}
     *
     * @param pictureId number
     * @returns {string}
     */
    this.getAvatar = function (pictureId) {
      var avatars = [];
      var numArray = Array.from(Array(100).keys());

      angular.forEach(numArray, function (index) {
        avatars[index] = `assets/img/avatars/${index}.jpg`;
      });

      if (pictureId) {
        return avatars[pictureId];
      }

      return avatars[self.get.picture];
    };

    /**
     * @type {object}
     */
    this.follow = {

      /**
       * @type {number}
       */
      id: self.get.followed_id,

      /**
       * @type {number}
       */
      followers: self.get.followers_count,

      /**
       * @type {number}
       */
      followings: self.get.followings_count,

      /**
       * @type {function}
       * @returns {boolean}
       */
      isFollowed: function () {
        return self.follow.id !== false;
      },

      /**
       * @type {function}
       */
      follow: function () {

        // Check auth
        if (!Auth.isAuth()) {
          toaster.error("Unable to follow", "You need to be a member to follow.");
          return;
        }

        // Check following self
        if (self.isSameUser()) {
          toaster.error("Unable to follow", "You can't follow yourself");
          return;
        }

        // Follow
        API.Follow.save({ following: self.username },
          function (data) {
            self.follow.id = data.id;
            self.follow.followers++;
          },
          function (data) {
            toaster.error("Oops", "Somthing went wrong");
          }
        );
      },

      /**
       * @type {function}
       */
      unfollow: function () {

        // Check auth
        if (!Auth.isAuth()) {
          toaster.error("Unable to follow", "You need to be a member to follow.");
          return;
        }

        // Check following self
        if (self.isSameUser()) {
          toaster.error("Unable to follow", "You can't follow yourself");
          return;
        }

        // Unfollow
        API.Follow.delete({ id: self.follow.id },
          function (data) {
            self.follow.id = false;
            self.follow.followers--;
          },
          function (data) {
            toaster.error("Oops", "Somthing went wrong");
          }
        );
      }
    };
  };
});
