Seddit.Views.SubsIndexView = Backbone.View.extend({
  template: JST["subs_index"],

  events: {
    "click #new-sub-show": "showNewSubForm",
    "submit #new-sub-form": "submitSub"
  },

  initialize: function(options) {
    this.listenTo(this.collection, "add change sync update remove", this.render);
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({
      subs: this.collection
    }));
    return this;
  },

  showNewSubForm: function(event) {
    $("#new-sub-show").addClass("hidden");
    $("#new-sub-form").removeClass("hidden");
    $("#new-sub-form").find(".sub-form-name").focus();
  },

  submitSub: function(event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.target).serializeJSON();
    var newModel = new view.collection.model(formData);
    newModel.save({}, {
      success: function(model) {
        $("#new-sub-show").addClass("hidden");
        $("#new-sub-form").removeClass("hidden");
        view.collection.add(model);
      },
      error: function(model, errors) {
        $("#sub-form-errors").text(JSON.parse(errors.responseText));
      }
    })
  }
})