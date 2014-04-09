window.Reddundancy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //get bootstrapped data
    Reddundancy.ROOT_URL = JSON.parse($("#server_details_json").html()).ROOT_URL;
    var current_user = JSON.parse($("#current_user_json").html());
    //strip trailing slash from URL
    if (Reddundancy.ROOT_URL[Reddundancy.ROOT_URL.length - 1] === "/") {
      Reddundancy.ROOT_URL = Reddundancy.ROOT_URL.slice(0, -1);
    }
    //check for signed-in user
    if (current_user.signed_in) {
      Reddundancy.current_user = current_user.id;
       //allow nav dropdown sorting
       $("#favorited-subs").sortable();
    } else {
      Reddundancy.current_user = null;
    }

    Reddundancy.pendingRequests = 0;
    $(document).ajaxStart(Reddundancy.displayLoadingIcon);
    $(document).ajaxStop(Reddundancy.hideLoadingIcon);

    window.Reddundancy.router = new Reddundancy.Routers.Router({
      $rootEl: $("#content")
    });

    //initialize navbar dropdown watcher
    var userFavorites = new Reddundancy.Collections.UserFavorites({}, {
      userId: Reddundancy.current_user
    });
    userFavorites.fetch({
      success: function() {
        window.Reddundancy.NavFavoritesView = new Reddundancy.Views.NavFavoritesView({
          el: "#favorited-subs",
          collection: userFavorites
        })
      }
    });

    Backbone.history.start();
  }
};

Reddundancy.displayLoadingIcon = function() {
  Reddundancy.pendingRequests += 1;
  $("#loading-icon").removeClass("hidden");
};

Reddundancy.hideLoadingIcon = function() {
  Reddundancy.pendingRequests -= 1;
  if(Reddundancy.pendingRequests === 0) {
    $("#loading-icon").addClass("hidden");
  }
};

$(document).ready(function(){
  if($(".backbone-trigger").length > 0) {
    Reddundancy.initialize();
  }
});