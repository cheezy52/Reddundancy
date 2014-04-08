RedditLite.Views.SubsIndexView = Backbone.CompositeView.extend({
  template: JST["subs_index"],

  events: {
    // Sub deletion from index view is disabled to prevent easy misclicks
    // while trying to favorite, but code kept around for easy re-enabling
    // "click .delete-sub": "deleteSub"
  },

  redditLiteClass: "SubsIndexView",

  initialize: function(options) {
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addSubRedditLiteView);
    this.listenTo(this.collection, "remove", this.removeSubviewByModel);
    this.populateSubviews();
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({ subs: this.collection }));

    this.subviews().forEach(function(subview) {
      if(subview.redditLiteClass === "FormView") {
        view.$el.find("#new-sub-form-container").html(subview.render().$el);
      } else if(subview.redditLiteClass === "PaginationView") {
        //put pagination links both above and below
        if (subview.position === "top") {
          view.$el.prepend(subview.render().$el);
        } else {
          view.$el.append(subview.render().$el);
        }
      } else if(subview.redditLiteClass === "SubRedditLiteView") {
        view.$el.find("#subs-list").append(subview.render().$el);
      } else {
        view.$el.prepend(subview.render().$el);
      }
      subview.delegateEvents();
    })
    return this;
  },

  populateSubviews: function() {
    var view = this;
    this.addSubview(new RedditLite.Views.FormView({
      model: this.model,
      collection: this.collection,
      formClassName: "sub"
    }));
    this.addSubview(new RedditLite.Views.PaginationView({
      collection: this.collection,
      position: "top"
    }));
    this.addSubview(new RedditLite.Views.PaginationView({
      collection: this.collection,
      position: "bottom"
    }));
    this.collection.forEach(function(subRedditLite) {
      view.addSubRedditLiteView(subRedditLite);
    });
  },

  addSubRedditLiteView: function(model) {
    this.addSubview(new RedditLite.Views.SubRedditLiteView({
      model: model
    }));
  },

//   deleteSub: function() {
//     $(event.target).addClass("disabled");
//     var sub = this.collection.get($(event.target).data("id"));
//     sub && sub.destroy({
//       error: function(model, response) {
//         $(event.target).removeClass("disabled")
//       }
//     });
//   }
})