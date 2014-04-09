Reddundancy.Models.Post = Backbone.VotableModel.extend({
  urlRoot: function() {
    return Reddundancy.ROOT_URL + "/api/posts";
  },

  reddundancyClass: "Post"
})