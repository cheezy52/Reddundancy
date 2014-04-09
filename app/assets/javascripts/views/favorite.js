Reddundancy.Views.FavoriteView = Backbone.View.extend({
  template: JST["favorite"],

  events: {
    "click button.unfavorited": "addFavorite",
    "click button.favorited": "removeFavorite"
  },

  reddundancyClass: "FavoriteView",

  className: "favorites-container",

  render: function() {
    this.$el.html(this.template({
      model: this.model
    }));
    return this;
  },

  addFavorite: function(event) {
    var view = this;
    if(!Reddundancy.current_user) { return; }
    if(!this.model.favorite) {
      $(event.target).addClass("disabled");
      this.model.favorite = new Reddundancy.Models.SubFavorite({
        sub_id: this.model.id,
        rank: $(document).find("#favorited-subs").children().last().data("rank") + 1,
        sub_name: this.model.escape("name")
      });
      this.model.favorite.save({}, {
        success: function(model) {
          view.model.set("followers", view.model.get("followers") + 1);
          Reddundancy.NavFavoritesView.collection.add(model);
          view.render();
        },
        error: function(model, response) {
          $(document).find(".flash").html(response.responseText || 
            "An error occurred.  Please reload the page.");
        }
      })
    }
  },

  removeFavorite: function(event) {
    var view = this;
    if(this.model.favorite) {
      $(event.target).addClass("disabled");
      this.model.favorite.destroy({
        success: function(model) {
          view.model.favorite = null;
          view.model.set("followers", view.model.get("followers") - 1);
          var removedFav = Reddundancy.NavFavoritesView.collection
            .findWhere({sub_id: model.get("sub_id")});
          Reddundancy.NavFavoritesView.collection.remove(removedFav);
          view.render();
        },
        error: function(model, response) {
          $(document).find(".flash").html(response.responseText || 
            "An error occurred.  Please reload the page.");
        }
      });
    }
  }
});