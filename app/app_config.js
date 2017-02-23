"use strict";

app.config(function ($locationProvider, $qProvider, $disqusProvider) {

  // Hashbang
  $locationProvider.hashPrefix('!');

  // Q
  $qProvider.errorOnUnhandledRejections(false);

  // Disqus
  $disqusProvider.setShortname("donate-clan");
});
