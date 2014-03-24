Seddit.Views.PostShowView = Backbone.VotableCompositeView.extend({
  template: JST["post_show"],

  events: {
    "click .upvote:not(.active)" : "upvote",
    "click .downvote:not(.active)" : "downvote",
    "click .upvote.active" : "removeVote",
    "click .downvote.active" : "removeVote"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.model.vote, "sync", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addComment);
    this.listenTo(this.collection, "remove", this.removeComment);
    this.populateSubviews();
  },

  render: function() {
    var postView = this;
    this.$el.html(this.template({
      post: this.model
    }));

    var sortedViews = this.sortComments();
    sortedViews.forEach(function(viewLayer, layerIndex) {
      viewLayer.forEach(function(commentView) {
        if (layerIndex === 0) {
          postView.$el.append(commentView.$el);
        } else {
          postView.subviewParentEl(commentView).append(commentView.$el);
        }
      });
    });
    return this;
  },

  subviewParentEl: function(view) {
    return this.commentParentEl(view.model);
  },

  commentParentEl: function(comment) {
    var sel = ".comment[data-id=" + comment.get("parent_id") + "]";
    return this.$el.find(sel);
  },

  populateSubviews: function() {
    var view = this;
    this.collection.forEach(function(comment) {
      view.addSubview(new Seddit.Views.CommentView({
        model: comment
      }));
    });
    this.render();
  },

  sortComments: function() {
    //Sorts comments by nesting depth: 0 = toplevel, 1 = reply to comment,
    //2 = reply to a reply, etc.
    var postView = this;
    var layeredViews = [];
    this.subviews().forEach(function(commentView) {
      var tempComment = commentView.model;
      var nestingDepth = 0;
      while(tempComment.get("parent_id")) {
        tempComment = postView.collection.get(tempComment.get("parent_id"));
        nestingDepth++;
      }
      if(!layeredViews[nestingDepth]) {
        layeredViews[nestingDepth] = [];
      }
      layeredViews[nestingDepth].push(commentView.render());
    });
    return layeredViews;
  },

  removeComment: function(comment) {
    this.removeSubviewByModel(comment);
    this.commentParentEl(comment).remove();
  },

  addComment: function(comment) {
    var commentView = new Seddit.Views.CommentView({
      model: comment
    });
    this.addSubview(commentView);
    this.commentParentEl(comment).prepend(commentView.render().$el);
  }
})