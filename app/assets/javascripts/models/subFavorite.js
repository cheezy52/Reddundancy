Seddit.Models.SubFavorite = Backbone.Model.extend({
  url: function() {
    return Seddit.ROOT_URL + "/api/s/" + this.get("parentId") + "/favorite";
  },

  initialize: function(options) {
    this.set("parentId", options.parentId);
    //parentClass not currently used, included for future extensibility
    this.set("parentClass", options.parentClass);
    this.set("rank", options.rank);
  }
})
