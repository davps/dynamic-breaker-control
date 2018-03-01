define(['backbone', 'text!../templates/BreakerTemplate.svg'], function (Backbone, BreakerTemplate) {
	
	var BreakerView = Backbone.View.extend({
		events: {
			"click" : "togglePosition"
		},

		template: _.template(BreakerTemplate),

		initialize: function () {
			_.bindAll(this, "render", "togglePosition", "renderNewPosition", "updateGraph");

			var xmlns="http://www.w3.org/2000/svg";
			var g = document.createElementNS(xmlns, "g");
			g.setAttributeNS(null, "id", this.model.get("id"));
			g.setAttributeNS(null, "class", "breaker conductingEquipment");
			g.setAttributeNS(null, "transform", "translate(0,0)");
			this.setElement(g);

			this.model.on("change:position", this.renderNewPosition);
			this.model.on("change:position", this.updateGraph);
		},

		updateGraph: function (e) {
			this.options.appView.trigger("updateGraph");
		},

		togglePosition: function () {
			this.model.toggle();
			this.model.save();
		},

		renderNewPosition: function () {
			if(this.model.get("position")){
				this.$switchEl.attr("transform", "translate(-10, 0)");
			}else{
				this.$switchEl.attr("transform", "translate(0, 0)");
			}
		},

		render: function () {
			this.$el.html("");
			this.$el.append(this.template());
			this.$el.attr("transform", "translate(" + this.model.get("positionX") + "," + this.model.get("positionY") + ")");

			this.$switchEl = $("path", this.$el);
			this.renderNewPosition();

			return this;
		}
	});

	return BreakerView;
});
