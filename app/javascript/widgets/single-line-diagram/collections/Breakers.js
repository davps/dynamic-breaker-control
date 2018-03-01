define(['backbone', "../models/Breaker"], function (Backbone, Breaker) {
	
	var Breakers = Backbone.Collection.extend({
		model: Breaker,

		localStorage: new Backbone.LocalStorage("BreakerCollection"),

		comparator: function (breaker) {
			this.each(function (model, index) {
				model.set("order", index);
			});			
			return breaker.get("order");
		}
	});

	return Breakers;
});
