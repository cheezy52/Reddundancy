Seddit.Collections.SubPosts = Backbone.Collection.extend({
  url: function() {
    return Seddit.ROOT_URL + "/api/s/" + this.subId + "/posts"
  },

  model: Seddit.Models.Post,

  initialize: function(models, options) {
    this.subId = options.subId;
  },

  comparator: function(post) {
    return post.created_at;
  },

  getOrFetch: function(post_id) {
    var coll = this;
    var post = this.get(post_id);
    if (post) {
      post.fetch();
      return post;
    } else {
      post = new Seddit.Models.Post({
        id: post_id
      });
      post.fetch({
        success: function(model) {
          coll.add(model);
        }
      });
      return post;
    }
  }
})