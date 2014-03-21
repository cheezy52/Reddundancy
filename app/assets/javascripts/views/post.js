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
    this.listenTo(this.model.vote, "sync", this.updateVoteStatus)
    this.listenTo(this.model.vote, "destroy", this.removeVote)
  },

  render: function() {
    this.$el.html(this.template({
      post: this.model
    }));
    return this;
  },

  updateVoteStatus: function(vote) {
    this.model.set({
      "upvoted": vote.get("up")
    });
    this.render();
  },

  removeVote: function() {
    this.model.vote.unset("id");
    this.model.vote.unset("up");
    this.render();
  }
})