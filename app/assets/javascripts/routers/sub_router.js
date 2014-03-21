Seddit.Routers.SubRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "s/:id": "subIndex",
    "posts/:id": "postShow"
  },

  subIndex: function(id) {
    var sub = new Seddit.Models.Sub({
      id: id
    });
    var posts = new Seddit.Collections.SubPosts([], {
      subId: id
    });
    sub.fetch();
    posts.fetch();
    var view = new Seddit.Views.SubIndexView({
      model: sub,
      collection: posts
    });
    this._swapView(view);
  },

  postShow: function(id) {
    var post = new Seddit.Models.Post({
      id: id
    });
    var comments = new Seddit.Collections.PostComments([], {
      postId: id
    });
    post.fetch();
    comments.fetch();
    var view = new Seddit.Views.PostShowView({
      model: post,
      collection: comments
    })
    this._swapView(view)
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})