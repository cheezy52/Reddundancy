Seddit.Views.PostShowView = Backbone.CompositeView.extend({
  template: JST["post_show"],

  events: {
    "click button.delete-comment": "deleteComment",
    "click button.delete-post": "deletePost"
  },

  sedditClass: "PostShowView",

  initialize: function(options) {
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addCommentView);
    this.listenTo(this.collection, "remove", this.removeSubviewByModel);
    this.populateSubviews();
  },

  render: function() {
    var view = this;

    this.$el.html(this.template({ post: this.model }));
    this.subviews().forEach(function(subview) {
      if(subview.sedditClass === "KarmaView") {
        view.$el.find(".karma-container").first().html(subview.render().$el);
        subview.delegateEvents();
      } else if(subview.sedditClass === "FormView") {
        view.$el.find(".submission-buttons").first().append(subview.render().$el);
        subview.delegateEvents();
      } else if(subview.sedditClass === "CommentView") {
        //explicitly bypass comment views, as they're handled below
        return;
      }
    });

    var sortedViews = this.sortComments();
    sortedViews.forEach(function(viewLayer, layerIndex) {
      viewLayer.forEach(function(commentView) {
        if (layerIndex === 0) {
          view.$el.find("#comments").prepend(commentView.render().$el);
        } else {
          view.subviewParentEl(commentView).find(".comments").first()
            .prepend(commentView.render().$el);
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
    view.addSubview(new Seddit.Views.KarmaView({
      model: this.model
    }));
    view.addSubview(new Seddit.Views.FormView({
      model: new Seddit.Models.Comment({
        post_id: this.model.get("id"),
        parent_id: null
      }),
      collection: this.collection,
      formClassName: "comment"
    }));
    this.collection.forEach(function(comment) {
      view.addSubview(new Seddit.Views.CommentView({
        model: comment,
        collection: view.collection
      }));
    });
    this.render();
  },

  sortComments: function() {
    //Sorts comments by nesting depth: 0 = toplevel, 1 = reply to comment,
    //2 = reply to a reply, etc.
    var postView = this;
    var layeredViews = [];

    this.subviews().forEach(function(subview) {
      if(subview.sedditClass === "CommentView") {
        var tempComment = subview.model;
        var nestingDepth = 0;
        while(tempComment.get("parent_id")) {
          tempComment = postView.collection.get(tempComment.get("parent_id"));
          nestingDepth++;
        }
        if(!layeredViews[nestingDepth]) {
          layeredViews[nestingDepth] = [];
        }
        layeredViews[nestingDepth].push(subview);
      }
    });
    return layeredViews;
  },

  addCommentView: function(comment) {
    var commentView = new Seddit.Views.CommentView({
      model: comment,
      //pass in collection for use in its formView
      collection: this.collection
    });
    this.addSubview(commentView);
  },

  deleteComment: function(event) {
    var comment = this.collection.get($(event.target).data("id"));
    if(comment) {
      var commentView = this.findSubviewByModel(comment);
      if(commentView.$el.find(".comment").length > 0) {
        //contains child comments
        if(comment.get("body") !== "Comment deleted") {
          comment.save({ body: "Comment deleted"});
        }
      } else {
        comment.destroy();
      }
    }
  },

  deletePost: function(event) {
    var redirectUrl = "/s/" + this.model.get("sub_id");
    this.model.destroy();
    Backbone.history.navigate(redirectUrl, {trigger: true})
  }
})