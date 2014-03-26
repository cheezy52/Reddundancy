Seddit.Views.PaginationView = Backbone.View.extend({
  template: JST["pagination"],

  events: {
    "click .pageNav:not(.disabled)": "toPage"
  },

  initialize: function(options) {
    this.listenTo(this.collection, "change", this.render);
    //for parent view to differentiate between top and bottom pagination views
    this.position = options.position;
  },

  sedditClass: "PaginationView",

  render: function() {
    this.$el.html(this.template({
      page: this.collection.page,
      total_pages: this.collection.total_pages
    }));
    return this;
  },

  toPage: function(event) {
    event.preventDefault();
    this.collection.page = $(event.target).data("page");
    this.collection.fetch({ data: { page: this.collection.page } });
  }
});