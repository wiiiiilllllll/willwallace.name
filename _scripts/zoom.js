// ZOOM JS
// Like a lightbox but written from scratch for some reason

var zoom = {

	init: function(){
		$('.zoom').on('click', function(e){
			e.preventDefault();
			target = $(e.target).attr('href') ? $(e) : $(e).parents('[href]');
			zoom.load(target);
		})
	},

	load: function(e){
		href = e.attr('href');
		frag = document.createDocumentFragment();
		img = ajax(href);
		zoom.show(img);
	},

	show: function(img){
		console.log('img ',img);
	},
}