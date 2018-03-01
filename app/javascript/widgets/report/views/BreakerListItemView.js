define(['backbone', "text!../templates/TableRowTemplate.html"], function (Backbone, TableRowTemplate) {
	
	var BreakerListItemView = Backbone.View.extend({
		tagName: "tr",

		template: _.template(TableRowTemplate),

		initialize: function () {
			_.bindAll(this, "render");
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			//this.$el.html("<a href='#'> Name: "+this.model.get("id")+" - Position " + this.model.get("position") + "</a>")
			return this;
		}
	});

	return BreakerListItemView;
});
