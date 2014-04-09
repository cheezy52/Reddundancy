Reddundancy.Collections.Subs = Backbone.Collection.extend({
  url: function() {
    return Reddundancy.ROOT_URL + "/api/s";
  },

  model: Reddundancy.Models.Sub,

  comparator: function(sub) {
    return sub.created_at;
  },

  parse: function(response) {
    this.page = parseInt(response.page);
    this.total_pages = parseInt(response.total_pages);
    return response.subs;
  },

  getOrFetch: function(sub_id) {
    var coll = this;
    var sub = this.get(sub_id);
    if (sub) {
      sub.fetch();
      return sub;
    } else {
      sub = new Reddundancy.Models.Sub({
        id: sub_id
      });
      sub.fetch({
        success: function(model) {
          coll.add(model);
        }
      });
      return sub;
    }
  }
})