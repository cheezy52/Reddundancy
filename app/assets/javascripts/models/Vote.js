Reddundancy.Models.Vote = Backbone.Model.extend({
  urlRoot: function() {
    return Reddundancy.ROOT_URL + "/api/votes";
  },

  reddundancyClass: "Vote"
});