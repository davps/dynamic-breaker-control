define(['backbone', "./BreakerListView", "text!../templates/TableHeadTemplate.html"], function (Backbone, BreakerListView, TableHeadTemplate) {
	
	var TableView = Backbone.View.extend({
		tagName: "table",

		className: "table",

		template: _.template(TableHeadTemplate),

		initialize: function () {
			_.bindAll(this, "render");
		},

		render: function () {
			//thead
			this.$el.html(this.template());

			//tbody
			view = new BreakerListView({collection:this.collection});
			this.$el.append(view.render().el);

			return this;
		}
	});

	return TableView;
});
