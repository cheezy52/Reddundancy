Backbone.VotableModel = Backbone.Model.extend({
  parse: function(data, options) {
    //constructs this.vote - vote is attached to model
    if(data["already_voted"]) {
      this.vote = new RedditLite.Models.Vote({
        votable_id: data["id"],
        votable_type: data["class_name"],
        up: data["upvoted"],
        id: data["vote_id"]
      });
    } else {
      this.vote = new RedditLite.Models.Vote({
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
        $(document).find(".flash").html(response.responseText || 
            "An error occurred.  Please reload the page.");
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
        $(document).find(".flash").html(response.responseText || 
            "An error occurred.  Please reload the page.");
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
        $(document).find(".flash").html(response.responseText || 
            "An error occurred.  Please reload the page.");
        callback();
      }
    });

    //re-initialize fresh, not-yet-persisted vote
    //remember to have views listen to the new model.vote!
    this.vote = new RedditLite.Models.Vote({
      votable_id: this.get("id"),
      votable_type: this.get("class_name")
    });
    this.set("karma", this.get("karma") + karmaDiff);
  }
});