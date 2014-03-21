Seddit.Views.PostView = Backbone.View.extend({
  template: JST["post"],

  tagName: "li",

  attributes: function() {
    return {
      "data-id": this.model.get("id")
    }
  },

  className: "post",

  events: {

  },

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render)
    this.listenTo(this.model, "remove", this.destroy)
  },

  render: function() {
    this.$el.html(this.template({
      post: this.model
    }));
    return this;
  }
})