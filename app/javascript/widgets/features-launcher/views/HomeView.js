define(['sandbox', 'backbone', "text!../templates/HomeTemplate.html"], function (sandbox, Backbone, HomeTemplate) {
	
	var HomeView = Backbone.View.extend({
		template: _.template(HomeTemplate),

		events:{
			"click .power-flow-btn": "showPowerFlow",
			"click .report-btn": "showReport",
			"click .graphic-btn": "showGraphic"
		},

		initialize: function () {
			_.bindAll(this, "render", "showPowerFlow", "showReport", "showGraphic");
		},

		showPowerFlow: function (e) {
			sandbox.publish('order:show-power-flow-event');
		},

		showReport: function (e) {
			sandbox.publish('order:show-report-of-breaker-status');
		},

		showGraphic: function (e) {
			sandbox.publish('order:show-curve-plotter');
		},

		render: function () {
			this.$el.html(this.template());

			$(".graphic-btn", this.$el).click(function (e) {
				e.preventDefault();
				var href = this.href;
				setTimeout(function () {
					$('html, body').animate({
						scrollTop: $("#curve-plotter").offset().top
					}, "slow");
				}, 200);
			});


			return this;
		}
	});

	return HomeView;
});