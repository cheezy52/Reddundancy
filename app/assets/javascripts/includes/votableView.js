Backbone.VotableView = Backbone.View.extend({
  upvote: function(event) {
    if(!this.awaitingVoteReturn) {
      this.disableKarmaButtons();
      this.model.upvote(event, this.enableKarmaButtons.bind(this));
    }
  },

  downvote: function(event) {
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
  },

  addKarmaEvents: function() {
    this.events["click button.upvote:not(.active)"] = "upvote";
    this.events["click button.downvote:not(.active)"] = "downvote";
    this.events["click button.upvote.active"] = "removeVote";
    this.events["click button.downvote.active"] = "removeVote";
  },

  initialize: function(options) {
    this.awaitingVoteReturn = false;
    this.addKarmaEvents();
  }
});

