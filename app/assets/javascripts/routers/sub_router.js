Seddit.Routers.SubRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  }

  routes: {
    "": "subIndex",
    "posts/:id": "postShow"
  },

  index: function() {
    var view = new Seddit.Views.SubIndexView({
      model: null,
      collection: null
    });
    this._swapView(view);
  },

  postShow: function(id) {
    var view = new Seddit.Views.PostShowView({
      model: null,
      collection: null
    })
    this._swapView(view)
  },

  _swapView: function(view) {
    this._currentView && this._currentView.destroy();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})