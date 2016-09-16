// Obj
// A basic replacement for object-fit
// Adapted from http://codepen.io/xaddict/pen/xZpJgW

function obj(el) {
	var img = el.querySelector('img');
	if (img.currentSrc) {
		el.style.backgroundImage = 'url(' + img.currentSrc + ')';
		addClass(el, 'obj');
		if (hasClass(img, 'lux')) {
			addClass(el, 'obj-lux');
			lux.obj(el);
		}
	}
}