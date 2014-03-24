Seddit.Collections.Subs = Backbone.Collection.extend({
  url: function() {
    return "/api/s"
  },

  model: Seddit.Models.Sub,

  comparator: function(sub) {
    return sub.created_at;
  },

  getOrFetch: function(sub_id) {
    var coll = this;
    var sub = this.get(sub_id);
    if (sub) {
      sub.fetch();
      return sub;
    } else {
      sub = new Seddit.Models.Sub({
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