Reddundancy.Models.Sub = Backbone.Model.extend({
  urlRoot: function() {
    return Reddundancy.ROOT_URL + "/api/s";
  },

  parse: function(data) {
    if(data.is_favorited) {
      this.favorite = new Reddundancy.Models.SubFavorite({
        sub_id: data["id"],
        //this "id" field is mostly a fake to make Backbone happy
        id: data["id"]
      })
    } else {
      this.favorite = null;
    }
    return data;
  },

  reddundancyClass: "Sub"
})