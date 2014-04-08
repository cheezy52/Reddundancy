window.RedditLite = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //get bootstrapped data
    RedditLite.ROOT_URL = JSON.parse($("#server_details_json").html()).ROOT_URL;
    var current_user = JSON.parse($("#current_user_json").html());
    //strip trailing slash from URL
    if (RedditLite.ROOT_URL[RedditLite.ROOT_URL.length - 1] === "/") {
      RedditLite.ROOT_URL = RedditLite.ROOT_URL.slice(0, -1);
    }
    //check for signed-in user
    if (current_user.signed_in) {
      RedditLite.current_user = current_user.id;
       //allow nav dropdown sorting
       $("#favorited-subs").sortable();
    } else {
      RedditLite.current_user = null;
    }

    RedditLite.pendingRequests = 0;
    $(document).ajaxStart(RedditLite.displayLoadingIcon);
    $(document).ajaxStop(RedditLite.hideLoadingIcon);

    window.RedditLite.router = new RedditLite.Routers.Router({
      $rootEl: $("#content")
    });

    //initialize navbar dropdown watcher
    var userFavorites = new RedditLite.Collections.UserFavorites({}, {
      userId: RedditLite.current_user
    });
    userFavorites.fetch({
      success: function() {
        window.RedditLite.NavFavoritesView = new RedditLite.Views.NavFavoritesView({
          el: "#favorited-subs",
          collection: userFavorites
        })
      }
    });

    Backbone.history.start();
  }
};

RedditLite.displayLoadingIcon = function() {
  RedditLite.pendingRequests += 1;
  $("#loading-icon").removeClass("hidden");
};

RedditLite.hideLoadingIcon = function() {
  RedditLite.pendingRequests -= 1;
  if(RedditLite.pendingRequests === 0) {
    $("#loading-icon").addClass("hidden");
  }
};

$(document).ready(function(){
  if($(".backbone-trigger").length > 0) {
    RedditLite.initialize();
  }
});