define(['backbone'], function (Backbone) {
	"use strict";
	
	var DragAndDropView = Backbone.View.extend({
		x: 0, 

		y: 0,

		events: {
			"mousedown" : "startMove",
			"mouseup": "endMove"
		},

		initialize: function () {
			_.bindAll(this, "render", "startMove", "moveIt", "endMove");
		},

		startMove: function (evt, moveType){
			this.x = evt.clientX;
			this.y = evt.clientY;

			$("#svgRoot").get(0).addEventListener("mousemove", this.moveIt);
		},

		moveIt: function (evt){
			var translation = this.el.getAttributeNS(null, "transform");
			var parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(translation);
			var sx = parseFloat( parts[1] ); 
			var sy = parseFloat( parts[2] );

			var posX = sx + evt.clientX - this.x;
			var posY = sy + evt.clientY - this.y;

			this.el.setAttributeNS(null, "transform", "translate("+posX+","+posY+")");

			this.x = evt.clientX;
			this.y = evt.clientY;
		},

		endMove: function (){
			$("#svgRoot").get(0).removeEventListener("mousemove", this.moveIt);

			this.options.appView.trigger("updateGraph");
		}

	});

	return DragAndDropView;
});
