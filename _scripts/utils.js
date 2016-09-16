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
	} else if (!hasClass(el, cl)) {
		el.className += ' ' + cl;
	}
}

// Remove classname
function removeClass(el, cl) {
	if (el.classList) {
		el.classList.remove(cl);
	} else if (hasClass(el, cl)) {
		el.className = el.className.replace(new RegExp('(^|\\b)' + cl.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

// Check if element has a certain class
function hasClass(ele, className) {
    return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
}