Seddit.Models.SubFavorite = Backbone.Model.extend({
  url: function() {
    return Seddit.ROOT_URL + "/api/s/" + this.get("sub_id") + "/favorite";
  },

  initialize: function(options) {
    this.set("sub_id", options.sub_id);
    this.set("rank", options.rank);
  }
})
