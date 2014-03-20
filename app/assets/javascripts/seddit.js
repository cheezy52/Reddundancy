window.Seddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.Seddit.Routers.router = new Seddit.Routers.SubRouter({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  if($("#backbone-trigger").length) {
    Seddit.initialize();
  }
});
