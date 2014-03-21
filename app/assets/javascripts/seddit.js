window.Seddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.Seddit.router = new Seddit.Routers.SubRouter({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
  subviews: function() {
    if(!this._subviews) {
      this._subviews = [];
    }
    return this._subviews;
  },

  addSubview: function(view) {
    this.subviews().push(view)
  },

  removeSubview: function(view) {
    if (this.subviews().indexOf(view) > -1) {
      this.subviews().splice(this.subviews().indexOf(view), 1);
    }
  },

  findSubviewByModel: function(model) {
    var foundView = this.subviews().forEach(function(subview) {
      if (subview.model === model) {
        return subview;
      }
    });
    return null;
  },

  removeSubviewByModel: function(model) {
    var foundView = this.findSubviewByModel(model);
    if (foundView) {
      this.removeSubview(foundView);
    }
  },

  renderSubviewByModel: function(model) {
    var foundView = this.findSubviewByModel(model);
    if (foundView) {
      this.subviews().indexOf(foundView).render();
    }
  },

  remove: function() {
    this.subviews().forEach(function(subview) {
      subview.remove();
    })
    this.stopListening();
    this.$el.remove();
  }
});