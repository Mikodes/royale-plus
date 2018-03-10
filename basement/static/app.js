"use strict";

/**
 * App module
 */
var app = angular.module("royalePlus", [
  "ngResource",
  "ngDisqus",
  "ui.router",
  "angularModalService",
  "toaster"
]);

/**
 * App config
 */
app.config(function ($qProvider, $resourceProvider, $locationProvider, $httpProvider, $disqusProvider, ENV) {
  $qProvider.errorOnUnhandledRejections(false);
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $httpProvider.interceptors.push("AuthInterceptor");
  $locationProvider.hashPrefix("!");
  $disqusProvider.setShortname(ENV.DISQUS_SHORTNAME)
});

/**
 * App run
 */
app.run(function (ENV, Auth, toaster, $state, $window, $rootScope, $anchorScroll) {

  /**
   * @type {string}
   */
  $rootScope.version = ENV.VERSION;

  /**
   * @type {string}
   */
  $rootScope.tag = ENV.CLAN_TAG;

  /**
   * @type {string}
   */
  $rootScope.feedback = "mailto:amir@savandbros.com?Subject=Royale Plus v" + $rootScope.version;

  /**
   * @type {string}
   */
  $rootScope.github = ENV.GITHUB;

  /**
   * @type {Date}
   */
  $rootScope.now = new Date();

  /**
   * Page loaded completely
   */
  $rootScope.$on("$viewContentLoaded", function () {
    
    // Scroll up
    $anchorScroll();

    // Close navbar
    angular.element("#navbar").collapse("hide");
  });

  /**
   * Page is starting to change
   */
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    // Check authentication for state
    if (typeof toState.auth !== "undefined") {

      // Conditions
      var authOnly = toState.auth && !Auth.isAuth();
      var unAuthOnly = !toState.auth && Auth.isAuth();

      // State allows (un)authenticated only
      if (authOnly || unAuthOnly) {

        // Stop chaging state
        event.preventDefault();

        // If first view, go home
        if (fromState.name == "") {
          $state.go("app.home");
        }

        // Announce user
        if (authOnly) {
          toaster.error("Not signed in", "You need to sign in first.");
        } else {
          toaster.error("Opps!", "You can not access that page.");
        }
      }
    }
  });

  /**
   * Changed state successfully
   */
  $rootScope.$on("$stateChangeStart", function () {

    // Analytics
    if (ENV.PRODUCTION) {
      $window.ga("send", "pageview", {
        page: $location.url()
      });
    }
  });
});
