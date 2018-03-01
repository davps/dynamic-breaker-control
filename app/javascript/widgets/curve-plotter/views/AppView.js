define(['sandbox'], function(sandbox){

	var AppView = sandbox.mvc.View({
		
		initialize:function(){
			_.bindAll(this, "render", "plotIt");

			this.render();
		},

		plotIt: function (svg) {
			svg.plot.noDraw().
				addFunction('sine', Math.sin, 'blue', 3).
				addFunction('Cosine', Math.cos, 'red', 3).
				format('#DDD', 'gray').
				gridlines({stroke: 'gray', strokeDashArray: '2'}, 'black'); 
			svg.plot.legend.show(false);
			svg.plot.xAxis.scale(-1, 3.5).ticks(1, 0.2);
			svg.plot.yAxis.scale(-1.5, 1.5).ticks(1, 0.2); 
			svg.plot.redraw();
		},

		render: function(){
			this.$el.css({height:"500px"});
			this.$el.svg(this.plotIt);
			return this;			
		}
	});

	return AppView;	
	
});
