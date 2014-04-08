RedditLite.Views.PostView = Backbone.CompositeView.extend({
  template: JST["post"],

  tagName: "li",

  attributes: function() {
    return {
      "data-id": this.model.get("id")
    }
  },

  className: "post row",

  redditLiteClass: "PostView",

  events: {

  },

  initialize: function(options) {
    this.addSubview(new RedditLite.Views.KarmaView({
      model: this.model
    }));
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({
      post: this.model
    }));
    this.subviews().forEach(function(subview) {
      view.$el.prepend(subview.render().$el);
      subview.delegateEvents();
    })
    return this;
  }
})