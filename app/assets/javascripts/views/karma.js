Reddundancy.Views.KarmaView = Backbone.View.extend({
  template: JST["karma"],

  reddundancyClass: "KarmaView",

  initialize: function(options) {
    this.awaitingVoteReturn = false;
    this.listenTo(this.model.vote, "request sync", this.render);
  },

  events: {
    "click button.upvote:not(.active)": "upvote",
    "click button.downvote:not(.active)": "downvote",
    "click button.upvote.active": "removeVote",
    "click button.downvote.active": "removeVote"
  },

  render: function() {
    this.$el.html(this.template({
      model: this.model,
      votingDisabled: this.awaitingVoteReturn
    }));
    return this;
  },

  upvote: function(event) {
    if(!Reddundancy.current_user) { return; }
    if(!this.awaitingVoteReturn) {
      this.disableKarmaButtons();
      this.model.upvote(event, this.enableKarmaButtons.bind(this));
    }
  },

  downvote: function(event) {
    if(!Reddundancy.current_user) { return; }
    if(!this.awaitingVoteReturn) {
      this.disableKarmaButtons();
      this.model.downvote(event, this.enableKarmaButtons.bind(this));
    }
  },

  removeVote: function(event) {
    if(!this.awaitingVoteReturn) {
      this.disableKarmaButtons();
      this.model.removeVote(event, this.enableKarmaButtons.bind(this));
      this.listenTo(this.model.vote, "change sync", this.render);
    }
  },

  disableKarmaButtons: function() {
    this.awaitingVoteReturn = true;
  },

  enableKarmaButtons: function() {
    this.awaitingVoteReturn = false;
  }
});

