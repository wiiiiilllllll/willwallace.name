// Add a new class "js" to the HTML element to show that js is enabled
document.getElementById('html').className = "js";

// b-lazy is our lazy-loading image solution
// https://github.com/dinbror/blazy
var bLazy = new Blazy({
	success: function(el){
		if (Modernizr.objectfit) {
			obj(el.parentNode);
		};
	}
});

// It's time to light the lightboxes
lux.init();