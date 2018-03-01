define(["core", "backbone", "sandbox"], function(core, Backbone, sandbox){

	var AppRouter = Backbone.Router.extend({
		routes: {
			//"": "home" 
		},

		initialize: function () {
		   // Backbone.history.start();

		    _.bindAll(this, "startReport", "startPlotter", "home");

		    this.home();
		},

		home: function(){
			core.start('features-launcher', "#buttons-box");
			core.start('single-line-diagram', "#single-line-diagram-container");

			sandbox.subscribe('order:show-report-of-breaker-status', 'features-launcher-channel', this.startReport);
			sandbox.subscribe('order:show-curve-plotter', 'features-launcher-channel', this.startPlotter);
		},

		startReport: function (argument) {
			core.start('report', "#report-container");
		},

		startPlotter: function (argument) {
			core.start('curve-plotter', "#report-container");
		},

	});

	return AppRouter;

});

