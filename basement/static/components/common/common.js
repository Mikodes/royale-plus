"use strict";

app.service("Common", function (ENV, ModalService) {

  var self = this;

  this.component = function (componentUrl) {
    return ENV.STATIC_URL + "components/" + componentUrl;
  };

  this.image = function (imageUrl) {
    return ENV.STATIC_URL + "assets/img/" + imageUrl;
  };

  this.modal = function (componentUrl, data) {
    ModalService.showModal({
      bodyClass: "modal-open",
      templateUrl: self.component(componentUrl),
      controller: function ($scope, $element, close) {
        angular.forEach(data, function (value, key) {
          $scope[key] = value;
        });
      }
    }).then(function (modal) {
      modal.element.modal();
    });
  };
});
