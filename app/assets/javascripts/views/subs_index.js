Seddit.Views.SubsIndexView = Backbone.CompositeView.extend({
  template: JST["subs_index"],

  events: {

  },

  sedditClass: "SubsIndexView",

  initialize: function(options) {
    this.listenTo(this.collection, "add change sync update remove", this.render);
    this.addSubview(new Seddit.Views.FormView({
      model: this.model,
      collection: this.collection,
      formClassName: "sub"
    }));
    this.addSubview(new Seddit.Views.PaginationView({
      collection: this.collection,
      position: "top"
    }));
    this.addSubview(new Seddit.Views.PaginationView({
      collection: this.collection,
      position: "bottom"
    }));
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({ subs: this.collection }));

    this.subviews().forEach(function(subview) {
      if(subview.sedditClass === "FormView") {
        view.$el.find("#new-sub-form-container").html(subview.render().$el);
      } else if(subview.sedditClass === "PaginationView") {
        //put pagination links both above and below
        if (subview.position === "top") {
          view.$el.prepend(subview.render().$el);
        } else {
          view.$el.append(subview.render().$el);
        }
      } else {
        view.$el.prepend(subview.render().$el);
      }
      subview.delegateEvents();
    })
    return this;
  }
})