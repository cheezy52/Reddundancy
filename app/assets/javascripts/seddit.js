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
       //allow nav dropdown sorting
       $("#favorited-subs").sortable();
    } else {
      Seddit.current_user = null;
    }

    Seddit.pendingRequests = 0;
    $(document).ajaxStart(Seddit.displayLoadingIcon);
    $(document).ajaxStop(Seddit.hideLoadingIcon);

    window.Seddit.router = new Seddit.Routers.Router({
      $rootEl: $("#content")
    });

    //initialize navbar dropdown watcher
    var userFavorites = new Seddit.Collections.UserFavorites({}, {
      userId: Seddit.current_user
    });
    userFavorites.fetch({
      success: function() {
        window.Seddit.navFavoritesView = new Seddit.Views.NavFavoritesView({
          el: "#favorited-subs",
          collection: userFavorites
        })
      }
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
  if($(".backbone-trigger").length > 0) {
    Seddit.initialize();
  }
});