Reddundancy.Collections.PostComments = Backbone.Collection.extend({
  url: function() {
    return Reddundancy.ROOT_URL + "/api/posts/" + this.postId + "/comments"
  },

  model: Reddundancy.Models.Comment,

  initialize: function(models, options) {
    this.postId = options.postId;
  },

  comparator: function(comment) {
    return comment.karma;
  },

  getOrFetch: function(comment_id) {
    var coll = this;
    var comment = this.get(comment_id);
    if (comment) {
      //no manual fetch here to prevent overwhelming of API
      return comment;
    } else {
      //hopefully this will never happen!
      //show function for a single comment is very slow server-side
      //all comments should be eager-loaded on page show anyway
      comment = new Reddundancy.Models.Comment({
        id: comment_id
      });
      comment.fetch({
        success: function(model) {
          coll.add(model);
        }
      });
      return comment;
    }
  }
})