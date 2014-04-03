Seddit.Views.FavoriteView = Backbone.View.extend({
  template: JST["favorite"],

  events: {
    "click button.unfavorited": "addFavorite",
    "click button.favorited": "removeFavorite"
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
    if(!Seddit.current_user) { return; }
    if(!this.model.favorite) {
      $(event.target).addClass("disabled");
      this.model.favorite = new Seddit.Models.SubFavorite({
        sub_id: this.model.id
      });
      this.model.favorite.save({}, {
        success: function(model) {
          view.model.set("followers", view.model.get("followers") + 1);
          $("#favorited-subs").append("<li><a href='#/s/" + 
            view.model.escape("name") + "'>" + 
            view.model.escape("name") + "</a></li>");
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
          $("#favorited-subs").children()
            .find(":contains('" + view.model.escape("name") + "')")
            .remove();
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