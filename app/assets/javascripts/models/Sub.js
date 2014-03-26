Seddit.Models.Sub = Backbone.Model.extend({
  urlRoot: function() {
    return Seddit.ROOT_URL + "/api/s";
  },

  sedditClass: "Sub"
})