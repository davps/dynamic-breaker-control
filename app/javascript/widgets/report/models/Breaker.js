define(['backbone'], function (Backbone) {
	
	var Breaker = Backbone.Model.extend({
		defaults:{
			position: false
		}
	});

	return Breaker;
});
