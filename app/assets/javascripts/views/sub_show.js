Seddit.Views.SubShowView = Backbone.CompositeView.extend({
  template: JST["sub_show"],

  events: {

  },

  sedditClass: "SubShowView",

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
      if (subview.sedditClass === "PostView") {
        view.$el.find("#posts").prepend(subview.render().$el);
      } else if(subview.sedditClass === "PaginationView") {
        if(subview.position === "top") {
          view.$el.prepend(subview.render().$el);
        } else {
          view.$el.append(subview.render().$el);
        }
      } else {
        view.$el.find("#posts").before(subview.render().$el);
      }
      subview.delegateEvents();
    })
    return this;
  },

  populateSubviews: function() {
    var view = this;
    this.addSubview(new Seddit.Views.FormView({
      model: this.model,
      collection: this.collection,
      formClassName: "post"
    }));
    this.addSubview(new Seddit.Views.PaginationView({
      collection: this.collection,
      position: "top"
    }));
    this.addSubview(new Seddit.Views.PaginationView({
      collection: this.collection,
      position: "bottom"
    }));
    this.addSubview(new Seddit.Views.FavoriteView({
      model: this.model
    }));
    this.collection.forEach(function(post) {
      view.addPostView(post);
    });
  },

  addPostView: function(model) {
    this.addSubview(new Seddit.Views.PostView({
      model: model
    }));
  }
})