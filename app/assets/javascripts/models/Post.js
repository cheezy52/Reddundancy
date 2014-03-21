Seddit.Models.Post = Backbone.Model.extend({
  urlRoot: "/api/posts",

  parse: function(data, options) {
    if(data["already_voted"]) {
      this.vote = new Seddit.Models.Vote({
        votable_id: data["id"],
        votable_type: "Post",
        up: data["upvoted"],
        id: data["vote_id"]
      });
    } else {
      this.vote = new Seddit.Models.Vote({
        votable_id: data["id"],
        votable_type: "Post"
      });
    };
    return data
  }
})