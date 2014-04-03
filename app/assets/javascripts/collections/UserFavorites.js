Seddit.Collections.UserFavorites = Backbone.Collection.extend({
  url: function() {
    return Seddit.ROOT_URL + "/api/users/" + this.userId + "/favorites"
  },

  model: Seddit.Models.SubFavorite,

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
      fav = new Seddit.Models.SubFavorite({
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