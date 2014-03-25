Seddit.Views.PostShowView = Backbone.VotableCompositeView.extend({
  template: JST["post_show"],

  events: {
    "click .new-comment-show": "showNewCommentForm",
    "submit .new-comment-form": "submitComment",
    "click .delete-comment": "deleteComment",
    "click .delete-post": "deletePost"
  },

  initialize: function(options) {
    //call super
    Backbone.VotableCompositeView.prototype.initialize.call(this, options);
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addComment);
    this.listenTo(this.collection, "remove", this.removeComment);
    //this.showForm is a placeholder so that other renders don't re-hide form
    this.showForm = false;
    this.formErrors = null;
    this.formDataDefault = {"comment": { "body": null } };
    this.formPending = false;
    this.populateSubviews();
  },

  render: function() {
    //get form data to preserve entered text between renders
    var formData = this.$el.find(".new-comment-form").first().serializeJSON();
    if(!formData["comment"]) {
      formData = this.formDataDefault;
    };
    var postView = this;
    this.$el.html(this.template({
      post: this.model,
      showForm: this.showForm,
      formErrors: this.formErrors,
      formData: formData["comment"],
      votingDisabled: this.awaitingVoteReturn,
      formPending: this.formPending
    }));

    var sortedViews = this.sortComments();
    sortedViews.forEach(function(viewLayer, layerIndex) {
      viewLayer.forEach(function(commentView) {
        if (layerIndex === 0) {
          postView.$el.append(commentView.render().$el);
        } else {
          postView.subviewParentEl(commentView).append(commentView.render().$el);
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
      layeredViews[nestingDepth].push(commentView);
    });
    return layeredViews;
  },

  removeComment: function(comment) {
    var commentView = this.findSubviewByModel(comment);
    if(commentView.$el.find(".comment").length > 0) {
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

  findFormView: function(event) {
    var commentId = $(event.target).closest(".comment").data("id");
    //declaring and handling the "else" for the next conditional in one step
    var commentView = this;
    if(commentId) {
      //if this is entered, comment is on a comment subview
      commentView = this.findSubviewByModel(this.collection.get(commentId));
    };
    return commentView;
  },

  showNewCommentForm: function(event) {
    //hide all other comment fields first to prevent having multiple open.
    //will keep any partially-entered comments in closed forms
    var commentView = this.findFormView(event);
    commentView.showForm = !commentView.showForm;
    commentView.render();
  },

  submitComment: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    var commentView = view.findFormView(event);
    commentView.formPending = true;
    commentView.render();
    newModel.save({}, {
      success: function(model) {
        commentView.showForm = false;
        commentView.formErrors = null;
        commentView.formPending = false;
        view.$el.find(".new-comment-form").empty();
        commentView.render();
        view.collection.add(model);
      },
      error: function(model, response) {
        var commentView = view.findFormView(event);
        commentView.formPending = false;
        commentView.formErrors = JSON.parse(response.responseText);
        commentView.render();
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