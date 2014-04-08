RedditLite.Collections.SubPosts = Backbone.Collection.extend({
  url: function() {
    return RedditLite.ROOT_URL + "/api/s/" + this.subId + "/posts";
  },

  model: RedditLite.Models.Post,

  initialize: function(models, options) {
    this.subId = options.subId;
  },

  comparator: function(post) {
    return post.created_at;
  },

  parse: function(response) {
    this.page = parseInt(response.page);
    this.total_pages = parseInt(response.total_pages);
    return response.posts;
  },

  getOrFetch: function(post_id) {
    var coll = this;
    var post = this.get(post_id);
    if (post) {
      post.fetch();
      return post;
    } else {
      post = new RedditLite.Models.Post({
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