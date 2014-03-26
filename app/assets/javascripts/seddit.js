window.Seddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //get bootstrapped data
    Seddit.ROOT_URL = JSON.parse($("#server_details_json").html()).ROOT_URL;
    var current_user = JSON.parse($("#current_user_json").html());
    //strip trailing slash from URL
    if (Seddit.ROOT_URL[Seddit.ROOT_URL.length - 1] === "/") {
      Seddit.ROOT_URL = Seddit.ROOT_URL.slice(0, -1);
    }
    //check for signed-in user
    if (current_user.signed_in) {
      Seddit.current_user = current_user.id;
    } else {
      Seddit.current_user = null;
    }

    Seddit.pendingRequests = 0;
    $(document).ajaxStart(Seddit.displayLoadingIcon);
    $(document).ajaxStop(Seddit.hideLoadingIcon);

    window.Seddit.router = new Seddit.Routers.SubRouter({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

Seddit.displayLoadingIcon = function() {
  Seddit.pendingRequests += 1;
  $("#loading-icon").removeClass("hidden");
};

Seddit.hideLoadingIcon = function() {
  Seddit.pendingRequests -= 1;
  if(Seddit.pendingRequests === 0) {
    $("#loading-icon").addClass("hidden");
  }
};

$(document).ready(function(){
  Seddit.initialize();
});