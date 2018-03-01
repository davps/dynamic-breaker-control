define(['backbone', './BusBar'], function (Backbone, BusBar) {
	
	var Feeder = BusBar.extend({
		defaults:{
			energized: true,
			name: "",			
			order: 1000,
			positionX:0,
			positionY:0,
			busbarName: ""
		}
	});

	return Feeder;
});
