window.Seddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //get bootstrapped data
    Seddit.ROOT_URL = JSON.parse($("#server_details_json").html()).ROOT_URL;
    var current_user = JSON.parse($("#current_user_json").html());
    //strip trailing slash from URL
    if (Seddit.ROOT_URL[Seddit.ROOT_URL.length - 1] === "/") {
      Seddit.ROOT_URL = Seddit.ROOT_URL.slice(0, -1);
    }
    //check for signed-in user
    if (current_user.signed_in) {
      Seddit.current_user = current_user.id;
    } else {
      Seddit.current_user = null;
    }

    Seddit.pendingRequests = 0;
    $(document).ajaxStart(Seddit.displayLoadingIcon);
    $(document).ajaxStop(Seddit.hideLoadingIcon);

    window.Seddit.router = new Seddit.Routers.SubRouter({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

Seddit.displayLoadingIcon = function() {
  Seddit.pendingRequests += 1;
  $("#loading-icon").removeClass("hidden");
};

Seddit.hideLoadingIcon = function() {
  Seddit.pendingRequests -= 1;
  if(Seddit.pendingRequests === 0) {
    $("#loading-icon").addClass("hidden");
  }
};

Backbone.CompositeView = Backbone.View.extend({
  subviews: function() {
    if(!this._subviews) {
      this._subviews = [];
    }
    return this._subviews;
  },

  addSubview: function(view) {
    //unshift rather than push so that newer entries will be first
    this.subviews().unshift(view)
  },

  removeSubview: function(view) {
    if (this.subviews().indexOf(view) > -1) {
      this.subviews().splice(this.subviews().indexOf(view), 1);
    }
    view.remove();
  },

  findSubviewByModel: function(model) {
    var foundView = null;
    this.subviews().forEach(function(subview) {
      if (subview.model === model) {
        foundView = subview;
      }
    });
    return foundView;
  },

  removeSubviewByModel: function(model) {
    var foundView = this.findSubviewByModel(model);
    if (foundView) {
      this.removeSubview(foundView);
    }
  },

  renderSubviewByModel: function(model) {
    var foundView = this.findSubviewByModel(model);
    if (foundView) {
      this.subviews().indexOf(foundView).render();
    }
  },

  remove: function() {
    this.subviews().forEach(function(subview) {
      subview.remove();
    })
    this.stopListening();
    this.undelegateEvents();
    this.$el.remove();
  }
});

Backbone.VotableModel = Backbone.Model.extend({
  parse: function(data, options) {
    //constructs this.vote - vote is attached to model
    if(data["already_voted"]) {
      this.vote = new Seddit.Models.Vote({
        votable_id: data["id"],
        votable_type: data["class_name"],
        up: data["upvoted"],
        id: data["vote_id"]
      });
    } else {
      this.vote = new Seddit.Models.Vote({
        votable_id: data["id"],
        votable_type: data["class_name"]
      });
    };
    return data
  },

  upvote: function(event, callback) {
    this.vote.save({ "up": true }, {
      success: function(model) {
        callback();
      },
      error: function(model, response) {
        callback();
      }
    });

    var karmaDiff = this.vote.isNew() ? 1 : 2;
    this.set("karma", this.get("karma") + karmaDiff);
  },

  downvote: function(event, callback) {
    this.vote.save({ "up": false }, {
      success: function(model) {
        callback();
      },
      error: function(model, response) {
        callback();
      }
    });

    var karmaDiff = this.vote.isNew() ? -1 : -2;
    this.set("karma", this.get("karma") + karmaDiff);
  },

  removeVote: function(event, callback) {
    var karmaDiff = this.vote.get("up") ? -1 : 1;
    this.vote.destroy({
      success: function(model) {
        callback();
      },
      error: function(model, response) {
        callback();
      }
    });

    //re-initialize fresh, not-yet-persisted vote
    //remember to have views listen to the new model.vote!
    this.vote = new Seddit.Models.Vote({
      votable_id: this.get("id"),
      votable_type: this.get("class_name")
    });
    this.set("karma", this.get("karma") + karmaDiff);
  }
});

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

$(document).ready(function(){
  Seddit.initialize();
});