Seddit.Models.Post = Backbone.VotableModel.extend({
  urlRoot: function() {
    return Seddit.ROOT_URL + "/api/posts";
  }
})