"use strict";

app.service("Common", function (ModalService) {

  var self = this;

  this.component = function (componentUrl) {
    return "static/components/" + componentUrl;
  };

  this.image = function (imageUrl) {
    return "static/assets/img/" + imageUrl;
  };

  this.modal = function (componentUrl, data) {
    ModalService.showModal({
      bodyClass: "modal-open",
      templateUrl: self.component("card/card.html"),
      controller: function ($scope, $element, close) {
        $scope.data = data;
      }
    }).then(function (modal) {
      modal.element.modal();
    });
  };
});
