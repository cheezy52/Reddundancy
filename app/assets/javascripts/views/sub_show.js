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
    var post = this.collection.get($($(event.target).parent()).data("id"));
    var view = this;

    post.vote.save({ "up": true });

    //cannot upvote an already-upvoted post, so no need to check here
    //could just re-fetch for authoritative source, but possible race condition
    var karmaDiff = post.vote.isNew() ? 1 : 2
    post.set("karma", post.get("karma") + karmaDiff)
  },

  downvote: function(event) {
    var post = this.collection.get($($(event.target).parent()).data("id"));
    var view = this;

    post.vote.save({ "up": false });

    //cannot downvote an already-downvoted post, so no need to check here
    //could just re-fetch for authoritative source, but possible race condition
    var karmaDiff = post.vote.isNew() ? -1 : -2
    post.set("karma", post.get("karma") + karmaDiff)
  },

  removeVote: function(event) {
    var post = this.collection.get($($(event.target).parent()).data("id"));
    var view = this;

    var karmaDiff = post.vote.get("up") ? -1 : 1

    post.vote.destroy();

    post.set("karma", post.get("karma") + karmaDiff)
  }
})