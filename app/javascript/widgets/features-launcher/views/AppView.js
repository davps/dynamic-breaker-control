define(['sandbox', "./HomeView"], function(sandbox, HomeView){

	var AppView = sandbox.mvc.View({
		
		initialize:function(){
			this.render();
		},
		
		render: function(){
			var view;

			view = new HomeView();
			this.$el.html(view.render().el);

			return this;			
		}
	});

	return AppView;	
	
});
