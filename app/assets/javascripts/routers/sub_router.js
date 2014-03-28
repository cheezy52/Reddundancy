Seddit.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "subsIndex",
    "s": "subsIndex",
    "s/": "subsIndex",
    "s/:id": "subShow",
    "posts/:id": "postShow"
  },

  subsIndex: function(id) {
    $("#loading-icon").removeClass("hidden");
    var router = this;
    var subs = new Seddit.Collections.Subs();
    subs.fetch({
      data: { page: 1 },
      success: function(models) {
        var view = new Seddit.Views.SubsIndexView({
          collection: subs
        });
        router._swapView(view);
      },
      error: function() {
        router.$rootEl.html("Loading failed :(");
      }
    });
  },

  subShow: function(id) {
    $("#loading-icon").removeClass("hidden");
    var router = this;
    var sub = new Seddit.Models.Sub({
      id: id
    });
    var posts = new Seddit.Collections.SubPosts([], {
      subId: id,
    });
    //wait until we have sub info to prevent confusing renders
    sub.fetch({
      success: function(model) {
        var view = new Seddit.Views.SubShowView({
          model: sub,
          collection: posts
        });
        router._swapView(view);
      },
      error: function() {
        router.$rootEl.html("Loading failed :(");
      }
    });
    posts.fetch({
      data: { page: 1 }
    });
  },

  postShow: function(id) {
    $("#loading-icon").removeClass("hidden");
    var router = this;
    var post = new Seddit.Models.Post({
      id: id
    });
    var comments = new Seddit.Collections.PostComments([], {
      postId: id
    });
    //wait until we have post info to prevent confusing renders
    post.fetch({
      success: function(model) {
        var view = new Seddit.Views.PostShowView({
          model: post,
          collection: comments
        });
        router._swapView(view);
      },
      error: function() {
        router.$rootEl.html("Loading failed :(");
      }
    });
    comments.fetch();
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
    $("#loading-icon").addClass("hidden");
  }
})