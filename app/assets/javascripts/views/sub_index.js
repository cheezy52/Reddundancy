Seddit.Views.SubIndexView = Backbone.CompositeView.extend({
  template: JST["sub_index"],

  events: {

  },

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addPost);
    this.listenTo(this.collection, "remove", this.removePost);
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({
      sub: this.model
    }));
    this.subviews().forEach(function(subview) {
      view.$el.find("#posts").prepend(subview.render().$el);
    })
    return this;
  },

  addPost: function(post) {
    var postView = new Seddit.Views.PostView({
      model: post
    });
    this.addSubview(postView);
    this.$el.find("#posts").prepend(postView.render().$el);
  },

  removePost: function(post) {
    this.removeSubviewByModel(post);
    this.$el.find("#post-" + post.get("id")).remove();
  }
})