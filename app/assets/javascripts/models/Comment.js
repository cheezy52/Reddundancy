Seddit.Models.Comment = Backbone.VotableModel.extend({
  urlRoot: function() {
    return Seddit.ROOT_URL + "/api/comments"
  }
})