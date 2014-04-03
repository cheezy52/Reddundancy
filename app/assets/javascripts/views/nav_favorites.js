Seddit.Views.NavFavoritesView = Backbone.View.extend({
  sedditClass: "NavFavoritesView",

  template: JST["nav_favorites"],

  events: {

  },

  render: function() {
    this.$el.html(this.template({
      favs: this.collection
    }));
    return this;
  },

  initialize: function(options) {
    this.$el.sortable({
      update: this.updateRanks.bind(this)
    });
    this.listenTo(this.collection, "add remove", this.render);
    this.render();
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
    if(rerankedFav && prevFav) {
      rerankedFav.set("rank", prevFav.get("rank") + 1);
    } else if (rerankedFav) {
      rerankedFav.set("rank", 1);
    } else { 
      $(document).find(".flash")
        .html("An error occurred.  Please reload the page.");
      return;
    }
    rerankedFav.save({}, {
      success: function(model) {
        //nesting callbacks to delegate reranking to the server
        //requires two round-trips per sort; suboptimal, but it works
        view.collection.fetch({
          success: function() {
            view.render();
            view.$el.sortable("enable");
            view.$el.removeClass("disabled");
          }
        })
      },
      error: function(model, response) {
        view.$el.closest(".dropdown").removeClass("open");
        $(document).find(".flash").html(response.responseText || 
          "An error occurred.  Please reload the page.");
      }
    });
  }
})