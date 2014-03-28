Seddit.Models.Sub = Backbone.Model.extend({
  urlRoot: function() {
    return Seddit.ROOT_URL + "/api/s";
  },

  parse: function(data) {
    if(data.is_favorited) {
      this.favorite = new Seddit.Models.SubFavorite({
        parentId: data["id"],
        parentClass: this.sedditClass,
        id: "this is a fake id to make Backbone happy"
      })
    } else {
      this.favorite = null;
    }
    return data;
  },

  sedditClass: "Sub"
})