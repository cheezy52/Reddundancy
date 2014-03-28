Seddit.Views.SubSedditView = Backbone.CompositeView.extend({
  template: JST["sub"],

  sedditClass: "SubSedditView",

  tagName: "li",

  initialize: function(options) {
    this.addSubview(new Seddit.Views.FavoriteView({
      model: this.model
    }));
  },

  render: function() {
    var view = this;
    this.$el.html(this.template({
      sub: this.model
    }));

    this.subviews().forEach(function(subview) {
      if(subview.sedditClass === "FavoriteView") {
        view.$el.find(".submission-buttons").prepend(subview.render().$el);
      } else {
        view.$el.prepend(subview.render().$el);
      }
      subview.delegateEvents();
    })
    return this;
  }

});