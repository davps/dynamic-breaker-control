define(['backbone', "../models/BusBar"], function (Backbone, BusBar) {
	
	var BusBars = Backbone.Collection.extend({
		model: BusBar,

		localStorage: new Backbone.LocalStorage("BusBarCollection"),

		comparator: function (busbar) {
			return busbar.get("order");
		}

	});

	return BusBars;
});
