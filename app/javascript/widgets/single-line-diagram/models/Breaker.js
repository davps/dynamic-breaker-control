define(['backbone'], function (Backbone) {
	
	var Breaker = Backbone.Model.extend({
		defaults:{
			position: true,
			meshNumber: 0,
			graphEdgeName: "i_",
			name: "",
			rotation: 0,
			positionX:0,
			positionY:0,
			order: 1000
		},

		toggle: function () {
			this.set("position", !this.get("position"));
		}
	});

	return Breaker;
});
