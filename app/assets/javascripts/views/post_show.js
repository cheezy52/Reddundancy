Seddit.Views.PostShowView = Backbone.CompositeView.extend({
  template: JST["post_show"],

  events: {

  },

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render)
    this.listenTo(this.collection, "change sync update", this.renderSubviewByModel)
    this.listenTo(this.collection, "add", this.addComment)
    this.listenTo(this.collection, "remove", this.removeComment)
  },

  render: function() {
    var postView = this;
    this.$el.html(this.template({
      post: this.model
    }));

    var sortedViews = this.sortComments();
    sortedViews.forEach(function(viewLayer) {
      viewLayer.forEach(function(commentView) {
        if (viewLayer === 0) {
          postView.$el.append(commentView.$el);
        } else {
          postView.$el.find("#comment-" + commentView.model.get("parent_id") +
            "-children").append(commentView.$el);
        }
      });
    });
    return this;
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
        tempComment = this.collection.getOrFetch(tempComment.get("parent_id"));
        nestingDepth++;
      }
      layeredViews[nestingDepth] || layeredViews[nestingDepth] = [];
      layeredViews[nestingDepth].push(commentView.render());
    });
    return layeredViews;
  },

  removeComment: function(comment) {
    this.removeSubviewByModel(comment);
    this.$el.find("#comment-" + comment.get("id")).remove();
  },

  addComment: function(comment) {
    var commentView = new Seddit.Views.CommentView({
      model: comment
    });
    this.addSubview(commentView);
    this.$el.find("#comment-" + comment.get("parent_id"))
      .prepend(commentView.render().$el);
  }
})