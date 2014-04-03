Seddit.Views.NavFavoritesView = Backbone.View.extend({
  sedditClass: "NavFavoritesView",

  events: {

  },

  updateRanks: function(event, ui) {
    var view = this;
    this.$el.sortable("disable");
    this.$el.addClass("disabled");
    //these lookups are very clunky; I'm sorry, me.
    var rerankedFav = this.collection.where({sub_id: ui.item.data("id")})[0];
    var prevFav = this.collection.where({sub_id: 
      $(ui.item.prev()[0])
      .data("id")})[0];
    if(prevFav) {
      rerankedFav.set("rank", prevFav.get("rank") + 1);
    } else {
      rerankedFav.set("rank", 1);
    }
    rerankedFav.save({}, {
      success: function(model) {
        view.$el.sortable("enable");
        view.$el.removeClass("disabled");
      },
      error: function(model, response) {
        view.$el.sortable("enable");
        view.$el.removeClass("disabled");
        view.$el.prepend(response.responseText);
      }
    })
  },

  initialize: function(options) {
    this.$el.sortable({
      update: this.updateRanks.bind(this)
    });
  },
})