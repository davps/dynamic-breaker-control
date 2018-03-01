define(['backbone', 'text!../templates/BusBarTemplate.svg'], function (Backbone, BusBarTemplate) {
	
	var BusBarView = Backbone.View.extend({
		template: _.template(BusBarTemplate),

		initialize: function () {
			_.bindAll(this, "render", "updateGraph");

			var xmlns="http://www.w3.org/2000/svg";
			var g = document.createElementNS(xmlns, "g");
			var g = document.createElementNS(xmlns, "g");
			g.setAttributeNS(null, "id", this.model.get("id"));
			g.setAttributeNS(null, "class", "busbar conductingEquipment");
			g.setAttributeNS(null, "transform", "translate(0,0)");
			this.setElement(g);
		},

		updateGraph: function (e) {
			this.options.appView.trigger("updateGraph");
		},

		render: function () {
			this.$el.html("");
			this.$el.append(this.template());
			this.$el.attr("transform", "translate(" + this.model.get("positionX") + "," + this.model.get("positionY") + ")");

			return this;
		}
	});

	return BusBarView;
});
