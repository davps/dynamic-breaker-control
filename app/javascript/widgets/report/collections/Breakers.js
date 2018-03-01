define(['backbone', "../models/Breaker"], function (Backbone, Breaker) {
	
	var Breakers = Backbone.Collection.extend({
		model: Breaker,
		localStorage: new Backbone.LocalStorage("BreakerCollection")
	});

	return Breakers;
});
