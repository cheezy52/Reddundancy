RedditLite.Models.Vote = Backbone.Model.extend({
  urlRoot: function() {
    return RedditLite.ROOT_URL + "/api/votes";
  },

  redditLiteClass: "Vote"
});