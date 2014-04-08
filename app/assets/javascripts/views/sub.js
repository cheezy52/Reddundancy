RedditLite.Views.SubRedditLiteView = Backbone.CompositeView.extend({
  template: JST["sub"],

  redditLiteClass: "SubRedditLiteView",

  tagName: "li",

  initialize: function(options) {
    this.addSubview(new RedditLite.Views.FavoriteView({
      model: this.model
    }));
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({
      sub: this.model
    }));

    this.subviews().forEach(function(subview) {
      if(subview.redditLiteClass === "FavoriteView") {
        view.$el.find(".submission-buttons").prepend(subview.render().$el);
      } else {
        view.$el.prepend(subview.render().$el);
      }
      subview.delegateEvents();
    })
    return this;
  }

});