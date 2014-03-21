Seddit.Collections.PostComments = Backbone.Collection.extend({
  url: function() {
    return Seddit.ROOT_URL + "/api/posts/" + this.postId + "/comments"
  },

  model: Seddit.Models.Comment,

  initialize: function(models, options) {
    this.postId = options.postId;
  },

  comparator: function(comment) {
    return comment.karma;
  },

  getOrFetch: function(comment_id) {
    console.log("comment getOrFetch fired");
    var coll = this;
    var comment = this.get(comment_id);
    if (comment) {
      console.log("comments cache hit");
      //no manual fetch here to prevent overwhelming of API
      return comment;
    } else {
      console.log("comments cache miss");
      //hopefully this will never happen!
      //show function for a single comment is very slow server-side
      //all comments should be eager-loaded on page show anyway
      comment = new Seddit.Models.Comment({
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