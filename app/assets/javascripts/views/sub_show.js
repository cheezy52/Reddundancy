Seddit.Views.SubShowView = Backbone.VotableCompositeView.extend({
  template: JST["sub_show"],

  events: {
    "click .upvote:not(.active)" : "upvote",
    "click .downvote:not(.active)" : "downvote",
    "click .upvote.active" : "removeVote",
    "click .downvote.active" : "removeVote",
    "click #new-post-show": "showNewPostForm",
    "submit #new-post-form": "submitPost"
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

  showNewPostForm: function(event) {
    $("#new-post-show").addClass("hidden");
    $("#new-post-form").removeClass("hidden");
  },

  submitPost: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    newModel.save({}, {
      success: function(model) {
        $("#new-post-show").addClass("hidden");
        $("#new-post-form").removeClass("hidden");
        view.collection.add(model);
      },
      error: function(errors) {
        $("#post-form-errors").text(JSON.parse(errors.get("post")));
      }
    })
  }
})