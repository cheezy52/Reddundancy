Seddit.Views.FormView = Backbone.View.extend({
  initialize: function(options) {
    //must be passed a formClassName in options!
    this.formVisible = false;
    this.formErrors = "";
    this.formDataDefault = {};
    this.formPending = false;
    this.formClassName = options.formClassName;
    this.formSelector = ".new-" + this.formClassName + "-form";
    this.formShowButton = ".new-" + this.formClassName + "-show";
    this.formDataDefault = {};
    this.formDataDefault[this.formClassName] = null;
    var templateName = this.formClassName + "_form";
    this.template = JST[templateName];
  },

  events: function() {
    var formShowEventKey = "click " + this.formShowButton;
    var formSubmitEventKey = "submit " + this.formSelector;
    var variableEvents = {};
    variableEvents[formShowEventKey] = "showForm";
    variableEvents[formSubmitEventKey] = "submitForm";
    return variableEvents;
  },

  sedditClass: "FormView",

  render: function() {
    var view = this;
    var formData = $("form").serializeJSON();
    if(!formData[this.formClassName]) {
      formData = this.formDataDefault;
    }
    this.$el.html(this.template({
      model: this.model,
      collection: this.collection,
      showForm: this.formVisible,
      formErrors: this.formErrors,
      formPending: this.formPending,
      formData: formData
    }));
    return this;
  },

  showForm: function(event) {
    event.preventDefault();
    this.formVisible = !this.formVisible;
    this.render();
  },

  submitForm: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    view.formPending = true;
    view.render();
    newModel.save({}, {
      success: function(model) {
        view.formVisible = false;
        view.formErrors = null;
        view.formPending = false;
        view.$el.find(view.formSelector).empty();
        view.collection.add(model);
        view.render();
      },
      error: function(model, response) {
        view.formPending = false;
        view.formErrors = JSON.parse(response.responseText);
        view.render();
      }
    })
  }
})