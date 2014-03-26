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

  formHelpers: function(selector, className) {
    return Backbone.FormBearingView.prototype.formHelpers.call(this);
  },

  initialize: function(options) {
    //call super
    Backbone.VotableView.prototype.initialize.call(this, options);
    Backbone.FormBearingView.prototype.initialize.call(this, options);
    this.listenTo(this.model.vote, "request sync", this.render);
    this.formDataDefault["comment"] = { "comment": { "body": null } };

    //pseudo-render to get elements in place for full render
    var templateArgs = _.extend({
      comment: this.model,
      votingDisabled: false,
    }, this.formHelpers(".new-comment-form", "comment"));

    this.$el.html(this.template(templateArgs));
  },

  render: function() {
    //re-render only own info, without clearing child comments from subShowView
    this.$el.children().first().remove();

    var templateArgs = _.extend({
      comment: this.model,
      votingDisabled: false,
    }, this.formHelpers(".new-comment-form", "comment"));

    this.$el.prepend(this.template(templateArgs));
    return this;
  }
})