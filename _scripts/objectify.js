// Obj
// A basic replacement for object-fit
// Adapted from http://codepen.io/xaddict/pen/xZpJgW

function obj(el) {
	setTimeout(function(){
		var img = el.querySelector('img'),
			str = 'data:image/gif;base64';
		var url = (img.currentSrc)? img.currentSrc : img.src;
		if (url.indexOf(str) == -1) {
			el.style.backgroundImage = 'url(' + url + ')';
			addClass(el, 'obj');
			if (hasClass(img, 'lux')) {
				addClass(el, 'obj-lux');
				lux.obj(el);
			}
		}
	}, 500);
}