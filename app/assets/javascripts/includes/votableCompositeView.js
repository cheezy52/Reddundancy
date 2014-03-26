Backbone.VotableCompositeView = Backbone.CompositeView.extend({
  getSubview: function(event) {
    var id = $(event.target).data("id");
    var model = this.collection.get(id);
    var modelView = this.findSubviewByModel(model);
    return modelView;
  },

  //fake multiple inheritance
  upvote: function(event) {
    if ($(event.target).data("model") === this.model.get("class_name")) {
      Backbone.VotableView.prototype.upvote.call(this, event);
    } else {
      Backbone.VotableView.prototype.upvote.call(this.getSubview(event), event);
    }
  },

  downvote: function(event) {
    if ($(event.target).data("model") === this.model.get("class_name")) {
      Backbone.VotableView.prototype.downvote.call(this, event);
    } else {
      Backbone.VotableView.prototype.downvote.call(this.getSubview(event), event);
    }
  },

  removeVote: function(event) {
    if ($(event.target).data("model") === this.model.get("class_name")) {
      Backbone.VotableView.prototype.removeVote.call(this, event);
    } else {
      Backbone.VotableView.prototype.removeVote.call(this.getSubview(event), event);
    }
  },

  disableKarmaButtons: function() {
    Backbone.VotableView.prototype.disableKarmaButtons.call(this);
  },

  enableKarmaButtons: function() {
    Backbone.VotableView.prototype.enableKarmaButtons.call(this);
  },

  addKarmaEvents: function() {
    Backbone.VotableView.prototype.addKarmaEvents.call(this);
  },

  initialize: function(options) {
    Backbone.VotableView.prototype.initialize.call(this, options);
  }
});