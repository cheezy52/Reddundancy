Reddundancy.Models.Comment = Backbone.VotableModel.extend({
  urlRoot: function() {
    return Reddundancy.ROOT_URL + "/api/comments"
  },

  reddundancyClass: "Comment"
})