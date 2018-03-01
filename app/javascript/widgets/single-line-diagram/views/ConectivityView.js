define(['backbone'], function (Backbone) {
	
	var ConectivityView = Backbone.View.extend({
		topology: [],

		initialize: function () {
			_.bindAll(this, "render", "updateGraph");


			this.options.appView.on("updateGraph", this.updateGraph);
		},

		updateGraph: function () {
			this.render();
			this.options.appView.trigger("updateFlow");
		},

		render: function () {
			this.options.topology.length = 0; //empty the array without losing the other references to it

			var $connectedNodes = $("rect.connected");
			$connectedNodes.removeClass("connected");

			var breakerConectivityNodes = $("rect.node");
			var busbarConectivityNodes = $("line.node");

			breakerConectivityNodesLength = breakerConectivityNodes.length;
			busbarConectivityNodesLength = busbarConectivityNodes.length;

			/*populate the busbars, one by one*/
			_(busbarConectivityNodes).each(function (lineEl) {
				var $line = $(lineEl);

				var xforms = $line.parent().parent().attr('transform');
				var parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
				var desfasajeXline = parseFloat( parts[1] ); 
				var desfasajeYline = parseFloat( parts[2] );

				var x1Bus = parseFloat( $line.attr("x1") ) + desfasajeXline;
				var x2Bus = parseFloat( $line.attr("x2") ) + desfasajeXline;
				var y1Bus = parseFloat( $line.attr("y1") ) + desfasajeYline;
				var y2Bus = parseFloat( $line.attr("y2") ) + desfasajeYline;
				var strokeBus = parseFloat( $line.attr("stroke-width") );

				/*verify if each breaker connectivity node of the whole circuit is collisioning with the busbar*/
				var breakerNodesConnectedToBus = _(breakerConectivityNodes).filter(function (rectEl) {
					var $rect = $(rectEl);
					var xConnector = parseFloat( $rect.attr("x") );
					var yConnector = parseFloat( $rect.attr("y") );
					var widthConnector = parseFloat( $rect.attr("width") );
					var heightConnector = parseFloat( $rect.attr("height") );

					var xforms = $rect.parent().parent().attr('transform');
					var parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
					var desfasajeX = parseFloat( parts[1] );
					var desfasajeY = parseFloat( parts[2] );

					var connectorVertexs = [
						{
							px: xConnector + (desfasajeX),
							py: yConnector + (desfasajeY)
						},
						{
							px: xConnector + widthConnector + (desfasajeX),
							py: yConnector + (desfasajeY)
						},
						{
							px: xConnector + widthConnector + (desfasajeX),
							py: yConnector + heightConnector + (desfasajeY)
						},
						{
							px: xConnector + (desfasajeX),
							py: yConnector + heightConnector + (desfasajeY)
						}
					];

					/*verify the collition of node X with the busbar (YES|NOT)*/
					var result = _(connectorVertexs).find(function (v, index) {
						var condition1 = v.px > x1Bus;
						var condition2 = v.px < x2Bus;
						var condition3 = v.py > y1Bus;
						var condition4 = v.py < (y1Bus + strokeBus);

						/*
						console.log("v.px > x1Bus | ", "v.px=", v.px, " x1Bus=", x1Bus, condition1);
						console.log("v.px > x2Bus | ", "v.px=", v.px, " x2Bus=", x2Bus, condition2);
						console.log("v.px > x1Bus | ", "v.py=", v.py, " x1Bu=", x1Bus,  condition3);
						console.log("v.py > (y1Bus + strokeBus) | ", "v.py=", v.py, " y1Bus + strokeBus=", y1Bus + strokeBus, condition4);*/

						if( condition1 && condition2 && condition3 && condition4 ){
							$rect.addClass("connected");
							return true;
						}else{
							return false;
						}
					}, this);

					return result;

				}, this); //end _(breakerConectivityNodes).filter
				
				var breakersConnectedToBus = _(breakerNodesConnectedToBus).map(function (nodeEl) {
					var $parent = $(nodeEl).parent().parent().attr("id");
					return $parent;
				}, this);

				var topologyItem = {
					busbar: $(lineEl).parent().parent().attr("id"),
					nodes: breakersConnectedToBus
				};

				this.options.topology.push(topologyItem);

			}, this); //end _(busbarConectivityNodes).each


			return this;
		}
	});

	return ConectivityView;
});
