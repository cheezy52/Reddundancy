Reddundancy.Views.SubShowView = Backbone.CompositeView.extend({
  template: JST["sub_show"],

  events: {
    "click .delete-post": "deletePost",
    "click .delete-sub": "deleteSub"
  },

  reddundancyClass: "SubShowView",

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addPostView);
    this.listenTo(this.collection, "remove", this.removeSubviewByModel);
    this.populateSubviews();
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({ sub: this.model }));

    this.subviews().forEach(function(subview) {
      if (subview.reddundancyClass === "PostView") {
        view.$el.find("#posts").append(subview.render().$el);
      } else if(subview.reddundancyClass === "PaginationView") {
        if(subview.position === "top") {
          view.$el.prepend(subview.render().$el);
        } else {
          view.$el.append(subview.render().$el);
        }
      } else if(subview.reddundancyClass === "FavoriteView") {
        view.$el.find("#sub-buttons").append(subview.render().$el);
      } else if(subview.reddundancyClass === "FormView") {
        view.$el.find("#sub-buttons").append(subview.render().$el);
      } else {
        view.$el.find("#posts").before(subview.render().$el);
      }
      subview.delegateEvents();
    })
    return this;
  },

  populateSubviews: function() {
    var view = this;
    this.addSubview(new Reddundancy.Views.PaginationView({
      collection: this.collection,
      position: "top"
    }));
    this.addSubview(new Reddundancy.Views.PaginationView({
      collection: this.collection,
      position: "bottom"
    }));
    this.addSubview(new Reddundancy.Views.FavoriteView({
      model: this.model
    }));
    this.addSubview(new Reddundancy.Views.FormView({
      model: this.model,
      collection: this.collection,
      formClassName: "post"
    }));
    this.collection.forEach(function(post) {
      view.addPostView(post);
    });
  },

  addPostView: function(model) {
    this.addSubview(new Reddundancy.Views.PostView({
      model: model
    }));
  },

  deletePost: function(event) {
    $(event.target).addClass("disabled");
    var post = this.collection.get($(event.target).data("id"));
    post && post.destroy({
      error: function(model, response) {
        $(event.target).removeClass("disabled");
        $(document).find(".flash").html(response.responseText || 
            "An error occurred.  Please reload the page.");
      }
    });
  },

  deleteSub: function(event) {
    var redirectUrl = "//s";
    this.model.destroy();
    Backbone.history.navigate(redirectUrl, {trigger: true})
  }
})