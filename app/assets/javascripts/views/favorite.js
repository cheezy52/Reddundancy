Seddit.Views.FavoriteView = Backbone.View.extend({
  template: JST["favorite"],

  events: {
    "click .favorite-sub": "addFavorite",
    "click .unfavorite-sub": "removeFavorite"
  },

  sedditClass: "FavoriteView",

  className: "favorites-container",

  render: function() {
    this.$el.html(this.template({
      model: this.model
    }));
    return this;
  },

  addFavorite: function(event) {
    var view = this;
    if(!this.model.favorite) {
      $(event.target).addClass("disabled");
      this.model.favorite = new Seddit.Models.SubFavorite({
        parentId: this.model.id,
        parentClass: this.model.sedditClass
      });
      this.model.favorite.save({}, {
        success: function(model) {
          view.model.set("followers", view.model.get("followers") + 1);
          view.render();
        },
        error: function(model, response) {
          $(event.target).removeClass("disabled");
          $(event.target).before(response.responseText);
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
          view.render();
        },
        error: function(model, response) {
          $(event.target).removeClass("disabled");
          $(event.target).before(response.responseText);
        }
      });
    }
  }
});