define(['backbone', "./BreakerListItemView"], function (Backbone, BreakerListItemView) {
	
	var BreakerListView = Backbone.View.extend({
		tagName: "tbody",

		initialize: function () {
			_.bindAll(this, "render", "renderItem");
			this.collection.on("reset", this.render);
			this.collection.on("add", this.renderItem);
			this.collection.fetch();
		},

		renderItem: function (model) {
			var itemView = new BreakerListItemView({model:model});
			this.$el.append(itemView.render().el);
		},

		render: function () {
			this.$el.html("");
			this.collection.each(this.renderItem);
			return this;
		}
	});

	return BreakerListView;
});
