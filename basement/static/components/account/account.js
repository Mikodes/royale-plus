"use strict";

app.service("Account", function (ENV, API, Auth, toaster) {
  return function (data) {

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
     * @private
     * @type {string}
     */
    var defaultImage = "static/assets/img/avatar.png?v=" + ENV.VERSION;

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {string}
     */
    this.username = this.get.username;

    /**
     * @type {string}
     */
    this.picture = this.get.picture || defaultImage;

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

        // Check if user is not authenticated
        if (!Auth.isAuth()) {
          toaster.error("Unable to follow", "You need to be a member to follow.");
          return;
        }

        // Check if following self
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

        // @todo check auth (with toast)

        // Check if unfollowing self
        if (self.isSameUser()) {
          // @todo Toast here
          return;
        }

        // @todo unfollow here (with toast)
      }
    };
  };
});
