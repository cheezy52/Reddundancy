Seddit.Views.PaginationView = Backbone.View.extend({
  template: JST["pagination"],

  events: {
    "click .nextPage": "nextPage",
    "click .prevPage": "previousPage"
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

  nextPage: function(event) {
    event.preventDefault();
    if(this.collection.page < this.collection.total_pages) {
      this.collection.page += 1;
      this.collection.fetch({ data: { page: this.collection.page } });
    }
  },

  previousPage: function(event) {
    event.preventDefault();
    if(this.collection.page > 1) {
      this.collection.page -= 1;
      this.collection.fetch({ data: { page: this.collection.page } });
    }
  }
});