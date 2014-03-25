Seddit.Views.PostShowView = Backbone.VotableCompositeView.extend({
  template: JST["post_show"],

  events: {
    "click .upvote:not(.active)" : "upvote",
    "click .downvote:not(.active)" : "downvote",
    "click .upvote.active" : "removeVote",
    "click .downvote.active" : "removeVote",
    "click .new-comment-show": "showNewCommentForm",
    "submit .new-comment-form": "submitComment",
    "click .delete-comment": "deleteComment",
    "click .delete-post": "deletePost"
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
    var commentView = this.findSubviewByModel(comment);
    if(commentView.$el.find(".comment").length > 1) {
      //contains child comments
      commentView.$el.find(".comment-body").first().text("Comment deleted");
    } else {
      this.removeSubview(commentView);
    }
  },

  addComment: function(comment) {
    var commentView = new Seddit.Views.CommentView({
      model: comment
    });
    this.addSubview(commentView);
  },

  showNewCommentForm: function(event) {
    //hide all other comment fields first to prevent having multiple open.
    //will keep any partially-entered comments in closed forms
    this.$el.find(".new-comment-form").addClass("hidden");
    var commentForm = $($(event.target).parent()).find(".new-comment-form");
    commentForm.removeClass("hidden");
    commentForm.find(".comment-body-field").focus();
  },

  submitComment: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    newModel.save({}, {
      success: function(model) {
        $(event.target).addClass("hidden");
        view.collection.add(model);
      },
      error: function(model, errors) {
        $(event.target).find(".comment-form-errors")
          .text(JSON.parse(errors.responseText));
      }
    })
  },

  deleteComment: function(event) {
    var comment = this.collection.get($(event.target).data("id"));
    comment.destroy();
  },

  deletePost: function(event) {
    var redirectUrl = "s/" + this.model.get("sub_id");
    this.model.destroy();
    Backbone.history.navigate(redirectUrl, {trigger: true})
  }
})