Seddit.Routers.SubRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "subsIndex",
    "s/:id": "subShow",
    "posts/:id": "postShow"
  },

  subsIndex: function(id) {
    var subs = new Seddit.Collections.Subs();
    var router = this;
    this.$rootEl.html("Loading...")
    subs.fetch({
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
    var router = this;
    var sub = new Seddit.Models.Sub({
      id: id
    });
    var posts = new Seddit.Collections.SubPosts([], {
      subId: id
    });
    sub.fetch();
    posts.fetch({
      success: function() {
        var view = new Seddit.Views.SubShowView({
          model: sub,
          collection: posts
        });
        router._swapView(view);
      }, error: function() {
        router.$rootEl.html("Loading failed :(");
      }
    });
  },

  postShow: function(id) {
    var router = this;
    var post = new Seddit.Models.Post({
      id: id
    });
    var comments = new Seddit.Collections.PostComments([], {
      postId: id
    });
    post.fetch();
    comments.fetch({
      success: function() {
        var view = new Seddit.Views.PostShowView({
          model: post,
          collection: comments
        });
        router._swapView(view);
      }, error: function() {
        router.$rootEl.html("Loading failed :(");
      }
    });
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})