RedditLite.Models.Post = Backbone.VotableModel.extend({
  urlRoot: function() {
    return RedditLite.ROOT_URL + "/api/posts";
  },

  redditLiteClass: "Post"
})