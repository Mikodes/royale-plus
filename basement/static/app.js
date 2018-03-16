"use strict";

/**
 * App module
 */
var app = angular.module("royalePlus", [
  "ngResource",
  "ui.router",
  "angularModalService",
  "toaster"
]);

/**
 * App config
 */
app.config(function ($qProvider, $resourceProvider, $locationProvider, $httpProvider, $compileProvider, ENV) {
  $qProvider.errorOnUnhandledRejections(false);
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $httpProvider.interceptors.push("AuthInterceptor");
  $locationProvider.hashPrefix("");
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|sms|tel|clashroyale):/);
});

/**
 * App run
 */
app.run(function (ENV, Auth, toaster, $state, $window, $rootScope, $anchorScroll) {

  /**
   * @type {function}
   * @returns {string}
   *
   * @param {string} url
   */
  $rootScope.static = function (url) {
    return ENV.STATIC_URL + url + "?v=" + ENV.VERSION;
  };

  /**
   * @type {string}
   */
  $rootScope.version = ENV.VERSION;

  /**
   * @type {string}
   */
  $rootScope.feedback = "mailto:amir@savandbros.com?Subject=Royale Plus v" + ENV.VERSION;

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
  });

  /**
   * Page is starting to change
   */
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    // Close navbar
    angular.element("#navbar").collapse("hide");

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
  $rootScope.$on("$stateChangeSuccess", function () {

    // Analytics
    if (ENV.PRODUCTION) {
      var page = $window.location.href.split("#!")[1];
      $window.ga("send", "pageview", { page: page });
    }
  });

  /**
   * On hash change (URL)
   */
  angular.element($window).on("hashchange", function () {

    // Remove modal backdrop when there's no modal
    if (angular.element(".modal").length < 1) {
      angular.element(".modal-backdrop").fadeOut(this.remove);
    }
  });
});
