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
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.model, "remove", this.destroy);
  },

  render: function() {
    this.$el.html(this.template({
      comment: this.model
    }));
    return this;
  }
})