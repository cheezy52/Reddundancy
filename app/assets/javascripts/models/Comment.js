RedditLite.Models.Comment = Backbone.VotableModel.extend({
  urlRoot: function() {
    return RedditLite.ROOT_URL + "/api/comments"
  },

  redditLiteClass: "Comment"
})