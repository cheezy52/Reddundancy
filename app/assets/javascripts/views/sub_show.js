Seddit.Views.SubShowView = Backbone.VotableCompositeView.extend({
  template: JST["sub_show"],

  events: {

  },

  initialize: function(options) {
    //call super
    Backbone.VotableCompositeView.prototype.initialize.call(this, options);
    Backbone.FormBearingView.prototype.initialize.call(this, _.extend({
      formClassName: "post"
    }, options));
    this.listenTo(this.model, "sync change update", this.render);
    this.listenTo(this.collection, "change sync update", this.render);
    this.listenTo(this.collection, "add", this.addPost);
    this.listenTo(this.collection, "remove", this.removePost);
    this.populateSubviews();
    console.log(this.events);
  },

  formHelpers: function(selector, className) {
    return Backbone.FormBearingView.prototype.formHelpers.call(this);
  },

  render: function() {
    var view = this;
    var templateArgs = _.extend({
      sub: this.model,
      votingDisabled: this.awaitingVoteReturn
    }, this.formHelpers(".new-post-form", "post"));

    this.$el.html(this.template(templateArgs));

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

  showForm: function(event) {
    console.log("showForm fired");
    Backbone.FormBearingView.prototype.showForm.call(this, event);
  },

  submitForm: function(event) {
    Backbone.FormBearingView.prototype.submitForm.call(this, event);
  }
})