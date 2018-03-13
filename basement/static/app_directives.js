"use strict";

app.directive("onload", ["$parse", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, elem, attrs) {
      var fn = $parse(attrs.sbLoad);
      elem.on("load", function (event) {
        scope.$apply(function () {
          fn(scope, { $event: event });
        });
      });
    }
  };
}]);

app.directive("input", function () {
  return {
    restrict: "E",
    require: "ngModel",
    link: function ($scope, element, attr, ctrl) {
      // Ignore other kind of button groups (e.g. buttons-radio)
      if (!element.parent("[data-toggle='buttons-checkbox'].btn-group").length) {
        return;
      }
      // Set/unset active class when model changes
      $scope.$watch(attr.ngModel, function (newValue, oldValue) {
        element.toggleClass("active", ctrl.$viewValue);
      });
      // update model when button is clicked
      element.bind("click", function (e) {
        $scope.$apply(function (scope) {
          ctrl.$setViewValue(!ctrl.$viewValue);
        });
        // Don't let Bootstrap.js catch this event as we are overriding its data-toggle behavior.
        e.stopPropagation();
      });
    }
  };
});
