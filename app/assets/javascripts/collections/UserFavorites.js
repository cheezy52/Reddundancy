RedditLite.Collections.UserFavorites = Backbone.Collection.extend({
  url: function() {
    return RedditLite.ROOT_URL + "/api/users/" + this.userId + "/favorites"
  },

  model: RedditLite.Models.SubFavorite,

  initialize: function(models, options) {
    this.userId = options.userId;
  },

  comparator: function(favorite) {
    return favorite.get("rank");
  },

  getOrFetch: function(sub_id) {
    var coll = this;
    var fav = this.get(sub_id);
    if (fav) {
      return fav;
    } else {
      fav = new RedditLite.Models.SubFavorite({
        parentId: sub_id
      });
      fav.fetch({
        success: function(model) {
          coll.add(model);
        }
      });
      return fav;
    }
  }
})