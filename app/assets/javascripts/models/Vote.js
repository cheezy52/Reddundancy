Seddit.Models.Vote = Backbone.Model.extend({
  urlRoot: function() {
    return Seddit.ROOT_URL + "/api/votes";
  }
});