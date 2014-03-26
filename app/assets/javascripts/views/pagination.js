Seddit.Views.PaginationView = Backbone.View.extend({
  template: JST["pagination"],

  events: {
    "click .pageNav": "toPage"
  },

  className: "pagination-container container",

  initialize: function(options) {
    this.listenTo(this.collection, "change", this.render);
    //default width of visible pagination range
    this.range = options.range || 3;
    //for parent view to differentiate between top and bottom pagination views
    this.position = options.position;
  },

  sedditClass: "PaginationView",

  render: function() {
    this.$el.html(this.template({
      page: this.collection.page,
      total_pages: this.collection.total_pages,
      range: this.range
    }));
    return this;
  },

  toPage: function(event) {
    event.preventDefault();
    if(!$(event.target).hasClass("disabled")) {
      this.collection.page = $(event.target).data("page");
      this.collection.fetch({ data: { page: this.collection.page } });
    }
  }
});