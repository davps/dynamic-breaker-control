define(['backbone', "../models/Feeder"], function (Backbone, Feeder) {
	
	var Feeders = Backbone.Collection.extend({
		model: Feeder,
		
		localStorage: new Backbone.LocalStorage("FeederCollection"),
		
		comparator: function (feeder) {
			this.each(function (model, index) {
				model.set("order", index);
			});			
			return feeder.get("order");
		}
	});

	return Feeders;
});
