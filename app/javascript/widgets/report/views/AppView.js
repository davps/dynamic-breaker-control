define(['sandbox', "./TableView", "../models/Breaker", "../collections/Breakers", "text!../templates/ModalTemplate.html"], function(sandbox, TableView, Breaker, Breakers, ModalTemplate){

	var AppView = sandbox.mvc.View({
		template: _.template(ModalTemplate),
		
		initialize:function(){
			_.bindAll(this, "render");

			this.collection = new Breakers();	
			this.collection.fetch();

			this.render();
		},

		render: function(){
			var view;

			this.$el.html(this.template());

			$("#myModal", self.$el).modal();
			/*var self = this;
			this.$el.ready(function () {
			});			*/


			view = new TableView({collection:this.collection});
			$("#myModal .table-wrapper", this.$el).html(view.render().el);
			//view = new TableView({collection:this.collection});
			//$("#myModal table", this.$el).html(view.render().el);
			//this.$el.html(view.render().el);
			

			return this;			
		}
	});

	return AppView;	
	
});
