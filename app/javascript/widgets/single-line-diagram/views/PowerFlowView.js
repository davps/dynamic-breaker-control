define(['sandbox', 'backbone', "../models/Topology"], function (sandbox, Backbone, Topology) {
	'use strict';

	var PowerFlowView = Backbone.View.extend({

		initialize: function () {
			_.bindAll(this, "render", "unrenderFlow", "BFS", "calculatePowerFlow", "createIncidenceMatrix", "getUpdatedFeederModel");

			this.topologyDOM = this.options.topologyDOM;

			this.model = new Topology();

			sandbox.subscribe('order:show-power-flow-event', 'features-launcher-channel', this.calculatePowerFlow);			

			this.options.appView.on("updateFlow", this.calculatePowerFlow);
		},

		unrenderFlow: function(){
			$("g line").attr("stroke", "#000000");
		},

		getUpdatedFeederModel: function (feeder) {
			/*Find the busbar (vertex) of each connected feeder*/
			var rootVertexDOMobj = _(this.topologyDOM).find(function (busbar) {
				var nodeName = _(busbar.nodes).find(function (conectivityNodeName) {
					if(conectivityNodeName === feeder){
						return true;
					}
				}, this);
				return nodeName;
			}, this);

			/*Get a reference to the busbar model where the feeder is connected*/
			var energizedBusbarModel = this.options.collections.busBars.where({name: rootVertexDOMobj.busbar})[0];

			/*set in the feeder model a reference to the busbar where it is connected*/
			var feederModel = this.options.collections.feeders.where({name: feeder})[0];
			feederModel.set( "busbarName", energizedBusbarModel.get("name") );
			return feederModel;
		},

		calculatePowerFlow: function () {
			this.unrenderFlow();
			this.createIncidenceMatrix();
			var G = this.model;
			
			for(var i = 0; i < G.attributes.mark.length; i++){
				for(var j = 0; j < G.attributes.mark[i].length; j++){
					G.attributes.mark[i][j] = 0;
				}
			}
			
			/* Create a list of feeders connected to busbars (energized busbars), from the DOM*/
			var $feeders = $(".feeder rect.connected");
			var feederIDlist = _($feeders).map(function (feeder) {
				return $(feeder).parent().parent().attr("id");
			}, this);

			_(feederIDlist).each(function (feeder) {
				var feederModel = this.getUpdatedFeederModel(feeder);
				var busbarConnected = this.options.collections.busBars.where({name:feederModel.get("busbarName")})[0];

				/*render the busbar where the feeder is connected*/
				var $busbar = $("#"+busbarConnected.get("name"));
				$("line", $busbar).attr("stroke", "#FF8800");

				var rowNumber;
				_(G.attributes.matriz[busbarConnected.get("order")]).find(function (item, index) {
					if(item){
						rowNumber = index;
						return true;
					}
					return;
				}, this);

				var node_feeder = {
					x: busbarConnected.get("order"),
					y: rowNumber
				};				
				this.BFS(G, node_feeder);

			}, this);
			
		},

		/*
		 * Breadth-first search (strategy for searching in the Graph G of our current electrical topology)
		 */
		BFS : function (G, v) {
			var queue = [];

			queue.push(v);
			G.attributes.mark[v.x][v.y] = 1;

			while(queue.length > 0){
				var t = queue.shift();
				/*if(t.id === node_feeder.id){
					return t;
				}*/

				/*
				 * edges, expressed in an array of the column numbers
				 * of the incidence matrix.
				 */
				var edges = G.adjacentEdges(t);

				_(edges).each(function (e) {
					/*
					 * Store a reference of the busbar model with attribute "order" equal to @e
					 * on which the breaker model with attribute "order" equal to @t
					 */
					var u = G.adjacentVertex(t, e);
					if(u && !G.attributes.mark[u.x][u.y]){
						G.attributes.mark[u.x][u.y] = 1;

						/*
						 * Start Rendering!
						 * The block of code that is below is not part of the BFS algorithm
						 */
						var breaker = this.options.collections.breakers.where({order:u.y})[0];
						var $breaker = $("#"+breaker.get("name"));
						//!breaker.get("position") || $("line", $breaker).attr("stroke", "#FF8800");
						$("line", $breaker).attr("stroke", "#FF8800");

						var busbar = this.options.collections.busBars.where({order:u.x})[0];
						var $busbar = $("#"+busbar.get("name"));
						$("line", $busbar).attr("stroke", "#FF8800");
						/* end rendering block*/

						queue.push(u);
						console.log(u);
					}
				}, this);
			}

			return;
		},

		createIncidenceMatrix: function () {
			/* 
			 * This method calculates the incidence matrix of the current topology of the 
			 * system (excluding the feeder)
			 * Below there is an example of how it will look like:
			 * [
			 *	[1, 1, 0, 0, 0, 0],
			 *	[1, 0, 1, 0, 0, 0],
			 *	[0, 1, 1, 1, 0, 0],
			 *	[0, 0, 0, 1, 0, 0],
			 *	[0, 0, 0, 0, 1, 0],
			 *	[0, 0, 0, 0, 1, 1],
			 *	[0, 0, 0, 0, 0, 1]
			 * ]
			 *
			 * The incidence matrix is a mathematical resource, part of the Graph theory,
			 * and one of the applications is in power engineering, 
			 * in  advancend calculation of power flow 
			 * 
			 */

			this.options.collections.breakers.sort();

			var matriz = [];
			var mark = [];

			/*
			 * populate each busbar (vertex)
			 * @index represents the row number of the incidence matrix
			 */
			_(this.topologyDOM).each(function(v, index){
				matriz.push([]);
				/*populate each breaker (edge) connected to the busbar v*/
				_(v.nodes).each(function(edge_adjacent){
					/*
					 * Each column of the incidence matrix correspond
					 * to a breaker. The column number is stored in 
					 * the "order" attribute of the breaker model.
					 * So, it is necessary to get a reference to the
					 * @breaker model that correspond to @edge_adjacent
					 */
					/*var breaker = this.options.collections.breakers.find(function (brkr) {
						return brkr.get("name") === edge_adjacent;
					}, this);*/
					var breaker = this.options.collections.breakers.find(function(brkr, index){
						var a = 0;
						if(brkr.get("name") === edge_adjacent){
							return true;
						}
						return;
					}, this);				

					/*
					 * So, I set "1" to item if the matrix, 
					 * according to the incidence matrix 
					 * mathematical model
					 */
					if(breaker){
						matriz[index][breaker.get("order")] = 1;						
					}else{
						/*
						 * If @breaker is *undefined*, i.e., it is not a breaker, then it is a feeder
						 */
					}
				}, this);
			}, this);

			/*
			 * Store the row number of the busbar at the incidence matrix
			 * in the correspondent model
			 * so, next time I will not need to access to the DOM 
			 * to obtain this information
			 */
			_(this.topologyDOM).each(function (v, index) {
				var busbarModel = this.options.collections.busBars.find(function (busbar) {
					return busbar.get("name") === v.busbar;
				}, this);
				if(busbarModel){
					//busbarModel.set("order", this.topologyDOM.length - index - 1);					
					busbarModel.set("order", index);					
				}
			}, this);
			this.options.collections.busBars.sort();

			/*
			 * Detects the size of  the matrix (m x n), where:
			 *  	m = matriz.length
			 * 		n = rowWithMaxLength
			 */
			var rowWithMaxLength = _(matriz).max(function (row) {
				return row.length;
			}, this);

			/*
			 * Populate the whole matrix and
			 * fill with zeros the positions where (matriz[i][j] !== 1)
			 */
			for(var i = 0; i < matriz.length; i++){
				mark[i] = [];
				for(var j = 0; j < rowWithMaxLength.length; j++){
					matriz[i][j] = matriz[i][j] ? 1 : 0;
					mark[i][j] = 0;
				}
			}

			/*
			 * The breakers with position = "open" 
			 * can't be considered as edges, so, 
			 * the correspondent columns must be filled with zero
			 * to represent that status
			 */
			var openBreakers = this.options.collections.breakers.where({position:false});
			_(openBreakers).each(function (openBreaker) {
				var columnNumber = openBreaker.get("order");
				for(var i = 0; i < matriz.length; i++){
					matriz[i][columnNumber] = 0;
				}
			}, this);

			/*
			 * Store the results in the topology model
			 */
			this.model.set("matriz", matriz);
			this.model.set("mark", mark);
		},

		render: function () {
			return this;
		}
	});

	return PowerFlowView;
});
