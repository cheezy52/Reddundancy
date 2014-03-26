Backbone.FormBearingView = Backbone.View.extend({
  initialize: function(options) {
    this.showForm = false;
    this.formErrors = "";
    this.formDataDefault = {};
    this.formPending = false;
    this.formClassName = options.formClassName;
    this.formSelector = ".new-" + this.formClassName + "-form";
    this.formShowButton = ".new-" + this.formClassName + "-show";
    this.formDataDefault = {};
    this.formDataDefault[this.formClassName] = null;
    Backbone.FormBearingView.prototype.addFormEvents.call(this);
  },

  formHelpers: function() {
    var formData = this.$el.find(this.formSelector).first().serializeJSON();
    if(!formData[this.formClassName]) {
      formData = this.formDataDefault;
    }
    return {
      showForm: this.showForm,
      formErrors: this.formErrors,
      formPending: this.formPending,
      formData: formData
    }
  },

  addFormEvents: function() {
    this.events["click " + this.formShowButton] = "showForm";
    this.events["submit " + this.formSelector] = "submitForm";
  },

  showForm: function(event) {
    console.log("showForm fired");
    this.showForm = !this.showForm;
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
        view.showForm = false;
        view.formErrors = null;
        view.formPending = false;
        view.$el.find(view.formSelector).empty();
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