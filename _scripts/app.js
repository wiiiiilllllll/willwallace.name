// Add a new class "js" to the HTML element to show that js is enabled
document.getElementById('html').className = "js";

// b-lazy is our lazy-loading image solution
// https://github.com/dinbror/blazy
var bLazy = new Blazy();

// Set up click handlers for the lightbox
var elements = document.querySelectorAll('.pop');
for (i=0;i<elements.length;i++) {
	addListener(elements[i],'click',function(e){
		pop(e);
	});
};

// Show a lightbox
// http://argunner.github.io/uglipop.js/
function pop(el){
	var full = el.target.getAttribute("data-full");
	console.log('full',full)
	uglipop({
		class:'uglipop',
		source:'html',
	    content:'<img src="'+full+'"></img>'
	})
};

// Cross-browser event listener
// http://stackoverflow.com/a/12783362
function addListener(elem, type, fn) {
    if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);

    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, function() {
                                          return fn.call(elem, window.event);
                                       });
    } else {
        elem["on" + type] = fn;
    }
}