Seddit.Views.SubShowView = Backbone.CompositeView.extend({
  template: JST["sub_show"],

  events: {
    "click .upvote:not(.active)" : "upvote",
    "click .downvote:not(.active)" : "downvote",
    "click .upvote.active" : "removeVote",
    "click .downvote.active" : "removeVote"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addPost);
    this.listenTo(this.collection, "remove", this.removePost);
    this.populateSubviews();
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

  populateSubviews: function() {
    var view = this;
    this.collection.forEach(function(post) {
      view.addPost(post);
    })
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
    this.$el.find(".post[data-id=" + post.get("id") + "]").remove();
  },

  upvote: function(event) {
    var id = $(event.target).data("id");
    this.collection.get(id).upvote();
  },

  downvote: function(event) {
    var id = $(event.target).data("id");
    this.collection.get(id).downvote();
  },

  removeVote: function(event) {
    var id = $(event.target).data("id");
    this.collection.get(id).removeVote();
    var voteView = this.findSubviewByModel(this.collection.get(id));
    voteView.listenTo(voteView.model.vote, "change sync", voteView.render);
  }
})