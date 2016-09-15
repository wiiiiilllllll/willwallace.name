// Add a new class "js" to the HTML element to show that js is enabled
document.getElementById('html').className = "js";

// b-lazy is our lazy-loading image solution
// https://github.com/dinbror/blazy
var bLazy = new Blazy();

// It's time to light the lightboxes
lux.init();

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

// Add classname
function addClass(el, cl) {
	if (el.classList) {
		el.classList.add(cl);
	} else {
		el.className += ' ' + cl;
	}
}

// Remove classname
function removeClass(el, cl) {
	if (el.classList) {
		el.classList.remove(cl);
	} else {
		el.className = el.className.replace(new RegExp('(^|\\b)' + cl.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}