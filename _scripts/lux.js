// It's a lightbox oh geez
// Hand-written by me so probably full of bugs
var lux = {
	
	init: function(){
		// Set up click event handlers
		var images = document.querySelectorAll('.lux');

		for (i=0;i<images.length;i++) {
			addListener(images[i], 'click', function(e){

				if (hasClass(e,'obj-lux')) {
					e = e.querySelector('img');
				};

				lux.show(e.target);
			});
		};
	},
	
	show: function(e){

		// Create a clone of the image that was clicked on
		var clone = document.createElement('img');
		clone.src = e.getAttribute("data-full");
		addClass(clone, 'clone');

		// Create an overlay div
		var overlay = document.createElement('div');
		addClass(overlay, 'overlay');

		// Append the clone inside the overlay, then append the overlay to the body
		overlay.appendChild(clone);
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(overlay);

		// Add 'overlay--open' class
		setTimeout(function(){
			addClass(overlay, 'overlay--open')
		}, 10);

		// Add click handlers for closing the overlay
		addListener(overlay, 'click', function(){
			lux.hide();
		});

		// Prevent scrolling while lightbox is open
		var html = document.getElementById('html');
		addClass(html, 'frozen');
	},

	hide: function(){
		var overlay = document.querySelectorAll('.overlay')[0];
		
		// Remove 'overlay--open' class
		removeClass(overlay, 'overlay--open');

		setTimeout(function(){
			overlay.parentNode.removeChild(overlay);
			var html = document.getElementById('html');
		}, 210);

		// Restore scrolling
		removeClass(html, 'frozen');
	},

	obj: function(el) {
		addListener(el, 'click', function(e){
			e = el.querySelector('img');
			lux.show(e);
		});
	}
}