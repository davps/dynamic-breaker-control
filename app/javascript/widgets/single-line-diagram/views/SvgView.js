define(['backbone', "text!../templates/SvgTemplate.svg"], function (Backbone, SvgTemplate) {
	
	var SvgView = Backbone.View.extend({
		template: _.template(SvgTemplate),

		initialize: function () {
			_.bindAll(this, "render");
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		}
	});

	return SvgView;
});
