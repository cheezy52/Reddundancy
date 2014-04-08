RedditLite.Views.CommentView = Backbone.CompositeView.extend({
  template: JST["comment"],

  redditLiteClass: "CommentView",

  tagName: "ul",

  className: "comment",

  attributes: function() {
    return {
      "data-id": this.model.get("id")
    }
  },

  events: {

  },

  initialize: function(options) {
    this.addSubview(new RedditLite.Views.KarmaView({
      model: this.model
    }));
    this.addSubview(new RedditLite.Views.FormView({
      model: this.model,
      collection: this.collection,
      formClassName: "comment"
    }))
    //pseudo-render to get elements in place for full render
    this.$el.html(this.template({ comment: this.model }));
  },

  render: function() {
    var view = this;

    //re-render only own info, without clearing child comments from subShowView
    this.$el.children().first().remove();
    this.$el.prepend(this.template({ comment: this.model }));

    this.subviews().forEach(function(subview) {
      if(subview.redditLiteClass === "KarmaView") {
        view.$el.find(".karma-container").first().html(subview.render().$el);
      } else if(subview.redditLiteClass === "FavoriteView") {
        view.$el.find(".submission-buttons").first().append(subview.render().$el);
      } else if(subview.redditLiteClass === "FormView") {
        view.$el.find(".form-container").first().append(subview.render().$el);
      } else {
        view.$el.prepend(subview.render().$el);
      }
      subview.delegateEvents();
    });
    return this;
  }
})