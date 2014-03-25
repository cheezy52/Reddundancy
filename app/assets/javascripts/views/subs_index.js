Seddit.Views.SubsIndexView = Backbone.View.extend({
  template: JST["subs_index"],

  events: {
    "click .new-sub-show": "showNewSubForm",
    "submit .new-sub-form": "submitSub"
  },

  initialize: function(options) {
    this.listenTo(this.collection, "add change sync update remove", this.render);
    this.showForm = false;
    this.formErrors = null;
    this.formDataDefault = { "sub" : { "name" : null } };
    this.formPending = false;
  },

  render: function() {
    var formData = this.$el.find(".new-sub-form").first().serializeJSON();
    if(!formData["sub"]) {
      formData = this.formDataDefault;
    }
    this.$el.html(this.template({
      subs: this.collection,
      showForm: this.showForm,
      formErrors: this.formErrors,
      formData: formData["sub"],
      formPending: this.formPending
    }));
    return this;
  },

  showNewSubForm: function(event) {
    this.showForm = !this.showForm;
    this.render();
    this.$el.find(".sub-form-name").focus();
  },

  submitSub: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    view.formPending = true;
    this.render();
    newModel.save({}, {
      success: function(model) {
        view.formPending = false;
        view.formErrors = null;
        view.showForm = false;
        view.$el.find(".new-sub-form").empty();
        view.collection.add(model);
      },
      error: function(model, errors) {
        view.formPending = false;
        view.formErrors = JSON.parse(errors.responseText);
        view.render();
      }
    })
  }
})