Seddit.Views.PostView = Backbone.View.extend({
  template: JST["post"],

  tagName: "li",

  attributes: function() {
    return {
      "data-id": this.model.get("id")
    }
  },

  className: "post row",

  events: {

  },

  initialize: function(options) {
    this.listenTo(this.model.vote, "sync", this.render)
  },

  render: function() {
    this.$el.html(this.template({
      post: this.model
    }));
    return this;
  }
})