Seddit.Views.SubShowView = Backbone.VotableCompositeView.extend({
  template: JST["sub_show"],

  events: {
    "click .new-post-show": "showNewPostForm",
    "submit .new-post-form": "submitPost"
  },

  initialize: function(options) {
    //call super
    Backbone.VotableCompositeView.prototype.initialize.call(this, options);
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addPost);
    this.listenTo(this.collection, "remove", this.removePost);
    this.showForm = false;
    this.formErrors = null;
    this.formDataDefault = {"post": { "title": null, "link": null } };
    this.formPending = false;
    this.populateSubviews();
  },

  render: function() {
    var view = this;
    var formData = this.$el.find(".new-post-form").first().serializeJSON();
    if(!formData["post"]) {
      formData = this.formDataDefault;
    }
    this.$el.html(this.template({
      sub: this.model,
      showForm: this.showForm,
      formErrors: this.formErrors,
      formData: formData["post"],
      votingDisabled: this.awaitingVoteReturn,
      formPending: this.formPending
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
    this.showForm = !this.showForm;
    this.render();
  },

  submitPost: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    view.formPending = true;
    view.render();
    newModel.save({}, {
      success: function(model) {
        view.showForm = false;
        view.formErrors = null;
        view.formPending = false;
        view.$el.find(".new-post-form").empty();
        view.collection.add(model);
        view.render();
      },
      error: function(model, response) {
        view.formPending = false;
        view.formErrors = JSON.parse(response.responseText);
      }
    })
  }
})