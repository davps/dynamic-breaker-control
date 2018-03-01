define(['backbone'], function (Backbone) {
	
	var BusBar = Backbone.Model.extend({
		defaults:{
			nodeNumber: 0,
			graphVertexName: "v_",
			name: "",
			positionX:0,
			positionY:0,
			order: 1000
		}
	});

	return BusBar;
});
