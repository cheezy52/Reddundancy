Seddit.Views.SubsIndexView = Backbone.View.extend({
  template: JST["subs_index"],

  events: {

  },

  initialize: function(options) {
    Backbone.FormBearingView.prototype.initialize.call(this, options);
    this.listenTo(this.collection, "add change sync update remove", this.render);
    this.formDataDefault["sub"] = { "name" : null };
    this.formPending = false;
  },

  formHelpers: function(selector, className) {
    return Backbone.FormBearingView.prototype.formHelpers.call(this);
  },

  render: function() {
    var templateArgs = _.extend({
      subs: this.collection
    }, this.formHelpers(".new-sub-form", "sub"));

    this.$el.html(this.template(templateArgs));
    return this;
  },

  showForm: function(event) {
    Backbone.FormBearingView.prototype.showForm.call(this, event);
    this.$el.find(".sub-form-name").focus();
  },

  submitForm: function(event) {
    Backbone.FormBearingView.prototype.submitForm.call(this, event);
  }
})