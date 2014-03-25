Seddit.Views.CommentView = Backbone.VotableView.extend({
  template: JST["comment"],

  tagName: "ul",

  className: "comment",

  attributes: function() {
    return {
      "data-id": this.model.get("id")
    }
  },

  events: {

  },

  initialize: function(options) {
    //call super
    Backbone.VotableView.prototype.initialize.call(this, options);
    this.listenTo(this.model.vote, "request sync", this.render);
    this.showForm = false;
    this.formErrors = "";
    this.formDataDefault = { "comment": { "body": null } };
    this.formPending = false;
    //pseudo-render to get elements in place for full render
    this.$el.html(this.template({
      comment: this.model,
      showForm: this.showForm,
      formErrors: this.formErrors,
      formData: this.formDataDefault["comment"],
      votingDisabled: false,
      formPending: this.formPending
    }));
  },

  render: function() {
    //get form data to preserve entered text between renders
    this.formData = this.$el.find(".new-comment-form").first().serializeJSON();
    if(!this.formData["comment"]) {
      this.formData = this.formDataDefault;
    }
    //re-render only own info, without clearing child comments from subShowView
    this.$el.children().first().remove();
    this.$el.prepend(this.template({
      comment: this.model,
      showForm: this.showForm,
      formErrors: this.formErrors,
      formData: this.formData["comment"],
      votingDisabled: this.awaitingVoteReturn,
      formPending: this.formPending
    }));
    return this;
  }
})