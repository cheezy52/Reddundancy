Seddit.Views.PostView = Backbone.VotableView.extend({
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
    //call super
    Backbone.VotableView.prototype.initialize.call(this, options);
    this.listenTo(this.model.vote, "request sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({
      post: this.model,
      votingDisabled: this.awaitingVoteReturn
    }));
    return this;
  }
})