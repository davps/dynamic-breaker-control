define(['sandbox', "./SvgView", "./BreakerView", "./BusBarView", "../models/Breaker", "../collections/Breakers", "../models/BusBar", "../collections/BusBars", "../models/Feeder", "../collections/Feeders", "./FeederView", "./ConectivityView", "./PowerFlowView", "./DragAndDropView"], function(sandbox, SvgView, BreakerView, BusBarView, Breaker, Breakers, BusBar, BusBars, Feeder, Feeders, FeederView, ConectivityView, PowerFlowView, DragAndDropView){

	var AppView = sandbox.mvc.View({
		events: {
			"click button.btn-breaker" : "clickNewBreaker",
			"click button.btn-busbar" : "clickNewBusbar",
			"click button.btn-feeder" : "clickNewFeeder"
		},

		initialize:function(){
			_.bindAll(this, "render", "createBusBarView", "createFeederView", "clickNewBreaker", "clickNewBusbar", "addDragAndDrop");

			this.breakers = new Breakers();	
			this.busBars = new BusBars();	
			this.feeders = new Feeders();

			var self = this;
			this.breakers.fetch({
				success: function () {
					var that = self;
					var ids = that.breakers.pluck("id");
					_(ids).each(function (id) {
						that.breakers.get(id).destroy();
					}, this);
				}
			});

			this.svgView;
			this.topologyDOM = [];

			this.render();
		},

		clickNewBreaker: function (e) {
			this.createBreakerView("breaker_" + Math.round(Math.random()*10000) );
		},

		clickNewBusbar: function (e) {
			this.createBusBarView("busbar_" + Math.round(Math.random()*10000) );
		},

		clickNewFeeder: function (e) {
			this.createFeederView("feeder_" + Math.round(Math.random()*10000) );
		},
		
		createBreakerView: function (elementId, position) {
			var breaker = new Breaker();
			breaker.set({
				id: elementId,
				name: elementId
			});

			position ? breaker.set(position) : breaker.set({positionX:(50+Math.random()*300), positionY:(50+Math.random()*300)});

			this.breakers.add(breaker);
			breaker.save();	
			var breakerView = new BreakerView({
				model:breaker,
				appView: this
			});
			$("#single-line-diagram-wrapper").append(breakerView.render().el);
			this.addDragAndDrop(breakerView.el);
		},

		addDragAndDrop: function (el) {
			new DragAndDropView({
				el:el,
				appView: this
			});
		},

		createBusBarView: function (elementId, position) {
			var busBar = new BusBar();
			busBar.set({
				id: elementId,
				name: elementId
			});

			position ? busBar.set(position) : busBar.set({positionX:(50+Math.random()*300), positionY:(50+Math.random()*300)});

			this.busBars.add(busBar);
			busBar.save();	
			var busBarView = new BusBarView({
				model:busBar,
				appView: this
			});
			$("#single-line-diagram-wrapper").prepend(busBarView.render().el);
			this.addDragAndDrop(busBarView.el);
		},

		createFeederView: function (elementId, position) {
			var feeder = new Feeder();
			feeder.set({
				id: elementId,
				name: elementId
			});

			position ? feeder.set(position) : feeder.set({positionX:(50+Math.random()*300), positionY:(50+Math.random()*300)});

			this.feeders.add(feeder);
			feeder.save();
			var feederView = new FeederView({
				model:feeder,
				appView: this				
			});
			$("#single-line-diagram-wrapper").append(feederView.render().el);
			this.addDragAndDrop(feederView.el);
		},
		
		render: function(){
			this.svgView = new SvgView();
			this.$el.html(this.svgView.render().el);

			/*this.createBreakerView("breaker_1", {positionX:138, positionY: 10});
			this.createBreakerView("breaker_2");
			this.createBreakerView("breaker_3");
			this.createBusBarView("barra_1");
			this.createBusBarView("barra_2");*/

			var cview = new ConectivityView({
				appView: this,
				topology: this.topologyDOM
			});
			cview.render();

			var flow = new PowerFlowView({
				topologyDOM: this.topologyDOM,
				appView: this,
				collections: {
					breakers: this.breakers,
					busBars: this.busBars,
					feeders: this.feeders
				}
			});

			this.$el.prepend("<button class='btn btn-breaker'>Add new breaker</button>");
			this.$el.prepend("<button class='btn btn-busbar'>Add new bus bar</button>");
			this.$el.prepend("<button class='btn btn-feeder'>Add new feeder</button>");

			return this;			
		}
	});

	return AppView;	
	
});
