Seddit.Models.Comment = Backbone.Model.extend({
  urlRoot: "/api/comments",

  parse: function(data, options) {
    if(data["already_voted"]) {
      this.vote = new Seddit.Models.Vote({
        votable_id: data["id"],
        votable_type: "Comment",
        up: data["upvoted"],
        id: data["vote_id"]
      });
    } else {
      this.vote = new Seddit.Models.Vote({
        votable_id: data["id"],
        votable_type: "Comment"
      });
    };
    return data
  }
})