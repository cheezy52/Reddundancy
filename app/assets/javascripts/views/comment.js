Seddit.Views.CommentView = Backbone.View.extend({
  template: JST["comment"],

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
    this.listenTo(this.model.vote, "sync", this.render);
    //pseudo-render to get elements in place for full render
    this.$el.html(this.template({ comment: this.model }));
  },

  render: function() {
    //re-render only own info, without clearing child comments from subShowView
    this.$el.children().first().remove();
    this.$el.prepend(this.template({
      comment: this.model
    }));
    return this;
  }
})