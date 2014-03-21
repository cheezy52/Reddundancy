Seddit.Models.Comment = Backbone.Model.extend({
  urlRoot: "/api/comments",

  parse: function(data, options) {
    this.vote = new Seddit.Models.Vote({
      votable_id: this.get("id"),
      votable_type: "Post"
    });
    if(data["already_voted"]) {
      this.vote.set({
        up: data["upvoted"]
      });
    }
  }
})