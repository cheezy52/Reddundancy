Seddit.Views.SubsIndexView = Backbone.View.extend({
  template: JST["subs_index"],

  events: {

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
  }
})