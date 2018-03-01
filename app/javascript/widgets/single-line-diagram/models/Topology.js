define(['backbone'], function (Backbone) {
	
	var Topology = Backbone.Model.extend({
		defaults:{
			mark: [],
			matriz: []
		},

		initialize: function () {
			_.bindAll(this, "adjacentVertexs", "adjacentVertex", "adjacentEdges");
		},

		adjacentVertexs : function (t) {
			var vertexs = [];
			var edges = [];

			var x = t.x;
			var y = t.y;

			for (var j = 0; j < this.attributes.matriz[x].length; j++) {
				if(this.attributes.matriz[x][j]){
					edges.push(j);
				}
			}

			for(var k = 0; k < edges.length; k++){
				for(var i = 0; i < this.attributes.matriz.length; i++){
					var j = edges[k];
					if(this.attributes.matriz[i][j] && (i !== x)){
						vertexs.push(i);
					}
				}
			}

			return vertexs;
		},

		adjacentVertex : function (t, e) {
			var vertex;

			var x = t.x;
			var y = t.y;

			for(var i = 0; i < this.attributes.matriz.length; i++){
				var j = e;
				if(this.attributes.matriz[i][j] && (i !== x)){
					//vertex = i;
					vertex = {id: 1000, x:i, y:j, name: "node U", mark: false};
					return vertex;
				}
			}

			//vertex = {id: 2, x:2, y:1, name: "node v", mark: false};

			return;
		},

		/*
		 * return the edges of a given @t vertex, 
		 * expressed in an array of the column numbers
		 * of the incidence matrix.
		 *
		 * Also, these edge number can be found in the "order" attribute
		 * of any breaker model.
		 * 
		 * The row number of the matrix is "not" returned, consult
		 * the @t.x parameter for the row number
		 */
		adjacentEdges : function (t) {
			var edges = [];

			var x = t.x;

			for(var j = 0; j < this.attributes.matriz[x].length; j++){
				if(this.attributes.matriz[x][j]){
					edges.push(j);
				}
			}

			return edges;
		},


	});

	return Topology;
});
